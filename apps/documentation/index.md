---
layout: home

hero:
  name: "TaaS Gateway"
  text: "The Verifiable Data Attestation Network"
  tagline: A decentralized oracle infrastructure built on cryptographic data provenance. Every data point is either proven or challenged, never simply trusted.
  actions:
    - theme: brand
      text: Gateway Architecture
      link: /gateway/
    - theme: alt
      text: Write a Plugin
      link: /plugins/writing-a-plugin

features:
  - title: Two-Process Trust Architecture
    details: Hot-Core (Rust) owns all cryptographic operations — P2P gossip, BLS threshold signing, key management, and on-chain relay. The Sidecar (Node.js) owns all data execution. They share no memory and communicate only over a strict gRPC boundary defined by Protobuf.
  - title: Hot-Reloadable Plugin System
    details: Data adapters are TypeScript plugins installed and reloaded at runtime without a sidecar restart. A single CLI command validates the manifest, writes the capability entry, and triggers a live gRPC reload on the running sidecar.
  - title: Unified Capability Model (UCM)
    details: The Truth Engine dispatches every request to the correct plugin, enforces output schema compliance before data enters the signing pipeline, and aggregates results from multiple sources using configurable strategies — Median, Mean, or Consensus.
  - title: BLS Threshold Signing (TSS)
    details: In Mesh Network mode, nodes produce BLS12-381 partial signatures, gossip shares over libp2p, and the first node to reach threshold aggregates the final signature. If aggregation times out, the node falls back to its local EIP-712 key.
  - title: EIP-712 TruthPoints
    details: Every attested value is wrapped in a TruthPoint — a structured object carrying what the data is, when it was attested, and who signed it — bound together by an EIP-712 structured data signature verifiable on any EVM chain.
  - title: State Guard Engine
    details: Plugins can declare pre-resolution conditions that must pass before data is signed and delivered. Guards are evaluated against live capability data using a simple expression syntax, blocking premature attestations on in-progress events.
---
