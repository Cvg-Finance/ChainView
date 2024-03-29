import { chainView } from "../../src/chainview";
import artifactExample from "../chainviewArtifacts/ERC721EnumerableInfo.json";
const RPC_URL: string = "https://rpc.ankr.com/eth";

type ParamCall = [string];
type ERC721EnumerableInfo = bigint[];

async function main() {
  const holder: string = "0xdb3B2d1B37985fbfB28298106d6721cAd2211146";
  const params: ParamCall = [holder];
  const [chainViewResponse] = await chainView<
    ParamCall,
    ERC721EnumerableInfo[]
  >(artifactExample.abi, artifactExample.bytecode, params, RPC_URL);
  console.log(`TokenIds for ${holder}: ${chainViewResponse}`);
}

main();
