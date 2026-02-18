# TaaS Smart Contracts

**Truth Oracle, Token, and Registry Contracts**

This package contains the core Solidity smart contracts that power the TaaS Protocol.

---

## Contracts

### Core Protocol

- **`TruthOracleV2.sol`**: The central oracle contract. Handles requests, proposals, disputes, and finalization.
- **`TAASToken.sol`**: ERC20 token used for staking, bonding, and governance.
- **`SourceRegistry.sol`**: Registry for data sources and their reputation.
- **`NodeRegistry.sol`**: Registry for Sentinel and Challenger nodes.

### Utility

- **`interfaces/`**: Solidity interfaces for external integration.
- **`libraries/`**: Shared logic and data structures.

---

## Development

### Setup

```bash
# Install dependencies
npm install
```

### Compilation

```bash
# Compile contracts
npx hardhat compile
```

### Testing

```bash
# Run unit tests
npx hardhat test
```

### Deployment

Deployment scripts are located in `deploy/`.

```bash
# Deploy to Helios Testnet
npx hardhat run deploy/05_deploy_proxies.ts --network helios
```

---

## Deployed Addresses (Helios Testnet)

- **TruthOracleV2**: `0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1`
- **NodeRegistry**: `0xbD3E6271db9f9F57A08B33bf5c57f042A1f777f4`
- **SourceRegistry**: `0x340adD1e0C50Edf03A8fC66659094Cd628F0452f`
- **TAAS Token**: `0x7e6ad72CFCC7395956a99C7441EF6A2EED1E376F`

---

## License

MIT
