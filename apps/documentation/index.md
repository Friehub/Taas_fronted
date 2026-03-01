---
layout: home

hero:
  name: "FrieHub TaaS"
  text: "Truth as a Service"
  tagline: A programmable, decentralized protocol that bridges real-world data to on-chain smart contract actions — reliably, at scale, and without central trust.
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

features:
  - title: Recipe-Based Architecture
    details: Define any truth query using a declarative JSON recipe. No custom smart contract deployments are needed for new data types. The execution engine interprets any recipe on the fly.
  - title: Sovereign Computation
    details: Truth Nodes execute logic locally using the sovereign-logic SDK before proposing outcomes on-chain. Multi-source consensus, outlier detection, and conditional logic are all supported natively.
  - title: Gateway Proxy Mode
    details: Developers can test and execute recipes without their own API keys. The TaaS Gateway holds premium data source credentials and proxies requests securely.
  - title: Dispute and Challenge Layer
    details: A Challenger-Bot monitors on-chain proposals and automatically disputes incorrect outcomes using independent local re-verification. Economic bonds enforce honesty.
  - title: Pluggable Data Source Registry
    details: Any data provider — sports scores, financial data, weather, crypto prices — can be registered as a SovereignAdapter plugin in the CategoryMapper registry.
  - title: Built for Developers
    details: A typed SDK, a JSON Recipe format, a Gateway REST API, and a public Docker image make it easy to build new integrations, run a node, or query verified truth from any smart contract.
---
