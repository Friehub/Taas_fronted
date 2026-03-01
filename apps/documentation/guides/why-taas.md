# Why TaaS?

Existing oracle solutions solve narrow problems. TaaS was built to be **the general-purpose layer** for any smart contract that needs to act on real-world data.

---

## Comparison with Alternatives

| Feature | Chainlink | UMA | TaaS |
|---|---|---|---|
| Arbitrary data types | Requires custom feed | Limited | Any (via JSON Recipe) |
| Dispute mechanism | None (push model) | Optimistic window | Real-time challenger bots |
| Custom logic | Not supported | Not supported | Execution Engine (conditions, multi-source) |
| Developer testing | Complex node setup | Complex | Gateway Proxy (no API keys needed) |
| Data source plugins | Centralized operators | Centralized operators | Open `SovereignAdapter` standard |
| Decentralized computation | Aggregation only | Assertion model | Full local recipe execution per node |

---

## The Core Advantages

### 1. Infinite Data Support via Recipes
With Chainlink, supporting a new data type requires creating an on-chain contract, finding operators willing to run a new job, and paying for it. With TaaS, you write a JSON Recipe that describes the data logic. The network can support it immediately, without any protocol upgrade or operator coordination.

### 2. Verifiable, Local Execution
Every Truth Node in the TaaS network runs the same Recipe logic locally before proposing an outcome on-chain. This means the result is independently reproducible by anyone — nodes, challengers, smart contracts, and end users alike.

### 3. A Developer-First SDK
The `@friehub/sovereign-logic` and `@friehub/execution-engine` SDKs let anyone build a new data integration or run a custom Recipe in minutes. The Gateway Proxy eliminates the need for costly API subscriptions just to test.

### 4. Open Plugin Architecture
Any data provider can be integrated via the `SovereignAdapter` interface. The `CategoryMapper` in `@friehub/taas-plugins` organizes providers by domain (crypto, sports, finance, weather, social) and makes them available to all nodes at runtime.

### 5. Economic Security via Bonds
Truth Nodes must lock a token bond when proposing an outcome. If a Challenger Bot detects a discrepancy, it triggers an on-chain dispute. Incorrect proposers are slashed. This makes economic dishonesty significantly more costly than honest behavior.

---

## Built to Evolve

The TaaS architecture is modular by design:

- **New data types** can be added by anyone contributing a `SovereignAdapter` plugin.
- **New consensus strategies** (e.g., multi-node weighted voting) can be added to the execution engine without breaking existing recipes.
- **Zero-knowledge proof integration** is a planned upgrade — execution traces from the engine can be post-processed into ZK proofs, making verification entirely trustless.
