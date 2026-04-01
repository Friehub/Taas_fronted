# Glossary

Definitions for terms used throughout TaaS Gateway documentation. Terms are listed alphabetically.

---

## A

**Aggregation Strategy**
A named algorithm in the UCM that reduces multiple data source responses into a single canonical value. Built-in strategies are `MEDIAN`, `MEAN`, `CONSENSUS` (MODE), `AVG`, `FIRST`, and `UNION`. The strategy for each capability method is declared in the UCM capability registry JSON.

**Attestation**
The act of a gateway node cryptographically signing a data value, binding together the value, the timestamp, and the node's identity into a verifiable unit. The output is a TruthPoint.

**AttestationContext**
A structured object (`requestId`, `attestationTimestamp`, `deadline`, `attempt`) passed through the execution pipeline to ensure all plugin fetches for a given request use the same canonical timestamp, preventing replay inconsistencies.

---

## B

**BLS12-381**
A pairing-friendly elliptic curve used for threshold signatures in Mesh Network mode. Partial signatures from multiple nodes can be aggregated into a single compact aggregate signature verifiable against the combined public key. The BLS identity is separate from the node's Ethereum identity.

**Byzantine Fault Tolerance (BFT)**
A property of a distributed system that allows it to operate correctly even if some nodes behave incorrectly or maliciously. The TaaS Mesh Network requires 2/3 of nodes to be honest for the TSS aggregation to produce a valid result.

---

## C

**Circuit Breaker**
A resilience pattern implemented in `SovereignAdapter`. After a configurable number of consecutive failures from an external API source, the breaker transitions to `OPEN` state and rejects requests immediately without calling the API, allowing the provider time to recover. After a reset timeout, one probe request is sent (`HALF_OPEN`). If it succeeds, the breaker closes.

**Capability Registry**
JSON files stored in `lib/ucm/registry/` (Sidecar) and `resources/data/capabilities/` (Hot-Core). Each file maps method names to their UCM configuration: aggregation strategy, output schema, and minimum source count. Updated automatically by `hot-core plugin install`.

**Conventional Commits**
A commit message specification enforced by `commitlint` in the gateway repository. Format: `type(scope): description`. Valid types include `feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `ci`, `chore`, `security`.

---

## D

**DataCategory**
An enum (`DataCategory`) defining the top-level namespace for plugin data types. Values: `crypto`, `sports`, `forex`, `weather`, `economics`, `finance`, `onchain`, `social`, `prediction`, `news`, `ai`, `web`, `calendar`, `agent`, `random`, `custom`.

**DKG (Distributed Key Generation)**
A cryptographic protocol by which multiple nodes collaboratively generate a shared BLS key pair. No single node ever holds the complete private key. Each node receives a key share. The DKG ceremony is coordinated over libp2p before TSS signing becomes active.

**DISPUTED (finality state)**
A TruthPoint finality status indicating the local node's computed value diverged from the swarm majority during `wait_for_consensus`. A disputed TruthPoint should not be used for high-value settlement.

---

## E

**EIP-712**
An Ethereum standard for typed structured data signing. TaaS uses EIP-712 to sign TruthPoints — the signature binds `(requestId, attestationTimestamp, verifiableHash, participatingSources)` to the gateway's Ethereum address. Any EVM contract can verify this signature without accessing the original data.

**ErrorCode**
A Protobuf enum defined in `gateway.proto` and mirrored in the Sidecar's TypeScript. Every gRPC response carries an `ErrorCode` field providing machine-readable failure diagnostics. Standard codes: `OK`, `INTERNAL`, `UNAUTHORIZED`, `TIMEOUT`, `INVALID_ARGUMENT`, `NOT_FOUND`. TaaS-specific codes: `CAPABILITY_FAILED`, `CONSENSUS_FAILED`, `SCHEMA_VIOLATION`, `SIGNING_FAILED`, `RATE_LIMITED`, `INSUFFICIENT_QUOTA`, `STALE_DATA`, `PROVIDER_ERROR`.

---

## F

**Finality**
The certainty level of a TruthPoint's value. Three states: `PRELIMINARY` (local node only, no threshold), `OFFICIAL` (threshold consensus or full source quorum), `DISPUTED` (diverged from majority). High-value on-chain settlement should only accept `OFFICIAL` finality.

---

## G

**GossipSub**
A libp2p publish-subscribe protocol used by the gateway for P2P message propagation. Nodes gossip `ConsensusProposal` messages and BLS signature shares using GossipSub topics. Message size is capped at 1 MB before deserialization.

**GuardEngine**
The Sidecar subsystem (`lib/guards/engine.ts`) that evaluates State Guard expressions against live capability data. Guards use the syntax `<capability>.<field> <operator> <value>`.

---

## H

**Hot-Core**
The Rust binary that forms the trust layer of the TaaS Gateway. Responsibilities: cryptographic key management (Vault), BLS threshold signing (TSS), libp2p P2P networking, the VEE fetch pipeline, Worker Supervisor, Sentinel, and Relayer.

**Hot-Reload**
The ability to install or update a plugin at runtime without restarting the Sidecar process. Implemented via the `ReloadPlugin` gRPC RPC. The manifest is reloaded from disk, the old plugin instance is unregistered, and the new module is dynamically imported.

---

## K

**Kademlia DHT**
A distributed hash table algorithm used by libp2p for peer discovery. Gateway nodes use Kademlia to find and connect to other nodes in the Mesh Network without pre-configured peer lists (though `workers.endpoints` can provide bootstrap peers).

---

## L

**libp2p**
A modular peer-to-peer networking framework. TaaS uses libp2p for P2P peer identity, connection management, GossipSub message propagation, and Kademlia peer discovery in Mesh Network mode.

**LogicHost**
The gRPC service name defined in `gateway.proto` and implemented by the Sidecar. Hot-Core is the client; the Sidecar is the server. The four RPCs are: `ExecutePlugin`, `ExecuteNode`, `Discover`, `ReloadPlugin`.

**LogicRegistry**
The Sidecar's runtime registry of loaded plugin instances. Manages plugin lifecycle: `initialize()` on load, `dispose()` on unregister. Built on top of `NodePluginLoader`.

---

## M

**Master Password**
The AES-GCM encryption key for the Vault. Set during `hot-core init`. Every start requires the Master Password to decrypt the node's Ethereum and BLS keys. Never stored in plaintext.

**Mesh Network**
Deployment mode where multiple gateway nodes form a P2P swarm and use BLS threshold signatures to collectively attest data. Requires `p2p.enabled = true` and `workers.enable_tss = true`. Byzantine fault tolerant with 2/3 honest nodes.

---

## O

**OFFICIAL (finality state)**
A TruthPoint finality status indicating threshold consensus was reached and BLS aggregation succeeded, or that a Sovereign Node completed a fetch with full source quorum. Safe for high-value settlement.

---

## P

**PRELIMINARY (finality state)**
A TruthPoint finality status indicating the value was signed by the local node before the TSS threshold was reached. May occur in Sovereign mode or when the TSS timeout expires before enough shares are collected.

**Protobuf Contract Boundary**
The `proto/gateway.proto` file defines the binary-serialized message format and RPC service used for all Hot-Core to Sidecar communication. Changing field numbers or removing fields is a breaking change across the entire network.

---

## R

**Relayer**
A Hot-Core subsystem that submits signed TruthPoints on-chain via `propose_outcome` on the `TruthOracleV3` contract. Only one node in a Mesh group acts as the active relayer for a given request round, determined by the Deterministic Relayer Election algorithm.

---

## S

**SCHEMA_VIOLATION**
An `ErrorCode` value returned when a plugin's `fetchData` output does not match the schema declared in the UCM capability registry. The data is discarded and never reaches the signing layer.

**Sentinel**
A Hot-Core subsystem that subscribes to `TruthRequested` events on the `TruthOracleV3` contract and dispatches them into the VEE fetch pipeline. In this mode, the gateway processes real-world on-chain data requests autonomously without requiring an external REST trigger.

**Sidecar**
The Node.js process running alongside Hot-Core. Responsibilities: plugin execution (Plugin Runner), data aggregation and schema enforcement (UCM / TruthEngine), and the gRPC server implementing the `LogicHost` service.

**Sovereign Node**
Deployment mode where a single operator runs an independent gateway node, signing attestations with the node's own Ethereum key. No P2P networking or TSS required. Suitable for DAOs, internal data pipelines, and development.

**SovereignAdapter**
The abstract TypeScript base class that all TaaS plugins must extend. Provides: HTTP client (Axios), Circuit Breaker, SSRF protection, mock mode support, Zod schema validation, secret injection, and the `DataSource` interface contract.

**SSRF (Server-Side Request Forgery)**
An attack where a plugin could be tricked into making requests to internal network resources. The `NetworkSafety.validateUrl()` Axios interceptor in `SovereignAdapter` blocks all requests to private IP ranges, loopback addresses, and link-local addresses.

**State Guard**
A pre-resolution condition declared on a capability that must evaluate to `true` before an attestation is signed and delivered. Evaluated by the `GuardEngine` using live data from the specified capability. Returns `ErrorCode.UNAUTHORIZED` if the condition is not met.

---

## T

**TDS (Truth Data Store)**
A Reed-Solomon sharded distributed storage layer for persisting signed attestation outcomes and capability blueprints across the P2P network. Configured in the `[tds]` section of `config.toml`.

**TruthEngine**
The singleton class (`lib/ucm/engine.ts`) that loads UCM capability configurations, validates plugin output schemas, and dispatches aggregation strategies. Central dispatcher of the Sidecar.

**TruthOracleV3**
The on-chain smart contract registry that stores registered gateway node addresses and handles `TruthRequested` event emission, slashing (future), and result submission via `propose_outcome`.

**TruthPoint**
The atomic output unit of the TaaS protocol. A signed, structured JSON object that binds a data value, an attestation timestamp, the signing identity, and a list of contributing sources into a single verifiable artifact. Defined in `proto/gateway.proto` as `truth_point_json` and specified in the [TruthPoint Specification](/protocol/truthpoint).

**TSS (Threshold Signature Scheme)**
A cryptographic scheme where a private key is split into `n` shares held by `n` parties. A valid signature requires at least `t` shares to cooperate. TaaS uses BLS12-381 for TSS. No single node ever holds the complete private key.

---

## U

**UCM (Unified Capability Model)**
The framework within the Sidecar that maps incoming requests `(category, method)` to registered plugins, enforces output schema compliance, and applies aggregation strategies. Implemented as the `TruthEngine` class.

---

## V

**Vault**
An AES-GCM encrypted file store in the gateway that holds all node secrets: Ethereum key, BLS key, libp2p peer identity, and plugin API keys. Decrypted at startup using the Master Password. Never stores anything in plaintext.

**VEE (Verifiable Execution Environment)**
The fetch pipeline inside Hot-Core that coordinates the full request lifecycle from receipt to signed TruthPoint. Includes the WaitLeader Cache, Priority-Based Fetching, and Quota Manager.

**verifiableHash**
A `keccak256` hash of the canonical JSON serialization of a TruthPoint's `value` object (sorted keys, no whitespace). This is the exact value bound by the EIP-712 signature. A consumer recomputes this hash to verify data integrity.

---

## W

**WaitLeader Cache**
A Hot-Core VEE mechanism that prevents duplicate simultaneous in-flight fetches for the same `(category, method, params)` tuple. If a fetch is already in-flight, subsequent identical requests wait for its result rather than triggering redundant plugin executions.

**Worker Supervisor**
A dedicated task inside Hot-Core that monitors the Sidecar process. If the Sidecar exits for any reason, the Supervisor immediately respawns it. From the network's perspective, a Sidecar crash is equivalent to a single-request failure.
