# Quick Start

This guide will get you up and running with the TaaS SDK. The SDK provides a simple, strongly-typed interface for retrieving verifiable truth from the TaaS protocol without needing to manage infrastructure or handle individual data provider API keys.

## 1. Installation

Install the core SDK package into your project:

```bash
pnpm add @taas/taas-sdk
```

## 2. Authentication

To communicate with the TaaS Gateway, you will need an API key.

1. Log in to the [TaaS Dashboard](https://app.taas.network).
2. Navigate to **Settings > API Keys**.
3. Generate a new authorization token.

Initialize the client with your token:

```typescript
import { TruthGatewayClient } from '@taas/taas-sdk';

const gateway = new TruthGatewayClient({
    baseUrl: 'https://api.taas.network',
    jwtToken: process.env.TAAS_API_KEY
});
```

## 3. Fetching Verifiable Truth

The SDK exposes intuitive methods grouped by data domain. Here is how you can retrieve the current attested price of Bitcoin:

```typescript
async function fetchBitcoinPrice() {
    // Query the current BTC price as attested by the network
    const result = await gateway.finance().price('BTC');

    console.log(`Current BTC Price: $${result.value}`);
    console.log(`On-chain Proof: ${result.attestation}`);
}
```

Every response from the SDK includes an `attestation`—a cryptographic proof that the data was verified by multiple independent nodes in the network according to protocol rules.

## Next Steps

- Explore the complete [SDK Documentation](/guides/taas-sdk) for more domains like Sports, Weather, and Economics.
- Learn about [On-Chain Integration](/guides/sdk/integration) to use attested truth directly inside your smart contracts.
