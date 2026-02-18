# Friehub User Dashboard

**The unified interface for participating in the Friehub Truth-as-a-Service (TaaS) ecosystem.**

The User Dashboard provides node operators, developers, and protocol participants with the tools required to manage their infrastructure, monitor network activity, and interact with decentralized truth feeds.

## Core Features

### 1. Node Registration & Management
Enables the "Keyless Node" operational model:
- **One-Click Provisioning**: Generate secure registration codes and download pre-configured `.env` bundles for Docker-based deployment.
- **Node Registry**: Real-time monitoring of your Sentinel and Challenger performance metrics.

### 2. Activity Hub
A domain-driven stream of truth proposals and finalized outcomes:
- **Categorized Feeds**: Monitor data flows across Crypto, Sports, Economics, and Entertainment.
- **Audit Trails**: View full cryptographic proofs and IPFS attestation certificates for every truth proposal.

### 3. Protocol Registry
Explore and interact with the TaaS Source of Truth:
- **Recipe Marketplace**: Browse approved data recipes, execution logic, and source failover configurations.
- **Data Sources**: Inspect the reputation and status of 50+ integrated data providers.

### 4. Developer Portal
Tools for integrating FTS into third-party applications:
- **SDK Documentation**: Guides for utilizing the `@friehub/sdk` to consume truth feeds.
- **Testnet Faucet**: Access HLS tokens for testing and operational stakes.

---

## Technical Setup

### Prerequisites
- Node.js v20.0.0+
- pnpm v9.0.0+

### Installation
```bash
pnpm install
pnpm build
```

### Configuration
Management of the dashboard requires an `.env.local` file with the following operational parameters:
- `NEXT_PUBLIC_RPC_URL`: Helios Network RPC endpoint.
- `NEXT_PUBLIC_ORACLE_ADDRESS`: The Truth Oracle smart contract address.
- `NEXT_PUBLIC_INDEXER_API_URL`: The centralized Registry Service/Truth Gateway endpoint.

---

## Architecture

The dashboard is built using Next.js 15 (App Router) and Tailwind CSS. It is designed for high performance, mobile responsiveness, and institutional-grade security.

- **`app/`**: Next.js route handlers and page implementations.
- **`components/`**: Reusable UI elements following the Friehub Design System.
- **`lib/`**: Core logic for blockchain interaction, API communication, and wallet management.

Copyright (c) 2026 Friehub Protocol.
Licensed under the MIT License.
