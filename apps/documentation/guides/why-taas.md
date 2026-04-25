# Protocol Rationale

TaaS is designed to address the challenges of off-chain data resolution and verifiable compute by leveraging the EigenLayer restaking primitive.

---

## Technical Comparison

| Component | Standard Oracles | Optimistic Oracles | TaaS AVS |
| :--- | :--- | :--- | :--- |
| **Execution** | External Adapters | Human Proposers | **Sandboxed V8 Isolates** |
| **Security** | Native Staking | Dispute Bonds | **Pooled Security (ETH)** |
| **Integrity** | Aggregation Only | Dispute Delay | **Cryptographic Proofs** |
| **Finality** | Immediate (Probabilistic) | Delayed (Dispute) | **Threshold BLS (BFT)** |

---

## Core Technical Advantages

### 1. Cryptoeconomic Security
By building on **EigenLayer**, TaaS inherits the massive security of the Ethereum restaking layer. Operator misbehavior is subject to slashing, ensuring that economic integrity is enforced at the base layer.

### 2. Sandboxed Task Execution
TaaS utilizes native Rust-embedded V8 isolates for task resolution. Every plugin execution is sandboxed and governed by a manifest that enforces URL whitelists, memory limits, and CPU quotas. This ensures that the underlying node remains secure and the logic is deterministic.

### 3. Verifiable Off-chain Compute
The protocol produces **TruthPoints** — cryptographically signed commitments that carry the chain of custody from the data source to the on-chain consumer. This enables verifiable off-chain compute that can be settled with high confidence.

### 4. Threshold Consensus
TaaS supports Threshold BLS (Boneh-Lynn-Shacham) signing. This allows a distributed set of operators to produce a single compact signature proving that a BFT quorum of stake has agreed on a value before it is submitted to the consuming contract.

### 5. Multi-Domain Support
The manifest-driven nature of TaaS allows it to support any data domain — from high-frequency financial prices to complex sports outcomes or weather data — without requiring core protocol upgrades.
