# The Origin Story

## Prediction Market Foundations

FrieHub was established as many blockchain projects are: by identifying a critical infrastructure deficit while attempting to build a high-utility application.

The initial vision was a decentralized prediction market where users could place stakes on real-world outcomes, such as sports results, election outcomes, or financial benchmarks. The architecture required a smart contract to automatically settle these stakes based on objective reality.

While the concept was fundamentally sound, the implementation revealed a persistent industry-wide problem:

> **How can reliable, tamper-proof real-world data be integrated into a smart contract?**

A prediction market where a single API controls the final outcome is not truly decentralized. A defective API response, a compromised data provider, or a network timeout should not determine the resolution of high-value transactions. This realization led us to evaluate the limitations of existing oracle solutions.

---

## Limitations of Current Oracle Architectures

**Chainlink** provides robust price feeds but was not primarily designed for arbitrary real-world queries. Supporting non-financial events often requires significant coordination and bespoke data feed implementation.

**UMA Protocol** utilizes an optimistic model where outcomes are accepted unless challenged. This is effective for certain financial instruments but is often too slow for time-sensitive events where immediate resolution is required.

**Pyth Network** focuses on high-frequency financial data from institutional publishers. While highly efficient, it does not easily generalize to non-financial domains like sports or weather.

Most available solutions were identified as being either too rigid, too dependent on centralized publishers, or too slow for modern decentralized applications.

---

## The Pivot to Truth as a Service

We redirected our focus from building a specific application to developing the infrastructure layer that all decentralized applications require to interact with off-chain reality.

The core objective shifted from resolving specific events to establishing a verifiable truth protocol at scale. A smart contract requires data that is:
1. **Correct**: Derived from reliable data points, not fabricated.
2. **Verifiable**: Reproducible by any network participant.
3. **Final**: Immutable once attested, while allowing for a fair dispute window.

This evolution resulted in the creation of Truth as a Service (TaaS).

---

## Defining TaaS

**Truth as a Service (TaaS)** is a decentralized protocol designed to bring verifiable, off-chain facts on-chain through a robust framework:

- **Declarative Truth Definitions**: High-level blueprints that define how truth is derived from various data sources via the TaaS SDK.
- **Sovereign Computation**: Truth Nodes execute specialized logic locally, producing verifiable execution traces and proposing outcomes on-chain.
- **Economic Incentives**: Nodes provide bonds when proposing results. Challenges are incentivized through the slashing of incorrect proposers.
- **Open Plugin Framework**: Any data source—including sports, finance, weather, and on-chain events—can be integrated through a standardized adapter architecture.

TaaS is a programmable, general-purpose truth attestation engine for the decentralized web.
