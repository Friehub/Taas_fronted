# Protocol Architecture

The TaaS (Truth as a Service) protocol is designed for high-performance, verifiable data orchestration. It enables developers to define complex data intents that are executed with perfect determinism across a decentralized network.

---

## Core Pillars

### 1. Global Identity Mapping (GIM)
TaaS abstracts provider-specific identifiers (Surgical IDs) behind a natural language resolution layer. Developers can query match data or team statistics using natural names (e.g., "Arsenal", "Liverpool"), which the protocol dynamically translates into verified provider IDs at runtime.

### 2. Multi-Source Consensus
To ensure data integrity, TaaS employs a weighted consensus mechanism. Verdicts are not derived from a single API; instead, the protocol fetches data from multiple independent providers (SportDB, API-Sports, SportMonks), applies outlier rejection, and aggregates the results into a single, high-fidelity truth point.

### 3. Programmable Oracle Engine
TaaS utilizes a sandboxed execution environment (WASM-based) to process logic. This allows for complex transformations—such as calculating averages, verifying in-play events, or checking cross-domain conditions—directly within the oracle layer.

### 4. Threshold Attestation (TSS)
Every verdict produced by the network is cryptographically signed using a (t, n) Threshold Signature Scheme. This ensures that a majority of the decentralized node committee has independently verified the execution, providing a gas-efficient proof for on-chain consumption.

---

## Verifiability and Transparency

Every execution produces a cryptographic attestation that can be verified against the TaaS Programmable Oracle contracts. This end-to-end transparency ensures that the "Source of Truth" is mathematically guaranteed and immune to manipulation.
