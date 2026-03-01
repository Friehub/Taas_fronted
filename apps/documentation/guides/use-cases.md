# Use Cases

TaaS is a general-purpose truth layer. Any application that requires a smart contract to act on factual information about the real world is a candidate for TaaS integration.

---

## Prediction Markets and Outcomes

The original domain that inspired TaaS. A prediction market needs to know if a proposition is true or false at a specific point in time.

- Sporting event results (Who won the match? What was the final score?)
- Political elections (Which candidate received more votes?)
- Financial thresholds (Did BTC trade above $100,000 at the close of this day?)

With TaaS, each proposition is encoded as a **BINARY Recipe** and resolved by multiple independent Truth Nodes. The smart contract settles positions as soon as the TruthOracle receives a bonded, verified attestation.

---

## DeFi: Liquidation Triggers and Collateral Valuation

Decentralized lending protocols need accurate, real-time price feeds to liquidate undercollateralized positions before they go underwater.

TaaS supports high-frequency **SCALAR Recipes** that aggregate price data from multiple sources (CoinGecko, Binance, on-chain DEX oracles) using configurable consensus strategies, making manipulation significantly harder than using a single price feed.

---

## Insurance Protocols

Parametric insurance smart contracts pay out automatically when a triggering event is formally attested.

- Crop insurance triggered when rainfall data from OpenWeather falls below a threshold.
- Travel insurance triggered when a flight delay exceeds N minutes.
- Storm insurance triggered when a weather service reports hurricane-force winds in a specific area.

Each policy is a **BINARY Recipe** with a specific data source, parameters, and an attestation timestamp window.

---

## Sports Betting and Fantasy Sports

Real-money on-chain fantasy sports platforms need granular, player-level statistics. A player's final score for a night's performance, a pitcher's strikeout count, a skier's race time — all expressible as **SCALAR or CATEGORICAL Recipes** pulling from the Sportmonks or SportsDB adapters registered in the TaaS Plugin Registry.

---

## DAO Governance and Condition Execution

A DAO that wants to execute a treasury transfer "if the protocol hits 1M in TVL" or "if CPI index rises above 4%" can use TaaS to act as a trustless condition verifier. The DAO submits a recipe describing the condition, and the TruthOracle smart contract triggers the execution when the condition is attested.

---

## On-Chain Weather Derivatives

Smart contracts can represent financial positions that pay out based on measurable physical phenomena. A farmer can hedge against drought risk with a contract that references OpenWeather data attested through the TaaS protocol — no intermediary, no insurer discretion.

---

## Proof-of-Reality for AI Agents

Autonomous AI agents operating on-chain need a reliable source of ground truth. TaaS provides a trustless mechanism for agents to verify real-world state before taking irreversible on-chain actions — a "facts oracle" that AI agents can query and trust.
