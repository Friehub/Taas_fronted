# Quick Start

This guide will get you up and running with the TaaS SDK. The SDK provides a simple, strongly-typed interface for retrieving verified attestations from the TaaS protocol without needing to manage infrastructure or individual data provider API keys.

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
import { AttestationClient } from '@taas/taas-sdk';

const gateway = new AttestationClient({
    baseUrl: 'https://api.taas.network',
    jwtToken: process.env.TAAS_API_KEY
});
```

## 3. Fetching Verifiable Proofs

The SDK features a Fluent API for building data intents. Here is how to retrieve the current attested price of Bitcoin:

```typescript
import { TaaS } from '@taas/sdk';

async function fetchBitcoinPrice() {
    const task = await TaaS.task('btc-price-lookup')
        .finance().price('BTC')
        .execute();

    console.log(`Current BTC Price: $${task.result}`);
    console.log(`On-chain Proof: ${task.attestation}`);
}
```

Every response from the SDK includes an `attestation`—a cryptographic proof that the data was verified by a distributed quorum of operators according to protocol consensus rules.

## Next Steps

- Explore the [Protocol Rationale](/guides/why-taas) for details on the security model.
- View the [Network Status](/networks/hoodi) for verified testnet coordinates.
