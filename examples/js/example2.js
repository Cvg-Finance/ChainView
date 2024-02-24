const { chainView } = require("../../dist/src/chainview");
const artifactExample = require("../chainviewArtifacts/Univ2FactoryInfo.json");
const RPC_URL = "https://rpc.ankr.com/eth";

async function main() {
  const from = 1;
  const to = 2;
  const params = [from, to];
  const [chainViewResponse] = await chainView(
    artifactExample.abi,
    artifactExample.bytecode,
    params,
    RPC_URL
  );

  for (const pairInfo of chainViewResponse) {
    console.log(`Pair infos...`);
    console.log(`pair: ${pairInfo.pair}`);
    console.log(`token0: ${pairInfo.token0}`);
    console.log(`decimal0: ${pairInfo.decimals0}`);
    console.log(`symbol0: ${pairInfo.symbol0}`);
    console.log(`token1: ${pairInfo.token1}`);
    console.log(`decimal1: ${pairInfo.decimals1}`);
    console.log(`symbol1: ${pairInfo.symbol1}`);
    console.log("-----");
  }
}

main();
