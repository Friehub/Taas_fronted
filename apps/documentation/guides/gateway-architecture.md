# Secure Gateway Isolation (Keyless Nodes)

A standard problem in legacy oracle networks is that every node operator must individually sign up for, pay for, and manage private API keys for every data source they support. This creates significant friction, security risks, and economic waste.

TaaS solves this through a unique architectural separation between **Logic Execution (Truth Nodes)** and **Decentralized Data Acquisition (Gateway Hive)**.

## The TaaS Gateway Hive

The Gateway is no longer a single proxy; it is a **Hive** of nodes that coordinate to provide cryptographically undeniable data.

### 1. Threshold Signature Scheme (TSS)
When a node requires data (e.g., a match score), the Gateway Hive doesn't just "fetch" it. Instead, a committee of Gateway nodes performs a **Threshold Signature Ceremony (GG20)**. 
- **Decentralized Signing**: No single node knows the full private key. 
- **Quorum-Based Proof**: A valid attestation is only produced if a majority (`t`-of-`n`) of nodes agree on the data.
- **On-Chain Verifiability**: The resulting signature is standard secp256k1, making it instantly verifiable by any smart contract.

### 2. Autonomous P2P Discovery
The Hive is self-healing. Using **libp2p GossipSub**, Gateway nodes pulse their presence and health status. The network automatically discovers new nodes and routes traffic to the healthiest "shards" of the hive without any central load balancer.

### 3. High-Performance Rust Core (`hot-core`)
The brain of the gateway node is implemented in **Rust** as `hot-core`. This ensures nanosecond-level request handling, safe memory management, and robust integration with the `multi-party-ecdsa` libraries required for TSS.

---

## Why This Architecture is Unique

### 1. Zero-Trust Attestation
TaaS achieved the transition from "Trust me" to "Verify the Proof." Because data entering the network is TSS-signed by a committee, you don't need to trust the node runner or the gateway operator—you only trust the cryptography.

### 2. Radical Accessibility & Mutualized Costs
Lowering the barrier to entry is critical. TaaS allows a few resilient, high-availability Gateways to mutualize the cost of expensive Enterprise APIs (SportMonks, Binance, etc.), while allowing thousands of nodes to safely use that signed data for complex truth resolution.

### 3. Sovereignty & Global Protection
The Hive features **Distributed Circuit Breakers**. If an external API starts failing, the entire Hive globally "trips" the circuit to protect the network's reputation and prevent provider bans.

---

## Summary

By separating **Who Executes** from **Who Fetches**, TaaS provides a more secure, cost-effective, and decentralized infrastructure that can scale to the demands of the next-generation AI and smart contract economy.
