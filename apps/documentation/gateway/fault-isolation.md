# Fault Model and Error Codes

The TaaS Gateway is designed so that any single component failure has a bounded scope. Plugin crashes do not crash the Core. A single bad attestation request does not affect P2P participation. This page documents the failure modes and the structured error code system that surfaces them.

---

## 1. Fault Isolation Table

| Failure | Scope | System Response |
| :--- | :--- | :--- |
| Sidecar process crashes (OOM, unhandled exception) | Sidecar process | Worker Supervisor in Hot-Core detects exit and respawns the Sidecar immediately. In-flight requests on that Sidecar connection are failed; new requests route to the fresh process. |
| Plugin throws at fetch time | Single source within a request | The plugin source is excluded from aggregation. If other sources succeed, the request continues. If all sources fail, `CAPABILITY_FAILED` is returned. |
| Plugin source times out | Single source within a request | UCM pivots to the next configured source. The Circuit Breaker for that source increments its failure counter. |
| Circuit Breaker trips (5 consecutive failures by default) | Single plugin source | Requests to that source are rejected immediately with a backoff message until the reset timeout expires (`OPEN` state). |
| BLS partial signature fails on malformed input | Single attestation | Error is caught and bounded. The node continues P2P gossip participation and DKG sessions. |
| TSS aggregation times out | Single request | Falls back to local single-key EIP-712 signing. Result is returned as `PRELIMINARY` finality. |
| P2P message exceeds 1 MB | Network-level | Message is rejected before deserialization to prevent memory exhaustion. The sender is not disconnected; the message is simply dropped. |
| Plugin output fails UCM schema validation | Single request | Sidecar returns `SCHEMA_VIOLATION`. The result is never presented to the BLS signing layer. |
| Rate limit exceeded for an external API source | Single source | Source is skipped for this request. `RATE_LIMITED` code is set if no alternatives are available. |
| `sender_id` does not match `propagation_source` | P2P message | Message is rejected (anti-spoofing). The peer is not forcibly disconnected — future valid messages from the same peer are processed normally. |

---

## 2. Error Code Reference

The `ErrorCode` enum is defined in `proto/gateway.proto` and mirrored in the Sidecar's `src/utils/error_codes.ts`. Every gRPC response carries an `error_code` field, enabling machine-readable error routing by the Hot-Core Rust consumer.

### Standard Codes

| Code | Value | Meaning | Node Operator Action |
| :--- | :--- | :--- | :--- |
| `OK` | `0` | Success. | No action required. |
| `INTERNAL` | `1` | Unhandled exception inside the Sidecar. | Check Sidecar logs. Look for `traceId` in the error object. |
| `UNAUTHORIZED` | `2` | Authentication token invalid, or a State Guard evaluated to `false`. | Verify node credentials, or inspect the guard expression that failed. |
| `TIMEOUT` | `4` | A plugin source or the Sidecar itself exceeded its deadline. | Check external API availability. Consider increasing the configured timeout. |
| `INVALID_ARGUMENT` | `5` | The gRPC request message was malformed or missing required fields. | Inspect the calling code — this is a programming error in the request construction. |
| `NOT_FOUND` | `6` | A requested resource or state context does not exist. | Verify plugin ID and category are correct in the request. Confirm the plugin is installed. |

### TaaS-Specific Codes

| Code | Value | Meaning | Node Operator Action |
| :--- | :--- | :--- | :--- |
| `CAPABILITY_FAILED` | `3` | Plugin logic executed but failed — all sources returned errors or were unavailable. | Check individual plugin logs. Verify API keys are correctly provisioned in the Vault. |
| `CONSENSUS_FAILED` | `7` | UCM aggregation failed — all configured sources diverged beyond acceptable deviation or all returned errors. | This may indicate all data providers returned conflicting data. Review `min_sources` setting in capability config. |
| `SCHEMA_VIOLATION` | `8` | Plugin output did not match the schema declared in the UCM capability registry. | Run `hot-core plugin install` to refresh the capability schema, or fix the plugin's `fetchData` output to match the declared `output_schema`. |
| `SIGNING_FAILED` | `9` | A cryptographic failure occurred — DKG ceremony stalled, BLS key was unavailable, or EIP-712 signing failed. | Check Vault integrity. Inspect hot-core logs for DKG or TSS session errors. |
| `RATE_LIMITED` | `10` | An external data provider or internal node limit was hit. | Check per-provider rate limit configuration. Consider adding fallback sources to the capability config. |
| `INSUFFICIENT_QUOTA` | `11` | The node's attestation credit balance is exhausted. | Recharge the node's attestation balance (EigenLayer AVS quota when implemented). |
| `STALE_DATA` | `12` | The fetched data timestamp is older than the UCM TTL policy allows. | The data provider may be lagging. Check source freshness and TTL configuration for the capability. |
| `PROVIDER_ERROR` | `13` | An external API returned a 5xx response or an explicit error. | The external data provider is degraded. Check provider status pages. |

---

## 3. Error Traceability

All errors in the gateway carry a `traceId` derived from the `X-Correlation-ID` gRPC metadata header. When diagnosing a failure:

1. Locate the `X-Correlation-ID` from the failed request.
2. Search Hot-Core structured logs (JSON) for `traceId: <value>`.
3. Search Sidecar structured logs (pino JSON) for `request_id: <value>`.
4. The error chain from plugin fetch through signing will be reconstructable across both processes.

Sensitive fields (`KEY`, `SECRET`, `TOKEN`) in log parameters are automatically masked to `[REDACTED]` by the `executePlugin` handler before any log call is made.
