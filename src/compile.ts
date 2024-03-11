#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import solc from "solc";
interface SolcOutput {
  contracts: {
    [key: string]: {
      [key: string]: {
        abi: any[];
        evm: {
          bytecode: { object: string };
        };
      };
    };
  };
  errors?: { formattedMessage: string; severity: string }[];
}

const rootDir = process.cwd();
const contractsDir = path.join(rootDir, "Chainview");
const artifactsDir = path.join(rootDir, "chainviewArtifacts");

if (!fs.existsSync(contractsDir)) {
  console.error("Folder Chainview not found.");
  process.exit(1);
}
const solFiles = fs
  .readdirSync(contractsDir)
  .filter((file) => path.extname(file) === ".sol");

if (solFiles.length === 0) {
  console.log("Chainview: nothing to compile");
  process.exit(0);
}
let counter = 0;

solFiles.forEach((file) => {
  if (path.extname(file) === ".sol") {
    const contractPath = path.join(contractsDir, file);
    const contractSource = fs.readFileSync(contractPath, "utf8");

    const input = {
      language: "Solidity",
      sources: {
        [file]: {
          content: contractSource,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode.object"],
          },
        },
      },
    };

    const output: SolcOutput = JSON.parse(solc.compile(JSON.stringify(input)));
    if (output.errors) {
      for (const error of output.errors) {
        console.error(error.formattedMessage);
        if (error.severity == "error") {
          console.log("ChainView: Compilation Failed");
          process.exit(1);
        }
      }
    }
    Object.entries(output.contracts[file]).forEach(
      ([contractName, contractDetails]) => {
        if (contractDetails.evm.bytecode.object !== "") {
          const artifactPath = path.join(artifactsDir, `${contractName}.json`);
          const contractOutput = {
            abi: contractDetails.abi,
            bytecode: contractDetails.evm.bytecode.object,
          };

          if (!fs.existsSync(artifactsDir)) {
            fs.mkdirSync(artifactsDir);
          }

          fs.writeFileSync(
            artifactPath,
            JSON.stringify(contractOutput, null, 4)
          );
          counter++;
        }
      }
    );
  }
});
console.log(`ChainView: Compiled ${counter} Solidity files successfully !\n`);

process.exit(0);
