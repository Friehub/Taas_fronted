# Global Truth Attestation Engine

The Global Truth Attestation Engine is the core mechanism by which TaaS resolves real-world events into verifiable, on-chain truth. It leverages a decentralized network of Sentinel nodes, deterministic execution of recipes, and an Optimistic Oracle to achieve consensus.

## Process Overview

1. **Request Initiation**: A smart contract or off-chain application requests the outcome of a specific event using a predefined `Recipe`.
2. **Execution**: Sentinel nodes running the TaaS Execution Engine fetch the recipe, query the specified data providers (plugins like SportMonks or Binance), and compute the result deterministically.
3. **Attestation Generation**: Each Sentinel generates an `Attestation`, which is a standardized JSON object representing the truth they observed, along with a cryptographic signature.
4. **Submission**: Sentinels submit their attestations to the `AttestationEngine` smart contract.
5. **Consensus & Optimistic Finalization**: The engine verifies the signatures and checks if a consensus threshold (e.g., 3-of-5 validators) is met for a particular outcome. If met, the outcome is optimistically recorded.
6. **Dispute Window**: A dispute window opens, allowing Challenger nodes to contest the outcome if they possess conflicting data or proof of malicious behavior.
7. **Finalization**: If no valid dispute is raised within the window, the attestation becomes the finalized "Global Truth" for that specific event.

## Key Components

### `Attestation` Object

An attestation is a structured representation of the resolved truth.

```typescript
interface Attestation {
  attestationId: string;
  recipeId: string;
  sourceId: string;
  timestamp: string;
  data: Record<string, any>; // The actual resolved data
  signature: string;         // EIP-712 signature from the Sentinel
}
```

### The Role of Sentinel Nodes

Sentinel nodes are the backbone of the attestation process. They provide the computational resources to fetch, format, and sign data streams according to the immutable logic defined in the recipes.

### The Challenger Network

Challenger nodes ensure the integrity of the system by actively monitoring submitted attestations and raising disputes against malicious or incorrect data, thereby earning slashing rewards.
