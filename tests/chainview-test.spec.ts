import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const expect = chai.expect;
import { chainView } from "../src/chainview";
import artifactExample from "./Univ2FactoryInfo.json";
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

describe("Chainview tests", () => {
  it("Success: call with right parameters", async () => {
    const from = 1;
    const to = 1;
    const params: ParamCall = [from, to];
    const [chainviewResponse] = await chainView<
      ParamCall,
      Univ2FactoryInfo[][]
    >(artifactExample.abi, artifactExample.bytecode, params, RPC_URL);
    const pairInfo = chainviewResponse[0];
    expect(pairInfo.pair).to.be.equal(
      "0x3139Ffc91B99aa94DA8A2dc13f1fC36F9BDc98eE"
    );
    expect(pairInfo.token0).to.be.equal(
      "0x8E870D67F660D95d5be530380D0eC0bd388289E1"
    );
    expect(pairInfo.decimals0).to.be.equal(18n);
    expect(pairInfo.symbol0).to.be.equal("USDP");
    expect(pairInfo.token1).to.be.equal(
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    );
    expect(pairInfo.decimals1).to.be.equal(6n);
    expect(pairInfo.symbol1).to.be.equal("USDC");
  });

  it("Fail: call with wrong parameters, and panic", async () => {
    const from = 2;
    const to = 1;
    const params: ParamCall = [from, to];
    await expect(
      chainView<ParamCall, Univ2FactoryInfo[][]>(
        artifactExample.abi,
        artifactExample.bytecode,
        params,
        RPC_URL
      )
    ).to.eventually.be.rejectedWith(
      `ChainView Error: Panic with arg 17 at selector 0x4e487b71`
    );
  });
});
