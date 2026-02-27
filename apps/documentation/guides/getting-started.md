# Getting Started with FrieHub TaaS

## What is TaaS?

**Truth-as-a-Service (TaaS)** is a decentralized protocol for verifying real-world facts on-chain. While existing oracles (like Chainlink or Pyth) are optimized for delivering simple price numbers, TaaS is purpose-built for **rich, structured truth** — complex real-world events expressed as JSON data and cryptographically attested by a global network of nodes.

### Why Does This Matter?

Smart contracts are increasingly used for things that depend on real-world outcomes:
- **Sports Betting**: "Did the Kansas City Chiefs win the Super Bowl?"
- **Insurance (Parametric)**: "Did rainfall in Chicago exceed 5mm on a given day?"
- **DeFi / RWA**: "Did the BTC price close above $100,000 on January 1st?"
- **AI Verification**: "Is this news article AI-generated or human-written?"

Traditional oracles cannot answer these questions reliably — they are not designed for it. TaaS is.

---

## How It Works (In 5 Steps)

```
1. Developer writes a Recipe (TypeScript) defining what data to fetch and how.
2. A consumer triggers the Recipe on-chain by calling the TruthOracle contract.
3. Sentinel nodes detect the request, execute the Recipe in a sandboxed VM, and sign the result.
4. The signed Attestation is submitted on-chain to the TruthOracleV2 contract.
5. After the dispute window, the truth is finalized and the requesting contract is called back.
```

---

## Workspace Architecture

FrieHub uses a polyrepo structure where each major component lives in its own package:

| Package | Role |
| :--- | :--- |
| `taas-core` | The execution engine, Recipes, and Sovereign Logic adapters |
| `taas-backend` | The Sovereign Gateway API — holds API keys and signs data |
| `taas-nodes` | Sentinel (Truth Node) and Challenger node software |
| `taas-plugins` | Data feed plugins (SportMonks, Binance, CoinGecko, Forex) |
| `taas-interfaces` | Shared TypeScript types and interfaces across all packages |
| `taas-sdk` | Developer SDK for writing and testing Recipes locally |
| `Taas_frontend` | User dashboards, landing page, and this documentation |

---

## Prerequisites

Before running any part of the TaaS stack, ensure you have:

- **Node.js** v18 or higher
- **pnpm** v8.0.0+
- **Docker** — required for running Sentinel or Challenger nodes
- **PostgreSQL** — used by the backend for persistence
- **Redis** v6+ — used for high-speed job queuing in nodes
- **A Helios Testnet RPC** — get one at `https://testnet1.helioschainlabs.org`
- **An EVM wallet** funded with HLS (testnet) for transaction fees and node bonding

---

## Quick Start

### 1. Clone and Install

```bash
git clone --recursive https://github.com/Friehub/Taas.git
cd Taas
pnpm install
```

### 2. Configure Environment

Each package has its own `.env.example`. Copy and populate each one:

```bash
# For the backend
cp taas-backend/.env.example taas-backend/.env

# Fill in values like:
# DATABASE_URL=postgresql://user:pass@localhost:5432/taas
# REDIS_URL=redis://localhost:6379
# SPORTMONKS_API_KEY=your_key_here
# JWT_SECRET=your_jwt_secret_here
```

### 3. Launch the Documentation Site Locally

```bash
pnpm run docs:dev
```

Visit `http://localhost:5173` to browse the documentation.

### 4. Run a Truth Node (Sentinel Mode)

```bash
cd taas-nodes/truth-node
cp .env.example .env
# Set PRIVATE_KEY, RPC_URL, NODE_MODE=sentinel
npm install && npm run dev
```

---

## Core Concepts

### Recipes

A Recipe is the fundamental unit of work in TaaS. It is a TypeScript function that tells the network:
1. **What data to fetch** — API endpoints, blockchain state, AI models
2. **How to process it** — filtering, aggregation, parsing
3. **What format to return** — Binary, Scalar, Categorical, etc.

```typescript
// A Recipe that verifies an NFL game result
export const NFLGameResult: Recipe = {
  id: 'nfl-game-result',
  version: '1.0.0',
  outcomeType: 'CATEGORICAL',
  inputs: {
    matchId: { type: 'string', required: true }
  },
  handler: async ({ inputs, feeds }) => {
    const result = await feeds.fetch(
      `https://api.sportmonks.com/v3/football/fixtures/${inputs.matchId}`
    );
    return Outcomes.categorical(result.data.winner, {
      options: [result.data.homeTeam, result.data.awayTeam, 'Draw'],
      confidence: 1.0
    });
  }
};
```

### Sentinels

Sentinels are the decentralized workers of the TaaS network. Each Sentinel:
- Listens to `TruthRequested` events from the smart contract
- Fetches the signed data packet from the Sovereign Gateway
- Executes the Recipe in a sandboxed VM
- Submits the `Attestation` on-chain and earns $TAAS tokens

### Sovereign Gateway

The FrieHub Sovereign Gateway is responsible for securely holding API keys (SportMonks, Binance, etc.) and providing a signed payload to Sentinels on request. Sentinels never have direct API key access — they only receive and relay signed certificates.

> [!IMPORTANT]
> Always verify your wallet connection before attempting to provision a Truth Node. All administrative actions use SIWE (Sign-In with Ethereum).
