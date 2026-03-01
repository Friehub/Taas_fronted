# How Attestation Works

When a smart contract needs a real-world fact, it requests a **Truth Attestation** from the TaaS protocol. This document describes the end-to-end lifecycle of that request.

---

## Overview

```
Smart Contract (requestTruth)
         |
         v
  TruthOracleV2 Contract  ←→  Token Bond (required from requestor)
         |
         v
  Truth Nodes monitor events
         |
         v
  Recipe Execution (off-chain)
    ├── StandardFeedPlugin fetches data from providers
    ├── Logic evaluation (conditions, aggregation)
    └── Result normalization (BINARY/SCALAR/CATEGORICAL)
         |
         v
  Node proposes outcome + bond on-chain
         |
         v
  Challenge Window (Challenger Bots re-verify)
         |
   ┌─────┴─────┐
   |           |
No dispute   Dispute filed
   |              |
   v              v
Result         Arbitration
finalized      Slashing / Reward
```

---

## Step 1: Requesting Truth

A consumer smart contract calls `requestTruth` on the `TruthOracleV2` contract:

```solidity
oracle.requestTruth{value: bond}(
    recipeId,       // The ID of the registered JSON Recipe
    extraData,      // ABI-encoded JSON inputs (e.g. symbol, timestamp)
    deadline        // Unix timestamp by which the truth must be submitted
);
```

The contract locks a bond and emits a `TruthRequested` event that all active Truth Nodes receive.

---

## Step 2: Node Picks Up the Request

Active Truth Nodes (running `@friehub/truth-node`) continuously monitor the mempool and contract events. When a `TruthRequested` event is detected, the node:

1. Loads the referenced Recipe from the `RecipeRegistry`.
2. Decodes the ABI-encoded `extraData` back into JSON inputs.
3. Passes the Recipe and inputs to the `RecipeExecutor`.

---

## Step 3: Local Execution

The `RecipeExecutor` inside the node runs the recipe logic entirely **off-chain**:

- The `StandardFeedPlugin` routes data requests via the local plugin registry or the Gateway Proxy.
- Multi-source aggregation, conditional checks, and outcome normalization are computed locally.
- A cryptographic execution trace (proof) is produced.

---

## Step 4: Proposing On-Chain

The node calls `proposeTruth` on the oracle contract with:
- The `requestId`
- The computed `outcome` value
- A token bond (proving economic commitment)
- The `ipfsHash` of the truth certificate (execution trace stored on IPFS)

---

## Step 5: Challenger Window

After submission, a configurable **challenge window** is open. Any Challenger Bot (running the `ChallengerBot` module) can independently re-execute the same recipe and compare the result. If it disagrees, it calls `disputeTruth` on-chain and posts its own bond.

Disputes that result in the original proposer being wrong cause that node to lose its bond (slashing). The correct challenger earns a reward.

---

## Step 6: Finalization

Once the challenge window closes without a successful dispute, the oracle marks the result as `FINALIZED`. The consumer smart contract's callback function is invoked:

```solidity
function onTruthAttestation(
    bytes32 requestId,
    uint256 truth,
    bytes32 proofHash
) external;
```

The consumer can now act on the verified, immutable truth value.
