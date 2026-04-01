# Protocol Overview

The TaaS protocol defines how real-world data is fetched, attested, and delivered to on-chain consumers with a verifiable chain of custody. The protocol is built on two foundations: a cryptographic identity model that answers "who signed this", and a structured data format — the TruthPoint — that answers "what was signed and when".

---

## The Core Problem

Blockchains are deterministic environments that cannot reach the outside world. Every piece of real-world data — a token price, a sports result, an economic indicator — must be explicitly bridged into the on-chain environment by a trusted party.

TaaS replaces trust in a party with verifiable proof. Every value attested by the network is:

1. Fetched from one or more authoritative external APIs by a registered plugin.
2. Validated against a declared output schema by the UCM Truth Engine.
3. Aggregated across multiple independent sources using a configurable strategy.
4. Cryptographically signed — bound to the exact value, source list, and timestamp — producing a TruthPoint.
5. Verifiable on-chain against the `TruthOracleV3` registry without access to the original data.

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

---

## Protocol Documents

| Document | Description |
| :--- | :--- |
| [TruthPoint Specification](/protocol/truthpoint) | Full canonical structure of a TruthPoint, all field definitions, consumer verification procedure, and identity rules. |
