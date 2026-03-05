# Running a Truth Node

A Truth Node is the execution and verification client of the TaaS Protocol. It facilitates the connection between real-world data and on-chain smart contracts by executing data recipes locally, signing the results, and submitting verified attestations to the protocol contracts.

---

## Operational Modes

| Mode | Role | Incentive |
|---|---|---|
| Sentinel | Monitors on-chain requests, executes recipes, and proposes outcomes. | Earns protocol fees. |
| Challenger | Monitors proposals from other nodes, re-executes recipes, and disputes incorrect results. | Earns dispute rewards and a portion of slashed bonds. |
| Unified | Operates both Sentinel and Challenger functions simultaneously. | Earns honors for both roles. |

---

## Prerequisites

### Hardware Requirements
- **CPU**: 4 cores recommended.
- **RAM**: 8 GB minimum; 16 GB recommended for unified mode.
- **Storage**: 50 GB SSD.
- **Network**: Stable broadband with a public-facing IP or a configured reverse proxy.

### Software Dependencies
- Docker and Docker Compose (latest stable versions).
- Access to an EVM-compatible wallet with a funded private key.
- A reliable WebSocket-capable RPC endpoint for the Helios network.
- A Redis instance (v7.0+) for internal queue management.

---

## Setup Guide (Docker Deployment)

The recommended production deployment path is via Docker. This ensures a consistent environment and simplifies the update process.

### 1. Initial Configuration

Create a dedicated directory for your node and retrieve the configuration files:

```bash
mkdir taas-node && cd taas-node
wget https://raw.githubusercontent.com/Friehub/taas-nodes/main/truth-node/docker-compose.yml
touch .env
```

### 2. Environment Configuration

Edit the `.env` file with the following required parameters. Ensure that permissions are restricted (e.g., `chmod 600 .env`) because this file contains your private key.

```ini
# Core Configuration
NODE_ENV=production
NODE_MODE=sentinel        # sentinel, challenger, or unified
NODE_ID=my-truth-node-01
PORT=3001

# Blockchain Infrastructure (Helios Network)
RPC_URL=https://rpc.helioschain.org
CHAIN_ID=42000

# Protocol Contract Addresses
ORACLE_ADDRESS=0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1
TOKEN_ADDRESS=0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F

# Wallet and Security
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE

# Internal Infrastructure
REDIS_HOST=redis
REDIS_PORT=6379

# Network Connectivity
INDEXER_API_URL=https://api.friehub.com
```

### 3. Keyless Operation
When `INDEXER_API_URL` is configured, the node operates in keyless mode. This routes all data provider requests through the TaaS Gateway. In this mode, individual API keys for sports, weather, or financial data are not required, as the gateway manages these authenticated external requests.

---

## Deployment and Monitoring

### Start the Service

```bash
docker compose up -d
```

### Monitor Operational Logs

```bash
docker compose logs -f truth-node
```

### Metrics and Observability

The node provides a Prometheus-compatible metrics endpoint at `http://your-node-ip:3001/metrics`. Monitoring these metrics is essential for maintaining node health and uptime.

| Metric | Description |
|---|---|
| `truth_requests_total` | Cumulative number of truth requests received from the network. |
| `truth_proposals_total` | Count of successfully submitted on-chain outcomes. |
| `truth_disputes_total` | Number of successful challenges initiated by this node. |

---

## Security Best Practices

1. **Private Key Isolation**: Use a dedicated operator wallet with only sufficient funds for gas and bonds. Never use a primary treasury wallet.
2. **RPC Redundancy**: If possible, configure multiple RPC endpoints to ensure the node remains online during provider outages.
3. **Firewall Configuration**: Only expose necessary ports. The metrics endpoint should be restricted to your internal monitoring IP.

---

## Troubleshooting

### Persistence Connection Failure
If the node fails to start, verify that the Redis container is healthy and reachable at the specified `REDIS_HOST`.

### Insufficient Funds
The operator wallet must maintain a balance of the native network token (HELI) to cover transaction fees and the resolution bonds required by the protocol.

### Discovery Latency
If recipes are not being resolved, ensure the `INDEXER_API_URL` is reachable from your node's network environment.
