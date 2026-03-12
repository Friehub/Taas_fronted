# Installation & Setup

Launch your project with the TaaS SDK to begin authoring and integrating autonomous truth.

## 1. Prerequisites
- **Node.js**: v18 or higher.
- **Package Manager**: pnpm (recommended), npm, or yarn.

## 2. Install the SDK
Add the `@taas/taas-sdk` to your project:

```bash
pnpm add @taas/taas-sdk
```

## 3. Getting your API Key
All requests to the TaaS Gateway require an authenticated session.

1.  Visit the [TaaS Dashboard](https://app.friehub.cloud).
2.  Connect your developer wallet.
3.  Navigate to Settings and select API Keys.
4.  Generate a new key and save it securely.

## 4. Initialize the Client
Create a new instance of the `TruthGatewayClient` to start interacting with the network.

```typescript
import { TruthGatewayClient } from '@taas/taas-sdk';

const client = new TruthGatewayClient({
    baseUrl: 'https://gateway.friehub.cloud',
    apiKey: process.env.TAAS_API_KEY
});
```
