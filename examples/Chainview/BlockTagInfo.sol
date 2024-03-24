// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct BlockTagInfoStruct {
    uint256 totalSupply;
    uint256 blockNumber;
}
error BlockTagInfoError(BlockTagInfoStruct);
interface ICvg {
    function totalSupply() external view returns (uint256);
}
contract BlockTagInfo {
    ICvg constant CVG = ICvg(0x97efFB790f2fbB701D88f89DB4521348A2B77be8);

    constructor() {
        getBlockTagInfo();
    }

    function getBlockTagInfo() internal view {
        revert BlockTagInfoError(
            BlockTagInfoStruct({
                totalSupply: CVG.totalSupply(),
                blockNumber: block.number
            })
        );
    }
}
