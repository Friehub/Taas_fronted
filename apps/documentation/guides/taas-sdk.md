# TaaS Developer SDK

`@friehub/taas-sdk` is the developer-facing HTTP client for querying the TaaS Truth Gateway. It provides typed methods for accessing attested real-world data across crypto, sports, weather, economics, and finance — all backed by the TaaS node network.

No node infrastructure, private keys, or API subscriptions are required.

---

## Installation

```bash
npm install @friehub/taas-sdk
# or
pnpm add @friehub/taas-sdk
```

---

## Quick Start

```typescript
import { TruthGatewayClient } from '@friehub/taas-sdk';

const gateway = new TruthGatewayClient({
    baseUrl: 'https://api.friehub.com',
    jwtToken: 'YOUR_DASHBOARD_JWT'    // From app.friehub.com → Settings → API Keys
});

// Query current BTC price — attested by the node network
const result = await gateway.finance().price('BTC');
console.log(result.value);        // 47250.5
console.log(result.attestation);  // On-chain signature proof
```

---

## Authentication

Requests to the gateway must include a valid JWT issued from the TaaS Dashboard.

1. Log in at [app.friehub.com](https://app.friehub.com).
2. Navigate to **Settings** → **API Keys**.
3. Generate a new key and copy it.

Pass the token to the client constructor:

```typescript
const gateway = new TruthGatewayClient({
    jwtToken: process.env.TAAS_API_KEY
});
```

> API keys are scoped to a specific wallet address. Each request is signed by the gateway and can be verified against the `TruthOracleV2` contract.

---

## Domain Methods

### Finance

```typescript
const client = gateway.finance();

// Current spot price
const btc = await client.price('BTC');
console.log(btc.value);       // 47250.5 (USD)

// Historical price at a specific Unix timestamp
const historical = await client.priceAt('ETH', 1700000000000);

// Forex rate between two currencies
const rate = await client.forex('USD', 'EUR');
```

### Crypto

```typescript
const client = gateway.crypto();

// Current token price
const sol = await client.price('SOL');

// 24h market summary
const market = await client.marketSummary('BTC');
console.log(market.volume24h, market.changePercent24h);
```

### Sports

```typescript
const client = gateway.sports();

// Live scores for a league
const liveScores = await client.livescore('EPL');

// Full match result by match ID
const match = await client.matchDetails('12345678');
console.log(match.homeScore, match.awayScore, match.status);

// Head-to-head result query
const h2h = await client.headToHead('Man City', 'Arsenal', { season: '2025-26' });
```

### Weather

```typescript
const client = gateway.weather();

// Current conditions by coordinates
const london = await client.current(51.5074, -0.1278);
console.log(london.temp_c, london.condition, london.humidity);

// Forecast for next N days
const forecast = await client.forecast(51.5074, -0.1278, { days: 5 });
```

### Economics

```typescript
const client = gateway.economics();

// FRED macro-economic data series
const cpi = await client.series('CPIAUCSL');
console.log(cpi.value);  // Latest CPI index

// World Bank indicator
const gdp = await client.worldbank('NY.GDP.MKTP.CD', 'US');
```

---

## Domain Reference Table

| Domain | Method | Description |
|---|---|---|
| `finance()` | `price(symbol)` | Current asset spot price in USD |
| `finance()` | `priceAt(symbol, ts)` | Historical price at a Unix timestamp |
| `finance()` | `forex(from, to)` | Exchange rate between two fiat currencies |
| `crypto()` | `price(symbol)` | Current crypto token price |
| `crypto()` | `marketSummary(symbol)` | 24h volume, change, market cap |
| `sports()` | `livescore(league)` | Live match scores for a league |
| `sports()` | `matchDetails(matchId)` | Full result and statistics |
| `sports()` | `headToHead(team1, team2)` | Historical H2H result lookup |
| `weather()` | `current(lat, lon)` | Real-time weather conditions |
| `weather()` | `forecast(lat, lon, opts)` | Multi-day forecasts |
| `economics()` | `series(id)` | FRED macro-economic series |
| `economics()` | `worldbank(indicator, country)` | World Bank data indicator |

---

## Executing a Recipe Directly

Beyond domain methods, you can invoke any protocol recipe by ID. Recipes are composable truth templates registered on the gateway.

```typescript
import { TruthGatewayClient } from '@friehub/taas-sdk';

const gateway = new TruthGatewayClient({ jwtToken: process.env.TAAS_API_KEY });

// Execute a pre-registered recipe by ID
const result = await gateway.executeRecipe('btc-price-daily', {
    symbol: 'BTCUSDT'
});

console.log(result.value);        // 47250.5
console.log(result.recipeId);     // 'btc-price-daily'
console.log(result.attestation);  // On-chain proof
console.log(result.executors);    // Which nodes attested this result
```

---

## Verifying Attestations

Every gateway response includes a `TruthAttestation` that can be verified against the on-chain `TruthOracleV2` contract.

```typescript
import { verifyAttestation } from '@friehub/taas-sdk';

const result = await gateway.finance().price('BTC');

// Verify the attestation on-chain
const isValid = await verifyAttestation(result.attestation, {
    oracleAddress: '0x383E24c68A57eCf2D728CaE2B93637c2fb608bE1',
    rpcUrl: 'https://testnet1.helioschainlabs.org'
});

if (!isValid) {
    throw new Error('Attestation is invalid — do not use this data');
}
```

> **Always verify** before using gateway data in a financial or on-chain context.

---

## Shared TypeScript Types

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
| `TruthPoint<T>` | Single attested data point with full provenance metadata |
| `TruthAttestation` | On-chain signature proof from the node network |
| `RecipeExecutionResult` | Complete output from a named recipe execution |
| `OutcomeType` | Enum: `scalar`, `binary`, `categorical`, `probabilistic`, `invalid` |

---

## Rate Limits & Quotas

| Plan | Requests / Minute | Historical Lookback |
|---|---|---|
| Free Tier | 60 | 30 days |
| Developer | 600 | 1 year |
| Protocol | Unlimited | Full history |

Rate limit headers are included in every response:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 44
X-RateLimit-Reset: 1709600120
```

---

## Error Handling

```typescript
import { TaasApiError, TaasAttestationError } from '@friehub/taas-sdk';

try {
    const result = await gateway.sports().matchDetails('invalid-id');
} catch (err) {
    if (err instanceof TaasApiError) {
        console.error('Gateway error:', err.status, err.message);
    } else if (err instanceof TaasAttestationError) {
        console.error('Attestation invalid — data rejected');
    }
}
```

---

## Related

- [TaaS Interfaces](/guides/taas-interfaces) — Build custom data adapters.
- [Truth Recipes](/protocol/recipes) — Author verifiable truth queries.
- [Running a Truth Node](/nodes/truth-node) — Operate a network participant.
