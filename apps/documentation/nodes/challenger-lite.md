# Challenger Lite Guide

Challenger Lite nodes are responsible for the secondary verification of truth proposals within the TaaS network. By re-executing recipes locally, these nodes detect discrepancies and initiate on-chain disputes to ensure the integrity of the protocol.

---

## Operational Overview

Challenger Lite nodes perform the following sequence:
1. **Monitor**: Watch the network for newly proposed outcomes.
2. **Re-execute**: Run the identical recipe logic locally with the original inputs.
3. **Compare**: Evaluate if the local outcome matches the proposed on-chain fact.
4. **Dispute**: If a discrepancy is detected, the node submits a challenge and stakes a bond to initiate a formal review.

---

## Technical Setup

The Challenger Lite node can be deployed directly via npm or as a Docker container.

### 1. Installation
```bash
npm install
cp .env.example .env
```

### 2. Configuration
Edit the `.env` file with your credentials and network parameters. Ensure that the file permissions are restricted to protect your private key.

```ini
# Required Parameters
PRIVATE_KEY=0x...                  # Operator wallet private key
RPC_URL=https://rpc.helioschain.org # Network RPC endpoint
ORACLE_ADDRESS=0x97C80601A5fA9...  # Protocol Oracle address

# Optional Parameters
NODE_ID=challenger-01
DISPUTE_STAKE=10000000000000000000 # Default stake in wei
AUTO_DISPUTE=true                  # Enable automated dispute submission
CONFIDENCE_THRESHOLD=0.99          # Minimum confidence for challenges
LOG_LEVEL=info
```

### 3. Wallet Security
It is essential to use a dedicated operator wallet. This wallet must be funded with sufficient native tokens (HELI) for gas fees and T tokens for dispute bonds.
- **Recommended Balance**: 100 HELI for transaction coverage.
- **Security**: Regularly rotate keys and avoid storing excessive funds in the operator wallet.

---

## Economic Model

The TaaS Protocol incentivizes honest verification through a system of bonds and rewards.

### Rewards
When a Challenger Lite node successfully disputes an incorrect proposal, it receives a portion of the original proposer's slashed bond as a reward for securing the network.

### Risks
If a node initiates a dispute that is subsequently resolved in favor of the original proposer, the challenger's stake is slashed. It is critical to maintain a high `CONFIDENCE_THRESHOLD` to mitigate the risk of false positives caused by transient network issues or API latencies.

---

## Operational Strategies

### Conservative Mode
Recommended for new operators or those with limited resource allocation.
```ini
CONFIDENCE_THRESHOLD=0.99
AUTO_DISPUTE=false
```
In this mode, the node identifies discrepancies but requires manual approval before submitting a challenge on-chain.

### Automated Mode
Recommended for high-uptime servers with reliable RPC connectivity.
```ini
CONFIDENCE_THRESHOLD=0.95
AUTO_DISPUTE=true
```
This mode handles the entire dispute lifecycle programmatically, allowing for rapid response to protocol errors.

---

## Monitoring and Maintenance

### Statistics
The node provides internal reporting to track performance and results.
```bash
npm run stats
```
This command displays verifications performed, successful disputes, and generated rewards.

### Troubleshooting

#### RPC Connectivity
If the node is not detecting proposals, verify the `RPC_URL` and ensure the `ORACLE_ADDRESS` correctly matches the current network deployment.

#### Execution Errors
Ensure that all required dependencies are installed and that the node has sufficient memory to execute complex recipes.

#### Insufficient Funds
The node will automatically stop submitting disputes if the wallet balance falls below the required stake amount. Monitor your operator wallet regularly to ensure continuous operation.

---

## Hardware and Performance

### Minimum Specifications
- **CPU**: 2 cores.
- **RAM**: 4 GB.
- **Storage**: 20 GB SSD.

### Recommended Specifications
- **CPU**: 4 cores.
- **RAM**: 8 GB for faster parallel verification.
- **Network**: Low-latency connection to a premium RPC provider.

---

## Network Parameters (Helios Network)
- **Chain ID**: 42000
- **Native Token**: HELI
- **Protocol Token**: T

**Challenger Lite v1.0**
