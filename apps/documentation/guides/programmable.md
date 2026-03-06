# Why TaaS is Programmable

TaaS (Truth as a Service) is built from the ground up to solve a fundamental limitation of traditional oracle networks: rigidity. Most oracles operate as simple data pipelines, pushing pre-configured price feeds (like BTC/USD) on a set schedule.

TaaS flips this model. Instead of just answering "What is the price of Bitcoin?", it provides a platform where you can ask, "Fetch the price of Bitcoin from these three specific exchanges, drop the highest outlier, take the average, convert it to Euros, and sign the result—all triggered by a specific on-chain contract state."

Here is a breakdown of the entire architecture, focusing on its event-driven and programmable nature:

## Why is it Programmable?

In a traditional setup, if a developer wants a new, highly specific data feed (e.g., the current weather in Tokyo combined with a sports match outcome), the oracle provider has to write custom infrastructure and deploy a new, dedicated feed.

TaaS makes the oracle programmable by shifting the computation logic from the oracle provider to the developer. Developers write a "Recipe"—a structured, step-by-step workflow (represented as a Directed Acyclic Graph, or DAG). This workflow is sent to the oracle network dynamically. The network is agnostic to what it is processing; it simply acts as a secure, decentralized execution environment that reads the developer's instructions, executes them, and mathematically proves it did so correctly.

## The Whole Architecture

To ensure security, determinism, and flexibility, the architecture is divided into distinct operational layers:

### 1. The Trigger (Event-Driven Layer)
The entire system sits idle until an event activates it. This event can be an on-chain smart contract emitting a "Data Requested" log, or an off-chain API webhook.

- **Listening Nodes:** A decentralized network of independent oracle nodes constantly monitors blockchains and ingress queues for these events.
- **Payload Delivery:** When an event fires, it passes along the "Recipe" (the programmed instructions) and any required context variables (like target parameters or deadlines).

### 2. The Execution Engine (The Programmable Core)
When a node picks up an event, it feeds the programmable instructions into a Sandboxed Execution Engine. Instead of running hardcoded proprietary scripts, this engine parses the developer's workflow. The workflow can consist of:

- **Data Fetching Nodes:** Commands to pull raw data from various external APIs (Crypto, Sports, Weather, custom endpoints).
- **Transformation Nodes:** Commands to parse JSON, extract specific fields, map values, or perform logical conditions.
- **Aggregation Nodes:** Commands to apply mathematical operations (like mean, median) across multiple data points to eliminate outliers or find a consensus.

Because the engine executes these workflows like a script runner, the oracle is infinitely adaptable to any data requirement without requiring infrastructure updates.

### 3. The Secure Gateway (The Information Brokers)
Oracle nodes do not request data directly from the open internet, as this exposes their IP addresses and risks censorship or targeted attacks. Instead, the Execution Engine routes its fetch commands through a resilient network of external Gateways.

- These Gateways authenticate with premium APIs, fetch the raw requested data, package it, and sign it with a unique cryptographic key.
- To ensure high availability, the engine requires data to be fetched through multiple independent Gateways concurrently.

### 4. The Deterministic Verification Layer
The most challenging aspect of a programmable decentralized network is ensuring all independent nodes, running the same instructions at slightly different times, arrive at the exact same undeniable truth.

- **Strict Time-Locking:** The architecture removes any variable of time (like checking the current clock during execution). Instead, a strict "Attestation Epoch" is locked in at the very start of the event. All external data fetched via the Gateways is locked to that exact epoch.
- **Cryptographic Hashing:** As the Execution Engine processes the developer's workflow, every single step, transformation, and API response is normalized (standardized format) and hashed mathematically.

### 5. Consensus and Attestation
Once a node finishes executing the programmed workflow, it doesn't just return an answer; it returns an Attestation Proof.

- This proof is a cryptographic signature that binds the original request, the exact path of the executed workflow, the raw data received from the gateways, and the final output together.
- Multiple independent oracle nodes submit these proofs to an aggregation layer (often an on-chain smart contract). Because the system forces strict determinism through time-locking and hashing, the proofs from honest nodes will mathematically match.

Once a majority consensus is reached, the final result is permanently stamped onto the blockchain, finalizing the event loop.
