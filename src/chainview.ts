import {
  ContractFactory,
  JsonRpcProvider,
  Interface,
  InterfaceAbi,
  ContractMethodArgs,
  BytesLike,
  Fragment,
  ZeroAddress,
} from "ethers";
export const chainView = async <A extends any[], R>(
  abi: InterfaceAbi,
  bytecode: BytesLike,
  params: ContractMethodArgs<A>,
  providerUrl: string,
  options: { from?: string; value?: bigint } = {}
): Promise<R> => {
  //set provider with providerUrl
  const provider = new JsonRpcProvider(providerUrl);

  //default options values
  const { from = ZeroAddress, value = 0n } = options;

  const ChainViewInterface = new Interface(abi);
  const errorNamesExpected = ChainViewInterface.fragments
    .filter((f): f is Fragment & { name: string } => f.type === "error")
    .map((error) => error.name);
  const ChainView = new ContractFactory(abi, bytecode, provider);

  //get deploy data transaction
  const deploy = await ChainView.getDeployTransaction(...params);
  deploy.from = options.from;
  deploy.value = options.value;

  //simulate the deployment of the contract
  let dataError: any;
  try {
    await provider.estimateGas(deploy);
  } catch (e: any) {
    dataError = e.data;
  }

  //decode data returned by the fake deployment
  const decoded = ChainViewInterface.parseError(dataError);
  const errorName = decoded!.name;
  if (!errorNamesExpected.includes(errorName)) {
    throw new Error(
      `ChainView Error: ${decoded?.name} with arg ${decoded?.args} at selector ${decoded?.selector}`
    );
  } else {
    return decoded!.args as R;
  }
};
