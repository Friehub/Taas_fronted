---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "FrieHub TaaS"
  text: "Truth-as-a-Service"
  tagline: The first decentralized fact engine — verify any real-world event on-chain with structured, cryptographic proof.
  image:
    src: /logo.svg
    alt: Friehub Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guides/getting-started
    - theme: alt
      text: Read the Whitepaper
      link: /core/whitepaper

features:
  - icon: "📦"
    title: Rich, Structured Truth
    details: Traditional oracles return a single number. TaaS returns structured JSON — verify who won a match, whether a shipment arrived, or if a news headline is factual.
  - icon: "🌐"
    title: DePIN Node Network
    details: A global network of lightweight Sentinel nodes runs on everyday hardware (laptops, VPS, browser extensions). Nodes earn $TAAS tokens for relaying verified truth.
  - icon: "🔗"
    title: Helios Native
    details: Built for the Helios blockchain — uses Chronos for automatic market settlement and Hyperion for trustless cross-chain data reads, without needing bridges.
  - icon: "📜"
    title: Programmable Recipes
    details: Developers write TypeScript "Recipes" to define how truth is discovered. Any API, any data source, any logic — compiled to an immutable, reproducible format.
  - icon: "⚖️"
    title: Optimistic Attestation
    details: Results are submitted optimistically and finalized after a dispute window. Challenger nodes earn rewards for catching fraud, keeping the network honest.
  - icon: "🛠️"
    title: Developer-First SDK
    details: Write, test, and publish Recipes locally using the @friehub/taas-sdk. Mock feeds, sandbox execution, and iterate fast before deploying to the live network.
---

