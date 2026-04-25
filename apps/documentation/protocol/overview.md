# Protocol Overview

The TaaS protocol defines how real-world facts are resolved, attested, and delivered to on-chain consumers with a verifiable chain of custody. Positioning itself as a **Sovereign Fact Engine**, the protocol is built on two foundations: a cryptographic identity model that answers "who resolved this", and a structured evidence format — the **TruthPoint** — that answers "what was resolved and with what proof".

---

## Fact Resolution Lifecycle

TaaS replaces simple "oracle fetching" with verifiable proof. Every fact resolved by the network is:

1. **Sandboxed Isolation**: Data is retrieved from authoritative APIs by registered plugins running in secure V8 Isolates.
2. **Schema Verification**: Results are validated against strict output schemas enforced by the kernel.
3. **Multi-Step Consensus**: Observations are aggregated across independent nodes using a configurable strategy (Median, BLS, TEE).
4. **Evidence Production**: A **TruthPoint** is produced — cryptographically binding the value, the source provenance, and the timestamp.
5. **On-Chain Settlement**: TruthPoints are anchored to the **TaaSServiceManager** for consumer verification and economic settlement.

---

## Cryptographic Identity

The gateway uses two cryptographic identities per node that serve different roles:

| Identity | Key Type | Role |
| :--- | :--- | :--- |
| **Ethereum Identity** | secp256k1 (EIP-712) | On-chain registration, gas payment, and signing in Sovereign (LOCAL) mode. Always the `gatewayIdentity` field in a TruthPoint. |
| **BLS Identity** | BLS12-381 | Partial signature production and aggregation in Mesh (TSS) mode. Expressed via the `tssPublicKey` field when present. |

In LOCAL mode, the Ethereum key is sufficient. The data value, timestamp, and source list are hashed and signed using EIP-712 structured data. Any EVM chain can verify this signature against the node's registered Ethereum address.

In TSS mode, a BLS12-381 aggregate signature is produced by threshold consensus across multiple nodes. Both the EIP-712 signature (from the proposing node's Ethereum key) and the BLS aggregate (from the threshold group) must be present and valid.

---

## Signing Modes

| Mode | Trigger | Signature Type | Finality |
| :--- | :--- | :--- | :--- |
| `LOCAL` | P2P disabled, or request completed before TSS timeout | EIP-712 (secp256k1) | `PRELIMINARY` or `OFFICIAL` |
| `TSS` | P2P enabled and threshold met within `sign_timeout_secs` | BLS12-381 aggregate + EIP-712 | `OFFICIAL` |

---

## Finality States

Every TruthPoint carries a `finality` field that communicates how much trust a consumer should place in the value:

| State | Meaning |
| :--- | :--- |
| `PRELIMINARY` | Signed by the local node within the sign timeout. No threshold consensus. Suitable for low-stakes reads; not recommended for high-value settlement. |
| `OFFICIAL` | Threshold of nodes agreed on this value and BLS aggregation succeeded, or LOCAL mode with full source quorum met. |
| `DISPUTED` | The local node's value diverged from the swarm majority. Do not settle on a disputed TruthPoint. |

