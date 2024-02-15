// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721Enumerable {
    function balanceOf(address) external view returns (uint256);
    function tokenOfOwnerByIndex(address, uint256) external view returns (uint256);
}

error ERC721EnumerableInfoError(uint256[]);

contract ERC721EnumerableInfo {
    IERC721Enumerable constant cvgPepe = IERC721Enumerable(0x822ee3715e2c15372e45a4a62376bF786fF45511);

    constructor(address _wallet) {
        getTokenIdsByWallet(_wallet);
    }

    function getTokenIdsByWallet(address _wallet) internal view {
        uint256 balance = cvgPepe.balanceOf(_wallet);
        uint256[] memory tokenIds = new uint256[](balance);
        for (uint256 i; i < balance; i++) {
            tokenIds[i] = cvgPepe.tokenOfOwnerByIndex(_wallet, i);
        }

        revert ERC721EnumerableInfoError(tokenIds);
    }
}
