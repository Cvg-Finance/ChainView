const { formatEther } = require("ethers");
const { chainView } = require("../../dist/src/chainview");
const artifactExample = require("../chainviewArtifacts/BlockTagInfo.json");
const RPC_URL = "https://rpc.ankr.com/eth";

async function main() {
  const params = [];
  const options = { blockTag: 19144573 }; //CVG deployment block
  const [chainViewResponse] = await chainView(
    artifactExample.abi,
    artifactExample.bytecode,
    params,
    RPC_URL,
    options
  );

  console.log(
    `Total supply at Block ${Number(
      chainViewResponse.blockNumber
    )} : ${formatEther(chainViewResponse.totalSupply)} CVG`
  );

  //we need to ensure that the rpc returns the data at the desired block
  if (Number(chainViewResponse.blockNumber) === options.blockTag) {
    console.log(
      `Snapshot successfully done at pinned block ${options.blockTag} !`
    );
  } else {
    console.log(`Snapshot failed at pinned block`);
  }
}

main();
