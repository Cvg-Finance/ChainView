import { chainView } from "../../src/chainview";
import artifactExample from "../chainviewArtifacts/Univ2FactoryInfo.json";
const RPC_URL: string = "https://rpc.ankr.com/eth";

type ParamCall = [number, number];
type Univ2FactoryInfo = {
  pair: string;
  token0: string;
  decimals0: bigint;
  symbol0: string;
  token1: string;
  decimals1: bigint;
  symbol1: string;
};

async function main() {
  const from = 1;
  const to = 2;
  const params: ParamCall = [from, to];
  const [chainViewResponse] = await chainView<ParamCall, Univ2FactoryInfo[][]>(
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
