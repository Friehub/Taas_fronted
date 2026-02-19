# Getting Started with Friehub TaaS

Welcome to the Friehub Truth-as-a-Service (TaaS) ecosystem. This guide will help you set up your environment, understand the architecture, and start contributing to the Fact Engine.

## 🏗 Workspace Architecture

Friehub uses a **Polyrepo-managed Monorepo** structure. The core components are organized into dedicated packages:

- **`taas-core`**: The SIWE-native execution engine and protocol recipes.
- **`taas-backend`**: The high-performance API gateway and truth indexer.
- **`Taas_frontend`**: The premium Emerald dashboards and landing pages.
- **`taas-nodes`**: The Sentinel (Truth Node) and Challenger software.
- **`taas-sdk`**: developer-first tooling for building Truth Recipes.

## 🛠 Prerequisites

Ensure you have the following installed:
- **Node.js**: v18 or higher.
- **pnpm**: v8.0.0 or higher.
- **Docker**: Required for running Truth Nodes.
- **PostgreSQL**: Used for backend persistence.
- **Redis**: Used for high-speed indexing cache.

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone --recursive https://github.com/Friehub/Taas.git
cd Taas
pnpm install
```

### 2. Configure Environment
Copy the example environment files in each package and fill in your secrets (e.g., `COINGECKO_API_KEY`, `JWT_SECRET`).

### 3. Launch Documentation
```bash
pnpm run docs:dev
```

## 🧠 Core Concepts

### Truth Recipes
A **Recipe** is a programmable set of instructions that the Fact Engine follows to verify reality. It defines:
1. **Data Sources**: Where to fetch information (APIs, On-chain, etc.).
2. **Logic Agents**: How to process the raw data.
3. **Consensus Rules**: Requirements for the truth to be finalized.

### Sentinels (Truth Nodes)
Sentinels are decentralized workers that execute Recipes. They provide the computational layer for truth attestation and are rewarded for their honesty.

---

> [!IMPORTANT]
> Always verify your wallet connection before attempting to provision a Truth Node. We use SIWE for all administrative actions.
