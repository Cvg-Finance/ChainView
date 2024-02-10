# Chainview

## Description

## How to use

### 1-Create your Solidity(s) smart contract(s) on a `Chainview` folder at the root of the repo

### 2-Compile your smart contract(s)

```
npx chainview compile
```

This will create a new folder `chainviewArtifacts` with all the artifacts for the solidity files present in the `Chainview` folder.

### 3-Call chainview through your script (see examples)

### 4-And voilà !

## Usage

ChainView can be usefull if you need to get multiple data onchain dependant from each others for a function that doesn't exist on a contract, or to be an alternative of a multicall (See examples below). The main interest for chainview is that you can implement all the logic that you want to get some datas, your only limitation is the implementation of a Solidity contract itself, and all of that for FREE !
Also, using this technic will clean and securize your code, because all the data are managed onchain, so you will have less side effect by implementing it on your projects.
The usage of chainview instead of a multicall can be better/faster\* but keep in mind that more you add some logic more the time to get the data will increase.
Usually the public RPC's has a timeout (approx 30s) for the onchain call so be carefull with that anon.

### Example 1

For example you want to get from an ERC721Enumerable contract:

- the balance of an address => balanceOf(address)
- the tokenId of an address for a each index => tokenOfOwnerByIndex(address,index)
- result => tokenId owned by the address

So if you want to get it from the classic way, you will need to call firstly balanceOf, waiting for the response and, secondly, use the response to call the tokenOfOwnerByIndex function.
With Chainview, you just need to implement a Solidity function that will fetch all theses onchain data with a simple call.

### Example 2

For example you want to get from the UniswapV2 factory contract:

- the pairs from index 0 to 5 => factory.allPairs(index)
- for each pair you want the token0/token1 => pair.token0() / pair.token(1)
- for each tokens of the pair you want the symbol and the decimals => token.symbol() / token.decimals()
- result => an struct array with all the data returned

So if you want to get it from the classic way, you will need to multicall firstly all the pairs from index 0 to 5, then waiting for the response and multicall token0 and token1 for each pairs, waiting again for the response, and finally get the symbol and the decimals data for each tokens of each pairs with a last multicall.
With Chainview, you just need to implement a Solidity function that will fetch all theses onchain data with a simple call.

## NB

\*: I'll join a benchmark later, if you want to benchmark it yourself keep in mind that a local fork can get some really slow result if we compare with public rpc on the mainnet. So much better to test in prod ;). Also chainview (via ethers 6) is able to work with all the classic rpc, only non-classic rpc like flashbot cannot be used for that case.
