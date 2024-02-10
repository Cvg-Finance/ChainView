// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUniv2Factory {
    function allPairs(uint256) external view returns (IPair);
}

interface IPair {
    function token0() external view returns (IERC20);
    function token1() external view returns (IERC20);
}

interface IERC20 {
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

struct Univ2FactoryPairInfo {
    IPair pair;
    IERC20 token0;
    uint8 decimals0;
    string symbol0;
    IERC20 token1;
    uint8 decimals1;
    string symbol1;
}

error Univ2FactoryPairInfosError(Univ2FactoryPairInfo[] pairInfos);

contract Univ2FactoryInfo {
    IUniv2Factory constant factory = IUniv2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);

    constructor(uint256 _from, uint256 _to) {
        getInfoPairs(_from, _to);
    }

    function getInfoPairs(uint256 _from, uint256 _to) internal view {
        uint256 length = _to - _from + 1;
        uint256 counter;
        Univ2FactoryPairInfo[] memory _pairInfos = new Univ2FactoryPairInfo[](length);
        for (uint256 i = _from; i < _to + 1; i++) {
            IPair pair = factory.allPairs(i);
            IERC20 token0 = pair.token0();
            IERC20 token1 = pair.token1();
            _pairInfos[counter++] = Univ2FactoryPairInfo({
                pair: pair,
                token0: token0,
                decimals0: token0.decimals(),
                symbol0: token0.symbol(),
                token1: token1,
                decimals1: token1.decimals(),
                symbol1: token1.symbol()
            });
        }
        revert Univ2FactoryPairInfosError(_pairInfos);
    }
}
