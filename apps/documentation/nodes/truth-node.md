# Running a Truth Node

A Truth Node is the execution and verification client of the TaaS Protocol. It connects real-world data to on-chain smart contracts by running data recipes locally, signing the results, and submitting verified attestations to the TruthOracle contract.

---

## Operational Modes

| Mode | Role | Earns |
|---|---|---|
| `sentinel` | Listens for on-chain requests, executes recipes, proposes outcomes | Protocol fees |
| `challenger` | Monitors proposals from other nodes, re-executes recipes, disputes incorrect results | Dispute rewards + slashing proceeds |
| `both` | Runs both sentinel and challenger simultaneously | Both |

---

## Prerequisites

- Docker and Docker Compose installed on your server
- An EVM-compatible wallet with a funded private key
- A WebSocket-capable RPC endpoint for the Helios network
- A Redis instance (v7.0+) for the job queue

---

## Setup (Zero-Build Install)

Friehub strictly recommends the Docker path. Do **not** clone the repository or run `pnpm build` locally for production — use the pre-built image.

**Step 1: Create a working directory and download the Compose file:**

```bash
mkdir taas-sentinel && cd taas-sentinel
wget https://raw.githubusercontent.com/Friehub/taas-nodes/main/truth-node/docker-compose.yml
```

**Step 2: Create your `.env` file in the same directory:**

```bash
touch .env
```

**Step 3: Configure the required variables:**

```ini
# Core settings
NODE_ENV=production
NODE_MODE=sentinel        # sentinel | challenger | both
NODE_ID=my-truth-node-01
PORT=3001

# Blockchain (Helios Testnet)
RPC_URL=https://testnet1.helioschainlabs.org
CHAIN_ID=42000

# Smart Contracts
ORACLE_ADDRESS=0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1
TOKEN_ADDRESS=0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F

# Wallet
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE

# Infrastructure
REDIS_HOST=localhost
REDIS_PORT=6379

# Truth Gateway (Keyless Mode — recommended)
INDEXER_API_URL=https://api.friehub.com
```

::: tip Keyless Mode
When `INDEXER_API_URL` is set, the node routes all data provider requests through the TaaS Gateway. You do **not** need any API keys for sports, weather, finance, or crypto data. The gateway handles all authenticated external requests on your behalf.
:::

**Step 4: Start the node:**

```bash
docker compose up -d
```

**Step 5: View the logs:**

```bash
docker compose logs -f truth-node
```

---

## Full Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `NODE_MODE` | Yes | `sentinel`, `challenger`, or `both` |
| `PRIVATE_KEY` | Yes | EVM private key (starts with `0x`) |
| `RPC_URL` | Yes | Helios RPC endpoint |
| `ORACLE_ADDRESS` | Yes | TruthOracleV2 contract address |
| `TOKEN_ADDRESS` | Yes | TAAS token contract address |
| `INDEXER_API_URL` | Yes | TaaS Gateway URL (enables keyless mode) |
| `REDIS_HOST` | Yes | Redis host |
| `REDIS_PORT` | No | Redis port (default: `6379`) |
| `NODE_ID` | No | Human-readable node identifier for logs |
| `PORT` | No | HTTP port for the node API (default: `3001`) |
| `LOG_LEVEL` | No | `debug`, `info`, `warn`, or `error` |

---

## Observability

The node exposes a Prometheus-compatible metrics endpoint at `http://your-node:3001/metrics`.

Key metrics:

| Metric | Description |
|---|---|
| `truth_requests_total` | Number of truth requests received |
| `truth_proposals_total` | Number of outcomes submitted on-chain |
| `truth_disputes_total` | Number of successful challenge disputes filed |

JSON-structured logs are emitted to `stdout` and can be forwarded to any log aggregator (Grafana Loki, Datadog, etc.).

---

## Troubleshooting

**Connection refused on startup:**
Verify that your Redis service is running and reachable via `REDIS_HOST`.

**Insufficient funds error:**
Your `PRIVATE_KEY` wallet must hold enough native token (HELI) to cover gas costs for proposals and dispute bonds.

**Recipe not found:**
The requested recipe ID must be registered on the TaaS Gateway before the node can execute it.

---

## Running from Source (Contributors Only)

For protocol development only — not recommended for node operators:

```bash
git clone https://github.com/Friehub/taas-nodes.git
cd taas-nodes/truth-node
pnpm install
cp .env.example .env
# Edit .env with your values
pnpm run dev
```
