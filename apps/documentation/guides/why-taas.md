# Why TaaS?

In the current blockchain landscape, data is abundant, but **trust** is expensive. We built TaaS (Truth-as-a-Service) to solve the fundamental "Truth Gap" between real-world events and on-chain intelligence.

## The Problem: The High Cost of Unverifiable Data

Most modern applications rely on data from third-party APIs. However, when this data needs to trigger financial decisions (like a prediction market payout or an insurance claim), simple data isn't enough.

1. **The Trust Deficit**: APIs can be manipulated, go offline, or return incorrect data. Relying on a single source of truth is a single point of failure.
2. **Ambiguity**: Real-world events are complex. "Who won the game?" seems simple, but if a match is abandoned at halftime, a standard oracle might break or return invalid data.
3. **Operational Overhead**: Building custom decentralised adapters for every data point is slow, expensive, and difficult to maintain.

## The Solution: TaaS Protocol

TaaS provides a **standardized, decentralized truth engine** that converts raw data into verifiable cryptographic attestations.

### 1. Programmable Verification
Instead of just fetching a number, developers write **Recipes**. These are sandboxed logic scripts that define exactly how data should be fetched, compared, and computed. 

### 2. Multi-Node Attestation
The Friehub network of Sentinel nodes executes these Recipes. They don't just report data; they provide a **consensus-based proof** that the result is correct based on the logic you defined.

### 3. Sub-Second Integrity
By using an optimistic attestation model with high-performance nodes, TaaS achieves sub-second resolution for data that requires immediate finality, while maintaining protocol-grade security.

## Is Friehub an Oracle?

Yes, but TaaS is more than just a data bridge. While traditional oracles merely relay information, Friehub provides **Truth Infrastructure**. We combine data fetching with programmable verification logic, multi-node consensus, and cryptographic settlement to ensure that the data you receive is the absolute, verified truth.

## Powered by Friehub

TaaS is the core protocol of Friehub. We own and operate the underlying infrastructure, ensuring that the network remains sovereign, permissionless, and dedicated to the mission of absolute truth.
