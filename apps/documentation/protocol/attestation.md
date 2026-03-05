# Protocol Attestation Lifecycle

When a smart contract requires a real-world fact, it initiates a Truth Attestation request through the TaaS protocol. This document details the comprehensive lifecycle of such a request, from initiation to on-chain finalization.

---

## Architectural Overview

```
Consumer Smart Contract (requestTruth)
          |
          v
   TruthOracle Contract (Requires execution bond)
          |
          v
   Truth Nodes monitor network events
          |
          v
   Off-Chain Recipe Execution
     ├── Data retrieval from authorized providers
     ├── Logic evaluation and aggregation
     └── Result normalization (Binary, Scalar, or Categorical)
          |
          v
   Node proposes outcome and provides bond on-chain
          |
          v
   Verification Window (Independent verification by network)
          |
    ┌─────┴─────┐
    |           |
No dispute   Dispute initiated
    |              |
    v              v
Result         Arbitration
finalized      Slashing or Reward
```

---

## 1. Request Initiation

A consumer smart contract invokes the `requestTruth` method on the protocol oracle contract:

```solidity
oracle.requestTruth{value: bond}(
    recipeId,       // Identifier of the registered recipe
    extraData,      // Encoded parameters for the execution
    deadline        // Expiration timestamp for the request
);
```

The protocol secures the request bond and emits a `TruthRequested` event, alerting the node network to the active requirement.

---

## 2. Request Detection

Active Truth Nodes continuously monitor the blockchain for these events. Upon detecting a `TruthRequested` event, a node performs the following:

1. Retrieves the referenced Recipe definition from the decentralized registry.
2. Decodes the execution parameters provided in the `extraData` field.
3. Forwards the recipe and its parameters to its internal execution environment.

---

## 3. Off-Chain Execution

The execution environment processes the recipe logic entirely outside the blockchain:

- Data retrieval is routed through authorized network adapters or the secure gateway.
- Operations such as multi-source consensus, conditional logic, and outcome normalization are performed.
- A cryptographic execution certificate is generated as evidence of the procedure.

---

## 4. On-Chain Proposal

The node submits its findings to the oracle contract by invoking `proposeTruth`, providing:
- The unique `requestId`.
- The calculated outcome value.
- An economic bond as a commitment to accuracy.
- A reference (hash) to the execution certificate.

---

## 5. Secondary Verification Window

Once a proposal is submitted, a predefined verification window begins. During this interval, other network participants (challengers) re-execute the same recipe to ensure consistency. If a discrepancy is found, a challenger submits a `disputeTruth` transaction along with a competing bond.

In the event of a successful challenge, the original proposer's bond is slashed to penalize inaccuracy, and the challenger is rewarded for maintaining the integrity of the protocol.

---

## 6. Finalization

If the verification window closes without a successful challenge, the oracle marks the result as finalized. The protocol then invokes the callback function on the consumer smart contract:

```solidity
function onTruthAttestation(
    bytes32 requestId,
    uint256 truth,
    bytes32 proofHash
) external;
```

The consumer contract can now utilize the verified and immutable truth value to execute its internal logic.
