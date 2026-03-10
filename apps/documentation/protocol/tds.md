# TaaS Decentralized Storage (TDS)

The TaaS Decentralized Storage (TDS) layer ensures that truth outcomes and recipe blueprints are permanent, censorship-resistant, and highly available across the P2P network.

## The Architecture of Veracity

TDS moves away from centralized databases and instead utilizes **Content-Addressed Sharding** to store data directly on the Truth Nodes.

### 1. Sharding & Redundancy (Reed-Solomon)
When a piece of data (like a finalized Truth Point) is saved to TDS, it is mathematically split into multiple **shards**. 
- **Erasure Coding**: We use Reed-Solomon encoding to ensure that the data can be fully reconstructed even if a significant percentage of Truth Nodes are offline.
- **Parametric Safety**: Operators can define the `k` (data shards) and `m` (parity shards) ratio based on the desired security level.

### 2. P2P Persistence
Once sharded, the fragments are distributed across the network using the **libp2p Kademlia DHT**.
- **Content Addressing**: Every file in TDS is identified by its hash (CID).
- **Decentralized Indexing**: The network maintains a global DHT to locate which Truth Nodes are currently holding which shards.

### 3. Proof of Availability
In future phases, Truth Nodes will be required to provide periodic **Proofs of Replication** to demonstrate they are still hosting the shards assigned to them, ensuring the long-term integrity of the historical truth record.

---

## Technical Specifications

| Feature | Specification |
| :--- | :--- |
| **Encoding** | Reed-Solomon (Erasure Coding) |
| **Routing** | libp2p Kademlia DHT |
| **Addressing** | SHA-256 Content Identifiers (CID) |
| **Storage Engine** | Sharded Filesystem / Redis Shard Cache |

By sharding the "Memory" of the network, TaaS ensures that the history of truth is just as decentralized as the computation of it.
