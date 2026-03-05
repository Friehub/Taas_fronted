# Why TaaS?

Existing oracle solutions solve narrow problems. TaaS was built to be the general-purpose layer for any smart contract that needs to act on real-world data.

---

## Comparison with Alternatives

| Feature | Chainlink | UMA | TaaS |
|---|---|---|---|
| Arbitrary data types | Requires custom feed | Limited | Any via JSON Recipe |
| Dispute mechanism | None (push model) | Optimistic window | Real-time challenger bots |
| Custom logic | Not supported | Not supported | Integrated engine: conditions, multi-source |
| Developer testing | Complex node setup | Complex | Gateway Proxy: no API keys needed |
| Data source plugins | Centralized operators | Centralized operators | Open interface standard |
| Decentralized computation | Aggregation only | Assertion model | Full local recipe execution per node |

---

## The Core Advantages

### 1. Unified Data Support via Recipes
With traditional oracles, supporting a new data type requires creating a new on-chain contract, finding operators willing to run a new job, and paying for it. With TaaS, you write a JSON Recipe that describes the data logic. The network supports it immediately without protocol upgrades or operator coordination.

### 2. Verifiable Local Execution
Every Truth Node in the TaaS network runs the same Recipe logic locally before proposing an outcome on-chain. This ensures the result is independently reproducible by all participants: nodes, challengers, smart contracts, and end users.

### 3. Developer-First Framework
The TaaS internal logic allows anyone to build a new data integration or run a custom Recipe in minutes. The Gateway Proxy eliminates the need for costly API subscriptions during testing.

### 4. Open Modular Architecture
Any data provider can be integrated via a standardized interface. The TaaS internal registry organizes providers by domain: crypto, sports, finance, weather, social. This makes them available to all nodes at runtime.

### 5. Economic Security via Bonds
Truth Nodes must lock a token bond when proposing an outcome. If a Challenger Bot detects a discrepancy, it triggers an on-chain dispute. Incorrect proposers are slashed. This makes economic dishonesty significantly more costly than honest behavior.

---

## Built to Evolve

The TaaS architecture is modular by design:

- New data types can be added by anyone contributing a standardized plugin adapter.
- New consensus strategies, such as multi-node weighted voting, can be added to the execution core without breaking existing recipes.
- Zero-knowledge proof integration is a planned upgrade. Execution traces from the engine can be processed into ZK proofs, making verification entirely trustless.
