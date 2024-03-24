// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct SnapshotInfo {
    address holder;
    uint256 tokenId;
    uint256 veCvg;
    uint256 ysCvg;
}
struct SnapshotStruct {
    SnapshotInfo[] snapshotInfos;
    uint256 blockNumber;
}
error SnapshotInfoError(SnapshotStruct);

interface ILockingPositionManager {
    function totalSupply() external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
}
interface ILockingPositionService {
    function balanceOfVeCvg(uint256 tokenId) external view returns (uint256);
    function balanceOfYsCvgAt(
        uint256 tokenId,
        uint256 cycleId
    ) external view returns (uint256);
}
contract VeCvgSnapshot {
    ILockingPositionManager constant LOCKING_MANAGER =
        ILockingPositionManager(0x0EDB88Aa3aa665782121fA2509b382f414A0C0cE);
    ILockingPositionService constant LOCKING_SERVICE =
        ILockingPositionService(0xc8a6480ed7C7B1C401061f8d96bE7De6f94D3E60);
    uint256 constant CYCLE_TDE_1 = 12;

    constructor() {
        getVeCvgSnapshot();
    }

    function getVeCvgSnapshot() internal view {
        uint256 totalSupply = LOCKING_MANAGER.totalSupply();
        SnapshotInfo[] memory snapshotInfos = new SnapshotInfo[](totalSupply);
        for (uint256 i = 1; i <= totalSupply; ) {
            snapshotInfos[i - 1] = SnapshotInfo({
                holder: LOCKING_MANAGER.ownerOf(i),
                tokenId: i,
                veCvg: LOCKING_SERVICE.balanceOfVeCvg(i),
                ysCvg: LOCKING_SERVICE.balanceOfYsCvgAt(i, CYCLE_TDE_1)
            });

            unchecked {
                ++i;
            }
        }
        revert SnapshotInfoError(
            SnapshotStruct({
                snapshotInfos: snapshotInfos,
                blockNumber: block.number
            })
        );
    }
}
