# Security Model

The TaaS Gateway is designed for deployment in adversarial environments. The following sections document the security controls that are built into the core architecture, not applied as an afterthought.

---

## 1. The Vault

All node secrets are stored in an AES-GCM encrypted file store called the Vault. Nothing sensitive is ever written to configuration files, environment variables committed to source, or application logs.

| Secret | Vault Key | Notes |
| :--- | :--- | :--- |
| Ethereum private key | `eth_key.enc` | Used for on-chain registration, gas, and LOCAL-mode EIP-712 signing. |
| BLS12-381 signing key | `bls_key.enc` | Used for TSS partial signature production in Mesh mode. |
| libp2p peer identity | `p2p_identity.enc` | The node's stable P2P network identity. |
| Plugin API keys | Per-plugin entries | Injected at fetch time into the `SovereignAdapter` — never logged. |

API keys stored in the Vault are injected into adapter instances at request time inside the `executePlugin` handler. The injection logic masks any parameter key containing the strings `KEY`, `SECRET`, or `TOKEN` before writing to structured logs.

---

## 2. Security Redlines

The following are non-negotiable constraints enforced across the codebase. Violations are blocked by CI.

| Rule | Enforcement |
| :--- | :--- |
| No `unsafe` Rust code | Clippy lint `forbid(unsafe_code)` except in explicitly audited P2P performance paths. |
| No `require()` or `eval()` in TypeScript | ESLint rule `no-eval`. |
| All external HTTP calls carry a hard timeout | `safeFetch` enforces a 15-second deadline by default. The abort signal is passed through to the underlying `axios` interceptor. |
| Secrets must live in the Vault | `DEVELOPER_STANDARDS.md` redline. Gitleaks scanning in `security.yml` on every PR and weekly. |
| All P2P messages must be size-checked | Messages exceeding 1 MB are rejected before deserialization. This is a mandatory check in the `p2p` feature module. |
| All P2P messages must verify identity | `sender_id` field in the message payload must match the `propagation_source` in the libp2p envelope. Mismatches are rejected as anti-spoofing. |
| Plugin output must pass UCM schema validation | `assertSchemaCompliance` is called on every plugin response before it enters the signing pipeline. |

---

## 3. SSRF Protection

The `SovereignAdapter` base class installs an Axios request interceptor that calls `NetworkSafety.validateUrl()` on every outgoing HTTP request made by a plugin. This check blocks requests to:

- Private RFC-1918 IP ranges (`10.x`, `172.16.x`, `192.168.x`).
- Loopback addresses (`127.0.0.1`, `::1`).
- Link-local addresses (`169.254.x.x`).
- Unresolvable or suspicious hostnames.

A plugin cannot bypass this check by constructing a raw `fetch` or `axios` call — all plugin HTTP traffic is expected to go through the adapter's `this.client` Axios instance, which has the interceptor installed at construction time. Using raw `fetch` is disallowed by ESLint and flagged in code review.

---

## 4. P2P Anti-Spoofing

In Mesh Network mode, nodes gossip signed payloads over libp2p GossipSub. An adversarial node could attempt to forge messages appearing to originate from a legitimate peer.

The gateway enforces the following verification on every received P2P message:

1. Extract the `sender_id` from the message payload.
2. Extract the `propagation_source` from the libp2p envelope (populated by the transport layer based on the actual connection).
3. Reject the message if `sender_id != propagation_source`.

This prevents a compromised or malicious node from injecting signature shares or proposals that appear to originate from a trusted peer, which would allow it to influence BLS aggregation without holding the corresponding private key.

---

## 5. Supply Chain Integrity

| Control | Tooling |
| :--- | :--- |
| Rust dependency auditing | `cargo-deny` with `deny.toml`. GPL and non-permissive licenses are blocked. Known advisories from `rustsec` are checked in `verify.yml`. |
| Node.js dependency auditing | `pnpm audit` with a security advisory threshold. Run in `verify.yml` on every merge to `main`. |
| Secret scanning | Gitleaks in `security.yml` runs on every PR and on a weekly schedule. |
| Dependency update automation | Dependabot covers npm, cargo, and GitHub Actions on a weekly cadence. |
| Code ownership | `CODEOWNERS` assigns cryptographic paths (`rust/hot-core/src/features/tss/`, `proto/`) to the `@Friehub/gateway-security` team for mandatory review. |

---

## 6. Responsible Disclosure

Security vulnerabilities should be reported according to the policy defined in `SECURITY.md` in the gateway repository root. The policy defines the contact email, expected response timeline (72 hours initial acknowledgment), and the scope of in-scope and out-of-scope components.

Do not open public GitHub issues for security vulnerabilities.
