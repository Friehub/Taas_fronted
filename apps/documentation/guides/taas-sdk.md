# TaaS Developer SDK

The `@friehub/taas-sdk` library is the primary HTTP client for interacting with the TaaS Truth Gateway. It provides typed methods for accessing attested real-world data across crypto, sports, weather, economics, and finance, all backed by the decentralized TaaS node network.

This client eliminates the need for maintaining node infrastructure, managing private keys, or managing individual data provider subscriptions.

---

## Installation

```bash
pnpm add @friehub/taas-sdk
```

---

## Quick Start

```typescript
import { TruthGatewayClient } from '@friehub/taas-sdk';

const gateway = new TruthGatewayClient({
    baseUrl: 'https://api.friehub.com',
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

1. Log in to the [TaaS Dashboard](https://app.friehub.com).
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

### Crypto

```typescript
const client = gateway.crypto();

// Retrieve current token valuation
const sol = await client.price('SOL');

// Retrieve a 24-hour market summary
const market = await client.marketSummary('BTC');
```

### Sports

```typescript
const client = gateway.sports();

// Retrieve live scores for a specific league
const liveScores = await client.livescore('EPL');

// Retrieve match details by identifier
const match = await client.matchDetails('12345678');

// Perform a head-to-head historical query
const h2h = await client.headToHead('Man City', 'Arsenal', { season: '2025-26' });
```

### Weather

```typescript
const client = gateway.weather();

// Retrieve current conditions by coordinates
const london = await client.current(51.5074, -0.1278);

// Retrieve a multi-day forecast
const forecast = await client.forecast(51.5074, -0.1278, { days: 5 });
```

### Economics

```typescript
const client = gateway.economics();

// Retrieve macro-economic data series from the FRED registry
const cpi = await client.series('CPIAUCSL');

// Retrieve indicators from the World Bank registry
const gdp = await client.worldbank('NY.GDP.MKTP.CD', 'US');
```

---

## Domain Reference

| Domain | Method | Resolution |
|---|---|---|
| `finance()` | `price(symbol)` | Spot price in USD. |
| `finance()` | `priceAt(symbol, ts)` | Historical valuation. |
| `finance()` | `forex(from, to)` | Fiat exchange rates. |
| `crypto()` | `price(symbol)` | Digital asset valuation. |
| `crypto()` | `marketSummary(symbol)` | 24h market metrics. |
| `sports()` | `livescore(league)` | Active match results. |
| `sports()` | `matchDetails(matchId)` | Detailed statistics. |
| `sports()` | `headToHead(team1, team2)` | Historical performance data. |
| `weather()` | `current(lat, lon)` | Real-time conditions. |
| `weather()` | `forecast(lat, lon, opts)` | Forward-looking reports. |
| `economics()` | `series(id)` | Economic trend indices. |
| `economics()` | `worldbank(indicator, country)` | Global development metrics. |

---

## Direct Recipe Execution

Developers can invoke specific protocol recipes by their identifiers. Recipes serve as verifiable templates registered within the network.

```typescript
import { TruthGatewayClient } from '@friehub/taas-sdk';

const gateway = new TruthGatewayClient({ jwtToken: process.env.TAAS_API_KEY });

// Execute a registered recipe
const result = await gateway.executeRecipe('btc-price-daily', {
    symbol: 'BTCUSDT'
});

console.log(result.value);        // The resolved truth value
console.log(result.attestation);  // The cryptographic proof
```

---

## Verifying Attestations

Every response includes an attestation that should be verified against the on-chain oracle contracts for high-assurance applications.

```typescript
import { verifyAttestation } from '@friehub/taas-sdk';

const result = await gateway.finance().price('BTC');

// Perform on-chain verification
const isValid = await verifyAttestation(result.attestation, {
    oracleAddress: '0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1',
    rpcUrl: 'https://rpc.helioschain.org'
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
    RecipeExecutionResult,
    OutcomeType
} from '@friehub/taas-sdk';
```

| Type | Description |
|---|---|
| `TruthPoint<T>` | A single attested data point with provenance metadata. |
| `TruthAttestation` | The cryptographic evidence from the network. |
| `RecipeExecutionResult` | The comprehensive output of a recipe execution. |
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
import { TaasApiError, TaasAttestationError } from '@friehub/taas-sdk';

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
- [Truth Recipes](/protocol/recipes): Guide for authoring verifiable queries.
- [Node Operations](/nodes/truth-node): Guide for network participation.
