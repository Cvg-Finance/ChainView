import { parseEther, formatEther } from "ethers";
import { chainView } from "../../src/chainview";
import artifactExample from "../chainviewArtifacts/EthInfo.json";
const RPC_URL: string = "https://rpc.ankr.com/eth";

/*
Here we demonstrate the virtual ETH burning from the ZeroAddress through the DeadAddress via ChainView:

1) Send 1 ETH to EthInfo.sol.
2) The contract sends its balance to the DeadAddress.
3) Return the contract's balance before the burng and after.  

NB:
options can be :
{from: string, value:bigint}
OR by default 
{from: ZeroAddress, value:0}
*/

type ParamCall = [string];
type EthInfo = {
  balBefore: bigint;
  balAfter: bigint;
};

async function main() {
  const burnAddress: string = "0xdb3B2d1B37985fbfB28298106d6721cAd2211146";
  const params: ParamCall = [burnAddress];
  const options = { value: parseEther("1") };
  const [chainViewResponse] = await chainView<ParamCall, EthInfo[]>(
    artifactExample.abi,
    artifactExample.bytecode,
    params,
    RPC_URL,
    options
  );
  console.log(
    `Balance before: ${formatEther(chainViewResponse.balBefore)} ETH`
  );
  console.log(`Balance after: ${formatEther(chainViewResponse.balAfter)} ETH`);
}

main();
