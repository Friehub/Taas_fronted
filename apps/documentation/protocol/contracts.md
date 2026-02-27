# TaaS Smart Contracts

**On-chain components that enforce truth, staking, and node registration on the Helios blockchain.**

The TaaS Protocol is secured by a suite of Solidity smart contracts deployed on the Helios network. These contracts form the trust layer of the system — the entry point for requesting truth, the judge for disputes, and the registry for node participation.

---

## Contract Overview

### `TruthOracleV2.sol` — The Core

This is the central contract consumers interact with. It manages the full lifecycle of a truth request:

1. **Request** — A DApp or smart contract calls `requestTruth(recipeId, inputs)`.
2. **Proposal** — Sentinel nodes submit their signed `Attestation` via `proposeAttestation(requestId, data, signature)`.
3. **Dispute Window** — After a proposal, a configurable window opens (e.g., 2 hours). Anyone can raise a dispute.
4. **Finalization** — If no valid dispute is raised, `finalizeAttestation(requestId)` is called (by Chronos automation or manually).
5. **Callback** — The originally requesting contract receives the finalized truth result.

```solidity
// Simplified interface for TruthOracleV2
interface ITruthOracleV2 {
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

### `NodeRegistry.sol` — Node Enrollment

Sentinels and Challengers must register and stake $TAAS tokens before they can participate in the network.

- **Registration**: A node calls `registerNode(nodeType, metadata)` and locks a bond.
- **Slashing**: If a node submits fraudulent data and loses a dispute, their bond is slashed.
- **Deregistration**: Honest nodes can withdraw their stake after a cooldown period.

```solidity
interface INodeRegistry {
    enum NodeType { Sentinel, Challenger }

    function registerNode(NodeType nodeType, string calldata metadataURI) external;
    function deregisterNode() external;
    function getNodeInfo(address nodeAddress) external view returns (NodeInfo memory);
}
```

### `SourceRegistry.sol` — Data Source Reputation

Tracks the reputation and availability of data sources (SportMonks, Binance, etc.) that Recipes can use. Sources with consistently validated data accumulate higher reputation scores.

### `TAASToken.sol` — Protocol Token

Standard ERC-20 token used throughout the protocol:
- **Staking** — Required for Sentinel and Challenger nodes to participate.
- **Payment** — Developers pay a fee (in $TAAS or $HLS) to request truth.
- **Rewards** — Distributed to Sentinels for honest relaying and to Challengers for catching fraud.

---

## Using the TruthOracle in Your Contract

Here is a complete example of a smart contract that inherits a callback from TaaS:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@friehub/taas-contracts/interfaces/ITruthOracleV2.sol";
import "@friehub/taas-contracts/interfaces/ITruthConsumer.sol";

contract NFLBettingMarket is ITruthConsumer {
    ITruthOracleV2 public immutable oracle;
    uint256 public pendingRequestId;

    constructor(address _oracle) {
        oracle = ITruthOracleV2(_oracle);
    }

    /// @notice Request the final result of an NFL match
    function requestMatchResult(string memory matchId) external payable {
        bytes memory inputs = abi.encode(matchId);
        pendingRequestId = oracle.requestTruth(keccak256("nfl-game-result"), inputs);
    }

    /// @notice Called automatically by the TruthOracle after finalization
    function onTruthFinalized(uint256 requestId, bytes calldata result) external override {
        require(msg.sender == address(oracle), "Unauthorized");
        require(requestId == pendingRequestId, "Unknown request");

        string memory winner = abi.decode(result, (string));
        // Settle bets based on the winner
        _settleBets(winner);
    }

    function _settleBets(string memory winner) internal {
        // ... payout logic
    }
}
```

---

## Development

### Setup

```bash
cd taas-core/contracts
npm install
```

### Compile

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy to Helios Testnet

```bash
npx hardhat run deploy/05_deploy_proxies.ts --network helios
```

> [!NOTE]
> All contracts use the **Beacon Proxy** upgradeable pattern. This means the logic can be upgraded by the FrieHub team without changing the contract addresses that consumers rely on.

---

## Deployed Addresses (Helios Testnet)

| Contract | Address |
| :--- | :--- |
| `TruthOracleV2` | `0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1` |
| `NodeRegistry` | `0xbD3E6271db9f9F57A08B33bf5c57f042A1f777f4` |
| `SourceRegistry` | `0x340adD1e0C50Edf03A8fC66659094Cd628F0452f` |
| `TAAS Token` | `0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F` |

---

## License

MIT — Copyright (c) 2026 FrieHub Protocol.
