# Gateway Overview

TaaS Gateway is the trust engine of the TaaS protocol. It is a single deployable unit responsible for fetching, attesting, and delivering verifiable data to on-chain consumers. It is not a data source itself — it enforces data provenance rules so that plugins never have to.

The gateway operates in two modes and is composed of two processes that together form a Unified Gateway Unit.

---

## The Two-Process Model

The gateway's architecture separates concerns by process boundary. The two processes share no memory. All communication is defined by a strict Protobuf contract and transported over gRPC.

```
┌────────────────────────────────────────────────────────────────┐
│                        Gateway Node                            │
│                                                                │
│  ┌──────────────────────────┐  gRPC  ┌──────────────────────┐  │
│  │   Hot-Core (Rust)         │◄──────►│  Sidecar (Node.js)   │  │
│  │                           │        │                      │  │
│  │  - libp2p P2P & Gossip    │        │  - Plugin Runner     │  │
│  │  - DKG / TSS (BLS12-381) │        │  - Truth Engine (UCM)│  │
│  │  - Worker Supervisor      │        │  - Schema Enforcement│  │
│  │  - VEE Fetch Pipeline     │        │  - Circuit Breakers  │  │
│  │  - Vault (Key Store)      │        │  - gRPC API Server   │  │
│  │  - Sentinel & Relayer     │        │                      │  │
│  └──────────────────────────┘        └──────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**Hot-Core owns trust. Sidecar owns flexibility.**

Hot-Core is written in Rust for performance and memory safety. It handles all operations that must be cryptographically correct: key management, threshold signing, P2P identity, and on-chain submission. Hot-Core never executes plugin code directly — it delegates that work to the Sidecar over gRPC.

The Sidecar is a Node.js process that runs plugin logic in a managed, supervised environment. It applies schema enforcement, aggregation strategy, and circuit-breaker safety before returning a result to Hot-Core for signing.

---

## Deployment Modes

The gateway has two runtime modes controlled by a single configuration flag (`p2p.enabled`).

| Mode | Config | Trust Model | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Sovereign Node** | `p2p.enabled = false` | Operator-trusted. Signed with node's own EIP-712 key. | DAOs, internal oracles, single-operator deployments. |
| **Mesh Network** | `p2p.enabled = true` | Byzantine fault tolerant. Requires 2/3 honest nodes. | DeFi protocols, prediction markets. |

In Sovereign mode the node operates completely independently. In Mesh mode it participates in a libp2p P2P swarm, proposes consensus values to peer nodes via GossipSub, and collects BLS12-381 partial signatures until the configured signing threshold is met.

The codebase is fully feature-gated. Building without the `p2p` or `tss` features produces a compact binary with zero P2P dependencies.

---

## Components at a Glance

| Component | Process | Responsibility |
| :--- | :--- | :--- |
| VEE (Verifiable Execution Environment) | Hot-Core | Fetch pipeline coordinator. Manages caching, quota, and request deduplication. |
| TSS (Threshold Signature Scheme) | Hot-Core | BLS12-381 partial signature production, gossip, and aggregation. |
| Worker Supervisor | Hot-Core | Monitors the Sidecar process. Respawns it immediately on crash or OOM. |
| Vault | Hot-Core | AES-GCM encrypted store for all node secrets. |
| Sentinel | Hot-Core | Watches `TruthOracleV3` for `TruthRequested` on-chain events. |
| Relayer | Hot-Core | Submits signed results on-chain via `propose_outcome`. |
| UCM / Truth Engine | Sidecar | Plugin dispatch, schema validation, and aggregation. |
| Plugin Runner | Sidecar | Dynamically loads and executes TypeScript data adapters. |
| gRPC Server | Sidecar | Implements the `LogicHost` service defined in `gateway.proto`. |

---

## Next Steps

- [Architecture Deep-Dive](/gateway/architecture) — subsystem internals and request lifecycle diagrams.
- [Fault Model and Error Codes](/gateway/fault-isolation) — failure modes and structured error reference.
- [Security Model](/gateway/security) — Vault, SSRF protection, anti-spoofing, and security redlines.
