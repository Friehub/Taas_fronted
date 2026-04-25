---
layout: home

hero:
  name: "TaaS"
  text: "The Sovereign Fact Engine"
  tagline: Verifiable provenance for the on-chain economy. Secured by EigenLayer.
  actions:
    - theme: brand
      text: Explore Architecture
      link: /protocol/overview
    - theme: alt
      text: View Live Networks
      link: /networks/hoodi

features:
  - title: Sovereign Integrity
    details: TaaS replaces the "oracle" trust model with a sovereign gateway architecture. Facts are resolved in sandboxed Rust-native V8 isolates, eliminating backdoor risk and execution bias.
  - title: Proof of Provenance
    details: Every fact resolution produces a TruthPoint — a cryptographically signed unit of evidence carrying the exact chain of custody, from raw source to on-chain settlement.
  - title: 3-Plane Architecture
    details: Decoupled Execution (V8 Isolate), Consensus (Kernel P2P), and Settlement (EVM AVS). A modular design that ensures high-throughput facts without sacrificing security.
---

# Beyond the Oracle

The TaaS Protocol is not a data bridge. It is a **Fact Engine**.

Traditional oracles act as "black boxes" that deliver data and ask for trust. TaaS is built on **Transparency by Evidence**. By leveraging EigenLayer restaking and native V8 sandboxing, we provide a verifiable, clinical path from raw information to global economic finality.

## The 3-Plane Architecture

Our protocol is engineered with a strict separation of concerns to ensure maximum security and high-performance throughput:

1.  **The Execution Plane**: Sandboxed plugins run inside Rust-embedded V8 isolates (deno_core). Every fetch is audited and verified against a per-capability `PluginManifest` with eBPF-enforced memory and CPU limits.
2.  **The Consensus Plane**: High-performance kernel nodes communicate via a private `libp2p` gossip mesh. Outcomes are resolved through **BLS Threshold signatures** or **Weighted Median** strategies, ensuring no single operator or subset can corrupt the network state.
3.  **The Settlement Plane**: The **TaaSServiceManager** (EigenLayer AVS) anchors the Truth to the blockchain. We enforce economic integrity through institutional restaking, providing cryptographic and financial finality for multi-chain consumers.

## Institutional Readiness

TaaS is actively serving verifiable facts on **Sepolia** and **Hoodi (Holesky Institutional)**. Our infrastructure is designed for low-latency, high-integrity Fact Resolution for the next generation of DeFi, Prediction Markets, and RWA.

[View Network Status](/networks/hoodi) | [Explore the Protocol Spec](/protocol/overview)
