# Protocol Smart Contracts

The TaaS Protocol is governed by a suite of Solidity smart contracts deployed on the Helios blockchain. These components enforce the rules of truth attestation, economic staking, and network participation.

---

## Contract Architecture

### TruthOracle: The Central Gateway

The `TruthOracle` contract is the primary interface for network consumers. It manages the comprehensive lifecycle of every truth request:

1. **Initiation**: A decentralized application (DApp) or smart contract invokes `requestTruth`.
2. **Proposal**: Authorized nodes submit verified attestations following recipe execution.
3. **Verification**: A secondary window allows for independent verification and disputes.
4. **Finalization**: Upon window closure, the result is finalized and immutable record is established.
5. **Callback**: The protocol optionally notifies the original requesting contract with the resolved result.

```solidity
interface ITruthOracle {
    function requestTruth(
        bytes32 recipeId,
        bytes calldata inputs
    ) external payable returns (uint256 requestId);

    function proposeAttestation(
        uint256 requestId,
        bytes calldata attestationData,
        bytes calldata signature
    ) external;

    function disputeAttestation(
        uint256 requestId,
        bytes calldata counterEvidence
    ) external;

    function finalizeAttestation(uint256 requestId) external;
}
```

### NodeRegistry: Network Enrollment

The `NodeRegistry` manages the lifecycle of network participants. Truth Nodes and Challengers must register and provide a security bond before contributing to the protocol.

- **Registration**: Participants secure their role by locking a predefined token bond.
- **Slashing**: Inaccurate or fraudulent submissions result in the forfeiture of the node bond.
- **Deregistration**: Participants can withdraw their stake following a standard cooldown period.

```solidity
interface INodeRegistry {
    enum NodeType { Sentinel, Challenger }

    function registerNode(NodeType nodeType, string calldata metadataURI) external;
    function deregisterNode() external;
    function getNodeInfo(address nodeAddress) external view returns (NodeInfo memory);
}
```

### SourceRegistry: Provider Integrity

This contract monitors the reliability and historical performance of external data sources. Sources that consistently provide accurate data points through the node network accumulate higher integrity scores within the protocol.

### Protocol Token: Economic Foundation

The T token is the native utility asset of the TaaS Protocol:
- **Collateral**: Required for all nodes to ensure economic alignment and security.
- **Settlement**: Used for protocol fees and truth request payments.
- **Incentives**: Distributed to network participants for honest verification and successful disputes.

---

## Technical Implementation

### Callback Integration Example

The following example demonstrates a consumer contract integrating with the `TruthOracle` through a callback mechanism:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/ITruthOracle.sol";
import "./interfaces/ITruthConsumer.sol";

contract NFLBettingMarket is ITruthConsumer {
    ITruthOracle public immutable oracle;
    uint256 public pendingRequestId;

    constructor(address _oracle) {
        oracle = ITruthOracle(_oracle);
    }

    function requestMatchResult(string memory matchId) external payable {
        bytes memory inputs = abi.encode(matchId);
        pendingRequestId = oracle.requestTruth(keccak256("nfl-game-result"), inputs);
    }

    function onTruthFinalized(uint256 requestId, bytes calldata result) external override {
        require(msg.sender == address(oracle), "Unauthorized");
        require(requestId == pendingRequestId, "Unknown request");

        string memory winner = abi.decode(result, (string));
        _settleBets(winner);
    }

    function _settleBets(string memory winner) internal {
        // Implementation of settlement logic
    }
}
```

### Protocol Administration

All core protocol contracts utilize a secure upgradeability pattern. This architecture allows for the continuous improvement of protocol logic while maintaining persistent contract addresses for network consumers.

---

## Network Deployments (Helios)

| Component | Contract Address |
| :--- | :--- |
| `TruthOracle` | `0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1` |
| `NodeRegistry` | `0xbD3E6271db9f9F57A08B33bf5c57f042A1f777f4` |
| `SourceRegistry` | `0x340adD1e0C50Edf03A8fC66659094Cd628F0452f` |
| `Protocol Token` | `0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F` |

---

## License

Copyright (c) 2026 FrieHub Protocol. Standard MIT Licensing applies.
