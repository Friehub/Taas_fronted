# Sepolia (Public Testnet)

The TaaS Protocol is live on Ethereum Sepolia for public testing and integration verification.

## Deployment Coordinates

| Component | Address | Explorer |
| :--- | :--- | :--- |
| **Service Manager Proxy** | `0x886bbbb92e1c167e59ed63d6befbcb8f6da6f90c` | [Etherscan](https://sepolia.etherscan.io/address/0x886bbbb92e1c167e59ed63d6befbcb8f6da6f90c) |
| **Registry Proxy** | `0x219a1bd8c73893cf634ef00492b37eb1b2c65a68` | [Etherscan](https://sepolia.etherscan.io/address/0x219a1bd8c73893cf634ef00492b37eb1b2c65a68) |
| **Mock Verifier** | `0x0955e212116F3DF00c80F7D4284E39823d9d1482` | [Etherscan](https://sepolia.etherscan.io/address/0x0955e212116F3DF00c80F7D4284E39823d9d1482) |

## Network Parameters
- **Chain ID**: `11155111`
- **Native Token**: `SEP`
- **TaaS AVS Identity**: `0x886b...f90c`

## Integration Guide
To request a verifiable fact on Sepolia, utilize the `TaaSServiceManager` proxy. Ensure your consumer contract is compatible with the `ITaaSServiceManager` interface.

```solidity
ITaaSServiceManager taas = ITaaSServiceManager(0x886bbbb92e1c167e59ed63d6befbcb8f6da6f90c);
taas.createNewTask("capability.name", params, strategy, ...);
```
