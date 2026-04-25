# Hoodi (Holesky Institutional)

The TaaS Protocol is deployed on the Hoodi institutional fork for high-performance, decentralised oracle trials.

## Deployment Coordinates

| Component | Address | Explorer |
| :--- | :--- | :--- |
| **Service Manager Proxy** | `0x6942881Bbf662549cBA6AeC14b885fA27d0eBBd6` | [Blockscout](https://eth-hoodi.blockscout.com/address/0x6942881Bbf662549cBA6AeC14b885fA27d0eBBd6) |
| **Registry Proxy** | `0x46a6d51d031e7a7cb8ba613978188542eb2b1209` | [Blockscout](https://eth-hoodi.blockscout.com/address/0x46a6d51d031e7a7cb8ba613978188542eb2b1209) |
| **Mock Verifier** | `0xcd9243c5ac0d7e30273e83e51ef2f189955887d1` | [Blockscout](https://eth-hoodi.blockscout.com/address/0xcd9243c5ac0d7e30273e83e51ef2f189955887d1) |

## Network Parameters
- **Chain ID**: `560048`
- **Network Name**: `Hoodi Holesky`
- **TaaS AVS Identity**: `0x6942...eBBd6`
- **Metadata URI**: `https://raw.githubusercontent.com/Friehub/taas-gateway/main/metadata.json`

## Operator Onboarding
Institutional operators can join the TaaS AVS on Hoodi by registering their address through the EigenLayer delegation layer.

### Registration Requirements
1. **EigenLayer Status**: Must be a registered Operator in `DelegationManager`.
2. **Min Stake**: 1 test-ETH (strategy dependent).

### Registration Script
Operators can utilize the institutional onboarding script in the core repository:

```bash
# Register to TaaS Institutional AVS
forge script script/RegisterOperator.s.sol \
  --rpc-url https://eth-hoodi.g.alchemy.com/v2/4DjZMUs66vhw5sntF8LS3XOHxMq0T5HT \
  --broadcast
```

## Governance & Compliance
The Hoodi deployment incorporates the **eBPF-Compliance** layer. All verified results are subject to institutional audit trails registered on the TaaS Auditor.
