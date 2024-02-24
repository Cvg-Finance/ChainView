const { parseEther } = require("ethers");
const { chainView } = require("../../dist/src/chainview");
const artifactExample = require("../chainviewArtifacts/EthInfo.json");
const RPC_URL = "https://rpc.ankr.com/eth";

/*
Here we demonstrate the virtual ETH burning from the ZeroAddress through the DeadAddress via ChainView:

1) Send 1 ETH to EthInfo.sol.
2) The contract sends its balance to the DeadAddress.
3) Return the contract's balance before the burn and after.  

NB:
options can be :
{from: string, value:bigint}
OR by default 
{from: ZeroAddress, value:0}
*/

async function main() {
  const burnAddress = "0x000000000000000000000000000000000000dead";
  const params = [burnAddress];
  const options = { value: parseEther("1") };
  const [chainViewResponse] = await chainView(
    artifactExample.abi,
    artifactExample.bytecode,
    params,
    RPC_URL,
    options
  );
  console.log(`Balance before: ${chainViewResponse.balBefore}`);
  console.log(`Balance after: ${chainViewResponse.balAfter}`);
}

main();
