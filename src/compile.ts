#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import solc from "solc";

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
} else {
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

      const output = JSON.parse(solc.compile(JSON.stringify(input)));
      if (output.errors) {
        console.log("ERROR", output.errors);
        return output.errors;
      }

      for (const contractName in output.contracts[file]) {
        const contract = output.contracts[file][contractName];
        const contractOutput = {
          abi: contract.abi,
          bytecode: contract.evm.bytecode.object,
        };

        const outputFilename = `${contractName.replace(":", "")}.json`;
        if (!fs.existsSync(artifactsDir)) {
          fs.mkdirSync(artifactsDir);
        }
        fs.writeFileSync(
          path.join(artifactsDir, outputFilename),
          JSON.stringify(contractOutput, null, 2)
        );
        console.log(`Compiled ${contractName} to ${outputFilename}`);
      }
    }
  });
}
