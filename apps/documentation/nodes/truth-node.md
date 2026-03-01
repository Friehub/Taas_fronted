# Truth Node

The **Truth Node** is the core participant in the TaaS network. It listens for on-chain truth requests, executes recipe logic locally, and proposes verified outcomes to the `TruthOracleV2` smart contract.

---

## Modes of Operation

The Truth Node supports three runtime modes controlled by the `NODE_MODE` environment variable:

| Mode | Description |
|---|---|
| `sentinel` | Actively monitors and processes incoming truth requests. |
| `challenger` | Monitors proposals from other nodes and disputes incorrect outcomes. |
| `both` | Runs both sentinel and challenger simultaneously. |

---

## Running with Docker (Recommended)

The official Truth Node Docker image is published to GitHub Container Registry:

```bash
docker pull ghcr.io/friehub/truth-node:latest
```

Create a `.env` file:

```ini
# Blockchain
RPC_URL=https://your-rpc-endpoint
ORACLE_ADDRESS=0x...
TOKEN_ADDRESS=0x...

# Node Identity
PRIVATE_KEY=0x...
NODE_MODE=sentinel

# Gateway (Proxy Mode   no local API keys required)
TAAS_USE_PROXY=true
INDEXER_API_URL=https://api.friehub.com

# Optional: Direct API keys (override proxy for specific providers)
COINGECKO_API_KEY=your_key
OPENWEATHER_KEY=your_key
```

Run:
```bash
docker run -d --name taas-truth-node --env-file .env ghcr.io/friehub/truth-node:latest
```

---

## Running from Source

```bash
git clone https://github.com/Friehub/taas-nodes.git
cd taas-nodes/truth-node

pnpm install
cp .env.example .env
# Fill in your .env values

pnpm dev
```

---

## Architecture

```
TruthOracleV2 (on-chain)
      |
   Events
      |
      v
  Sentinel (Event Listener)
      |
  queues job
      |
      v
  TruthWorker (BullMQ Job Processor)
      ├── Load Recipe from RecipeRegistry
      ├── Execute via RecipeExecutor
      │     └── StandardFeedPlugin (Gateway Proxy / Local Plugin)
      ├── Generate Truth Certificate
      ├── Upload to IPFS
      └── proposeTruth() on-chain
```

---

## Health and Monitoring

The Truth Node exposes a REST API for monitoring:

```
GET  /health         # Node health status
GET  /metrics        # Prometheus metrics
GET  /feeds          # Registered local data plugins
POST /execute        # Manually trigger a Recipe execution (for testing)
```

---

## Economic Requirements

To participate as a Truth Node, you must:

1. Hold enough **T tokens** to cover the `minimumBond` set by the oracle contract.
2. Be registered as a **Certified Node** via the `NodeRegistry` contract (or operate in uncertified mode with higher bond requirements).
3. Maintain uptime to avoid being marked as inactive and slashed via the anti-jail heartbeat system (`NodeHealthService`).
