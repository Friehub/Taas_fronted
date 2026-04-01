# TruthPoint Protocol Specification

**Specification Version**: 0.1 (Draft)
**Status**: Canonical — all gateway implementations must conform.

---

## 1. What Is a TruthPoint?

A TruthPoint is the atomic unit of verified data in the TaaS protocol. It is the signed, structured output that a TaaS Gateway node delivers to a smart contract or API consumer.

A TruthPoint answers three questions simultaneously:

1. **What** — the data value (e.g., `{ "price": 65123.45, "symbol": "BTCUSDT" }`)
2. **When** — the attestation timestamp, agreed upon at request time
3. **Who** — which node(s) attested to the value, and under what cryptographic identity

A response that answers only "what" without answering "when" and "who" in a verifiable way is not a TruthPoint. It is just JSON.

---

## 2. Canonical Structure

```json
{
  "specVersion": "0.1",
  "requestId": "uuid-v4",
  "attestationTimestamp": 1711730400,
  "category": "crypto",
  "method": "spotPrice",
  "value": {
    "price": 65123.45,
    "symbol": "BTCUSDT",
    "verifiableHash": "0xabc123..."
  },
  "signingMode": "LOCAL",
  "gatewayIdentity": "0xNodeEthereumAddress",
  "signature": "0xEIP712Signature",
  "tssPublicKey": null,
  "participatingSources": ["binance", "coingecko"],
  "finality": "OFFICIAL"
}
```

---

## 3. Field Definitions

| Field | Required | Description |
| :--- | :--- | :--- |
| `specVersion` | Yes | Protocol version string. Consumers must reject versions they do not recognize. |
| `requestId` | Yes | UUID (v4) uniquely identifying this attestation request. Consumers must check this is not a replay. |
| `attestationTimestamp` | Yes | Unix timestamp in seconds when the data was fetched. The EIP-712 signature cryptographically binds this value. A consumer that accepts a stale timestamp is accepting stale data. |
| `category` | Yes | UCM data category (e.g., `crypto`, `sports`). Used by the resolver to identify the correct capability registry. |
| `method` | Yes | UCM method within the category (e.g., `spotPrice`). Together with `category`, uniquely identifies what was fetched. |
| `value` | Yes | The data payload. Its shape is plugin-specific, validated against the `output_schema` declared in the capability registry. Must always include `verifiableHash`. |
| `value.verifiableHash` | Yes | The `keccak256` hash of the canonical JSON serialization of `value` (sorted keys, no whitespace). This is the exact value bound by the EIP-712 signature. |
| `signingMode` | Yes | `LOCAL` — signed by a single node's Ethereum key. `TSS` — signed by a BLS12-381 threshold aggregate across committee nodes. |
| `gatewayIdentity` | Yes | The Ethereum address of the signing node (LOCAL mode), or the registered oracle identity (TSS mode). This is the identity checked against the on-chain registry. |
| `signature` | Yes | EIP-712 structured data signature over the tuple `(requestId, attestationTimestamp, verifiableHash, participatingSources)`. |
| `tssPublicKey` | Conditional | The BLS12-381 aggregate public key used for the threshold signature. Required when `signingMode = TSS`. `null` in LOCAL mode. |
| `participatingSources` | Yes | Array of source plugin IDs that contributed to the `value`. Minimum one entry. Included in the signed payload. |
| `finality` | Yes | See Section 5. |

---

## 4. Consumer Verification Procedure

A consumer — whether a smart contract or an off-chain application — must perform all of the following steps to trust a TruthPoint. Skipping any step weakens the security guarantee.

**Step 1 — Check `specVersion`**
Reject if the version string is not recognized by your consumer implementation.

**Step 2 — Check `requestId` uniqueness**
Maintain a set of seen `requestId` values. Reject if this ID has been seen before (replay attack prevention).

**Step 3 — Recompute `verifiableHash`**
Serialize the `value` object with lexicographically sorted keys and no whitespace. Compute `keccak256`. Reject if it does not match `value.verifiableHash`.

**Step 4 — Verify `signature`**
Reconstruct the EIP-712 typed data struct and recover the signer address from the signature. The recovered address must match `gatewayIdentity`.

**Step 5 — Check `gatewayIdentity` on-chain**
Query the `TruthOracleV3` registry contract to confirm the node is registered and has not been slashed.

**Step 6 — If `signingMode = TSS`, verify the BLS aggregate**
Verify the BLS12-381 aggregate signature against `tssPublicKey` over the same hash. Confirm `tssPublicKey` is registered in the on-chain registry.

**Step 7 — Apply `finality` policy**
This is an application-level decision. Do not use a `PRELIMINARY` TruthPoint as the basis for high-value financial settlement. Only `OFFICIAL` finality guarantees threshold consensus.

---

## 5. Finality States

| State | Meaning | When Set |
| :--- | :--- | :--- |
| `PRELIMINARY` | Signed by the local node before the TSS threshold was reached. | Within `sign_timeout_secs`, P2P disabled, or TSS aggregation still pending when the response was required. |
| `OFFICIAL` | Threshold of nodes agreed on this exact value and BLS aggregation succeeded. Also used in LOCAL mode when full source quorum was met. | TSS aggregation complete, or LOCAL mode with `min_sources` quorum satisfied. |
| `DISPUTED` | The local node's value diverged from the swarm consensus majority. The local node detected via `wait_for_consensus` that a different value was accepted by the majority. | Stored internally as a rogue report; reported to the caller when supported. |

Do not settle high-stakes outcomes on `PRELIMINARY` TruthPoints. `DISPUTED` TruthPoints should trigger a re-query and escalation to the dispute resolution mechanism.

---

## 6. Identity Rules

The gateway maintains two cryptographic identities that serve distinct roles:

| Identity | Key Type | Canonical Role |
| :--- | :--- | :--- |
| **Ethereum Identity** | secp256k1 | Always `gatewayIdentity`. Used for on-chain registration and LOCAL-mode EIP-712 signing. |
| **BLS Identity** | BLS12-381 | TSS partial signature production. Expressed as `tssPublicKey` in the TruthPoint. Never replaces the Ethereum identity. |

In TSS mode, both signatures must be present and valid. The Ethereum address is the registered identity on-chain. The BLS aggregate key is the cryptographic proof that a threshold of nodes agreed on the value.

---

## 7. Current Implementation Status

The following fields are defined in this specification but are not yet emitted by the current gateway implementation:

| Field | Status |
| :--- | :--- |
| `specVersion` | Not yet emitted by `sign_and_persist_result`. |
| `signingMode` | Not yet included in the signed response. |
| `tssPublicKey` | Not yet included in the signed response. |
| `DISPUTED` finality | Detected internally (`store_rogue_report`) but not yet returned to the caller. |

These gaps are tracked in `TODO.md` in the gateway repository. Consumers building against this spec should account for these fields being absent in the current release.
