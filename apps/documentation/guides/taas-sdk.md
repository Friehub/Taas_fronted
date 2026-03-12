# TaaS Developer SDK

The `@taas/taas-sdk` library is the primary HTTP client for interacting with the TaaS Truth Gateway. It provides typed methods for accessing attested real-world data across crypto, sports, weather, economics, and finance, all backed by the decentralized TaaS node network.

This client eliminates the need for maintaining node infrastructure, managing private keys, or managing individual data provider subscriptions.

---

## Installation

```bash
pnpm add @taas/taas-sdk
```

---

## Quick Start

```typescript
import { TruthGatewayClient } from '@taas/taas-sdk';

const gateway = new TruthGatewayClient({
    baseUrl: 'https://api.taas.network',
    jwtToken: 'YOUR_AUTHORIZATION_TOKEN'
});

// Query the current BTC price as attested by the network
const result = await gateway.finance().price('BTC');

console.log(result.value);        // Example: 47250.5
console.log(result.attestation);  // On-chain cryptographic proof
```

---

## Authentication

Requests to the gateway require a valid JWT issued from the TaaS Dashboard.

1. Log in to the [TaaS Dashboard](https://app.taas.network).
2. Navigate to Settings and select API Keys.
3. Generate and secure a new authorization token.

Initialize the client with the retrieved token:

```typescript
const gateway = new TruthGatewayClient({
    jwtToken: process.env.TAAS_API_KEY
});
```

API keys are scoped to a specific wallet address. Every request is signed by the gateway and remains verifiable against the protocol contracts.

---

## Domain Methods

### Finance

```typescript
const client = gateway.finance();

// Retrieve current spot price
const btc = await client.price('BTC');

// Retrieve historical price at a specific Unix timestamp
const historical = await client.priceAt('ETH', 1700000000000);

// Retrieve the exchange rate between fiat currencies
const rate = await client.forex('USD', 'EUR');
```

---

## Domain Reference

| Domain | Method | Resolution |
|---|---|---|
| `finance()` | `price(symbol)` | Spot price in USD. |
| `finance()` | `priceAt(symbol, ts)` | Historical valuation. |
| `crypto()` | `price(symbol)` | Digital asset valuation. |
| `sports()` | `livescore(league)` | Active match results. |
| `weather()` | `current(lat, lon)` | Real-time conditions. |
| `economics()` | `series(id)` | Economic trend indices. |

---

## Query Execution

Developers can invoke specialized truth queries by their identifiers. Queries serve as verifiable truth definitions registered within the network.

```typescript
import { TruthGatewayClient } from '@taas/taas-sdk';

const gateway = new TruthGatewayClient({ jwtToken: process.env.TAAS_API_KEY });

// Execute a registered truth query
const result = await gateway.executeQuery('btc-price-daily', {
    symbol: 'BTCUSDT'
});

console.log(result.value);        // The resolved truth value
console.log(result.attestation);  // The cryptographic proof
```

---

## Verifying Attestations

Every response includes an attestation that should be verified against the on-chain oracle contracts for high-assurance applications.

```typescript
import { verifyAttestation } from '@taas/taas-sdk';

const result = await gateway.finance().price('BTC');

// Perform on-chain verification
const isValid = await verifyAttestation(result.attestation, {
    oracleAddress: '0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1',
    rpcUrl: 'https://rpc.taas.network'
});

if (!isValid) {
    throw new Error('Verification failed: attestations are invalid.');
}
```

---

## Developer Types

```typescript
import {
    TruthPoint,
    TruthAttestation,
    QueryExecutionResult,
    OutcomeType
} from '@taas/taas-sdk';
```

| Type | Description |
|---|---|
| `TruthPoint<T>` | A single attested data point with provenance metadata. |
| `TruthAttestation` | The cryptographic evidence from the network. |
| `QueryExecutionResult` | The comprehensive output of a truth query. |
| `OutcomeType` | Classifies results as scalar, binary, categorical, or probabilistic. |

---

## Rate Limits and Quotas

| Tier | Requests per Minute | Historical Access |
|---|---|---|
| Standard | 60 | 30 days |
| Developer | 600 | 1 year |
| Enterprise | Custom | Full history |

---

## Error Management

```typescript
import { TaasApiError, TaasAttestationError } from '@taas/taas-sdk';

try {
    const result = await gateway.sports().matchDetails('match-hash');
} catch (err) {
    if (err instanceof TaasApiError) {
        console.error('Network error:', err.message);
    } else if (err instanceof TaasAttestationError) {
        console.error('Integrity error: attestation rejected.');
    }
}
```

---

## Related Documentation

- [TaaS Interfaces](/guides/taas-interfaces): Framework for custom adapters.
- [Network Operation](/nodes/truth-node): Guide for truth node participants.
