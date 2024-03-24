import { formatEther } from "ethers";
import { chainView } from "../../src/chainview";
import artifactExample from "../chainviewArtifacts/VeCvgSnapshot.json";
const RPC_URL: string = "https://rpc.ankr.com/eth";

type ParamCall = [];
type SnapshotInfo = {
  holder: string;
  tokenId: bigint;
  veCvg: bigint;
  ysCvg: bigint;
};
type SnapshotStruct = {
  snapshotInfos: SnapshotInfo[];
  blockNumber: bigint;
};

async function main() {
  const params: ParamCall = [];
  const options = { blockTag: 19144381 }; //2 days after Locking deployment
  const [chainViewResponse] = await chainView<ParamCall, SnapshotStruct[]>(
    artifactExample.abi,
    artifactExample.bytecode,
    params,
    RPC_URL,
    options
  );

  for (const info of chainViewResponse.snapshotInfos) {
    console.log(`holder: ${info.holder}`);
    console.log(`tokenId: ${info.tokenId}`);
    console.log(`veCvg: ${formatEther(info.veCvg)}`);
    console.log(`ysCvg: ${formatEther(info.ysCvg)}`);
    console.log("-----");
  }

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
