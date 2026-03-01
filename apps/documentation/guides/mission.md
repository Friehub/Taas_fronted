# The Origin Story

## We Started with a Prediction Market

FrieHub started the same way many blockchain projects do: by trying to build something useful and immediately hitting infrastructure problems.

The original vision was a **decentralized prediction market**. Users would place bets on real-world outcomes — sports results, election outcomes, financial benchmarks — and a smart contract would automatically settle those bets based on what actually happened.

The concept was sound. But as soon as we started building, we ran into a problem that no prediction market had ever cleanly solved:

> **How do you get reliable, tamper-proof real-world data into a smart contract?**

A prediction market where a single API controls the final outcome is not decentralized. It is just a centralized database with extra steps. A bad API response, a compromised data provider, or a simple network timeout should not be allowed to decide who wins or loses money.

We spent months evaluating every existing oracle solution on the market.

---

## The Problem with Existing Oracles

**Chainlink** is excellent for price feeds but was not designed for arbitrary real-world queries. You cannot ask Chainlink "Did Team A beat Team B last night?" without building and paying for a custom data feed.

**UMA Protocol** uses an optimistic model — it assumes outcomes are correct unless challenged. This works for slow-moving financial data but is poorly suited to time-sensitive events where a dispute window is too long to be practical.

**Pyth Network** is blazing fast for high-frequency financial data but is centralized around a small set of institutional publishers and does not generalize to non-financial domains.

Every existing solution was either rigid (locked to specific data types), trusted (relying on a central publisher), or slow (dispute windows measured in hours or days).

---

## The Pivot: Truth as a Service

We stopped trying to build a prediction market and started building the infrastructure layer that all prediction markets, and every other smart contract that needs real-world data, actually need.

The core insight was this:

> **The problem is not "how do we resolve a bet?" The problem is "how do we establish verifiable truth from off-chain data at scale?"**

A smart contract does not care that the question is about a sports result. It cares that the answer is:
1. **Correct** — derived from real data sources, not fabricated.
2. **Verifiable** — anyone can re-run the process and reach the same answer.
3. **Final** — once attested, the result is immutable and challengeable within a fair window.

From that pivot, TaaS was born.

---

## What TaaS Is

**Truth as a Service (TaaS)** is a decentralized protocol for bringing verifiable, off-chain facts on-chain through a combination of:

- **Declarative Recipes** — JSON blueprints that define exactly how truth should be derived from data sources.
- **Sovereign Computation** — Truth Nodes execute recipe logic locally, produce cryptographic execution traces, and propose outcomes to a smart contract.
- **Economic Incentives** — Nodes must bond tokens when proposing. Incorrect proposals can be challenged, slashing the proposer and rewarding the challenger.
- **Open Plugin System** — Any data source — sports APIs, financial data, weather services, on-chain events — can be integrated as a typed adapter plugin.

We are not just an oracle. We are a **programmable, general-purpose truth attestation engine**.
