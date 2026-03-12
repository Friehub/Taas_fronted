---
layout: home

hero:
  name: "FrieHub TaaS"
  text: "Truth as a Service"
  tagline: A programmable, decentralized protocol for verifiable oracle logic that bridges real-world data to on-chain actions through cryptographically signed attestations.
  actions:
    - theme: brand
      text: Get Started
      link: /guides/getting-started
    - theme: alt
      text: Why TaaS?
      link: /guides/why-taas
    - theme: alt
      text: The Mission
      link: /guides/mission

  - title: Threshold Attestation (TSS)
    details: Data acquisition is secured by a (t, n) Threshold Signature Scheme. Oracle verdicts require M-of-N committee attestation, ensuring that no single provider can compromise data integrity.
  - title: Autonomous P2P Discovery
    details: The network is a self-healing hive using libp2p GossipSub and Kademlia. Nodes pulse their presence and are automatically discovered and load-balanced without manual configuration.
  - title: Sharded Storage (TDS)
    details: Truth outcomes and Recipe blueprints are sharded using Reed-Solomon and distributed across the P2P network, ensuring data survives even if multiple nodes go offline.
  - title: Natural Recipe Templates
    details: Define logic once (e.g., "Sports Score") and instantiate it thousands of times with parameters. One blueprint handles every sports match or asset price in existence.
  - title: Dynamic UI Discovery
    details: Recipes explain to the UI how to fetch their own inputs via the Gateway Hive, enabling platforms to generate dynamic forms (Match Pickers, Symbol Search) without code changes.
  - title: Developer-First SDK
    details: A strongly typed Fluent SDK with built-in simulation parity and Zod-based validation, making it efficient to build integrations and query verified facts in a zero-trust environment.
---
