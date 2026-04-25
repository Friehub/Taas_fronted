---
layout: home

hero:
  name: "TaaS"
  text: "General-Purpose Oracle AVS"
  tagline: Verifiable off-chain compute for on-chain data. Secured by EigenLayer.
  actions:
    - theme: brand
      text: Get Started
      link: /guides/getting-started
    - theme: alt
      text: View Status
      link: /networks/hoodi

features:
  - title: Pooled Security
    details: Leverages the cryptoeconomic security of Ethereum through EigenLayer restaking. All task executions are enforced by slashable commitments.
  - title: Verifiable Compute
    details: Off-chain resolution occurs in sandboxed V8 isolates. Every task producing a signed proof (TruthPoint) carrying its own chain of custody.
  - title: Multi-Chain Deployment
    details: Actively resolving tasks on the Ethereum Sepolia and Hoodi (Holesky) testnets with unified SDK and contract support.
---

# Technical Introduction

TaaS (Truth as a Service) is an **Actively Validated Service (AVS)** designed to resolve off-chain data and provide verifiable proofs to on-chain consumers. By utilizing EigenLayer restaking, the protocol ensures a high degree of economic security and decentralization for diverse data domains.

## Architecture

The protocol separates execution from consensus and settlement:

1.  **Execution Layer**: Tasks are resolved in sandboxed Rust-embedded V8 isolates (deno_core). Every execution is governed by a `PluginManifest` with enforced resource limits.
2.  **Consensus Layer**: Outcomes are aggregated across a distributed network of operators using Threshold BLS signatures or Weighted Median strategies.
3.  **Settlement Layer**: The `TaaSServiceManager` anchors verifiable proofs to the blockchain, enabling consumers to verify and settle data with cryptographic certainty.

## Testnet Status

The TaaS protocol is currently in the testnet phase and is serving tasks on **Sepolia** and **Hoodi (Holesky)**. Developers can integrate today using the verified proxies and the `@taas/taas-sdk`.

[View Network Status](/networks/hoodi) | [Protocol Rationale](/guides/why-taas)
