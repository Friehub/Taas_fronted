# Threshold Signature Scheme (TSS)

The Threshold Signature Scheme (TSS) is the cryptographic foundation of the TaaS Gateway Hive. It eliminates the "Centralized Admin" as a single point of failure by distributing the network's signing authority.

## Multi-Party Computation (MPC)

Instead of a single private key living on a single server, TaaS utilizes **GG20 (n-of-n) Distributed ECDSA** to secure its data attestations.

### 1. Distributed Key Generation (DKG)
When the Hive initializes or a new node joins, the committee performs a DKG ceremony.
- **Master Public Key**: A single, standard Ethereum-compatible public key (secp256k1) is generated.
- **Key Shares**: Each participating Gateway node receives a unique mathematical fragment (a share) of the private key. **The full private key never exists in any single location.**

### 2. Signing Ceremonies
When a Truth Node requests data attestation (e.g., verifying a match score), the Hive initiates a signing ceremony.
- **Quorum Requirement**: A specific threshold (`t`) of nodes must coordinate to produce a signature.
- **Zero-Knowledge exchange**: Nodes swap mathematical commitments and proofs without ever revealing their private shares to each other.
- **Valid Signature**: The final output is a standard ECDSA signature that can be verified by any blockchain or client, but was produced by a decentralized committee.

### 3. Benefits of Zero-Trust Attestation
- **Censorship Resistance**: No single gateway operator can refuse to sign a valid request.
- **Compromise Resilience**: An attacker would need to successfully breach the majority of the Hive committee simultaneously to steal the network's signing authority.
- **Provable Veracity**: The signature itself is a cryptographic proof that the data was verified by the decentralized consensus.

---

## Technical Specifications

| Feature | Specification |
| :--- | :--- |
| **Protocol** | GG20 (Gennaro & Goldfeder) |
| **Curve** | secp256k1 (Ethereum Compatible) |
| **Implementation** | Rust (`multi-party-ecdsa`) |
| **Network Layer** | libp2p GossipSub Coordination |

By anchoring the network in TSS, TaaS ensures that the "Truth" it provides is backed by the strongest cryptographic guarantees available.
