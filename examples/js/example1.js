const { chainView } = require("../../dist/src/chainview");
const artifactExample = require("../chainviewArtifacts/ERC721EnumerableInfo.json");
const RPC_URL = "https://rpc.ankr.com/eth";

async function main() {
  const holder = "0xdb3B2d1B37985fbfB28298106d6721cAd2211146";
  const params = [holder];
  const [chainViewResponse] = await chainView(
    artifactExample.abi,
    artifactExample.bytecode,
    params,
    RPC_URL
  );
  console.log(`TokenIds for ${holder}: ${chainViewResponse}`);
}

main();
