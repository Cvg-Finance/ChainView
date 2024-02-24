// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct EthStructInfo {
    uint256 balBefore;
    uint256 balAfter;
}
error EthInfoError(EthStructInfo);

contract EthInfo {
    receive() external payable {}

    constructor(address _toSend) payable {
        sendEth(_toSend);
    }

    function sendEth(address _toSend) internal {
        uint256 balBefore = address(this).balance;

        //send ETH through low level call
        (bool sent,) = _toSend.call{value: balBefore}("");
        require(sent, "Failed to send Ether");

        revert EthInfoError(EthStructInfo({
            balBefore: balBefore,
            balAfter: address(this).balance
        }));
    }
}

