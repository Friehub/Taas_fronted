# TaaS Developer SDK

`@friehub/taas-sdk` is the developer-facing SDK for querying the TaaS Truth Gateway. It provides a typed HTTP client for accessing verified real-world data across multiple domains without running a node or importing any internal protocol packages.

---

## Installation

```bash
npm install @friehub/taas-sdk
# or
pnpm add @friehub/taas-sdk
```

---

## The Truth Gateway Client

The SDK's primary export is `TruthGatewayClient` — a typed HTTP proxy for the TaaS Gateway API.

```typescript
import { TruthGatewayClient } from '@friehub/taas-sdk';

const gateway = new TruthGatewayClient({
    baseUrl: 'https://api.friehub.com'
});
```

If `baseUrl` is not provided, the client defaults to the public TaaS Gateway endpoint.

---

## Domain Methods

### Finance

```typescript
// Current spot price
const btcPrice = await gateway.finance().price('BTC');
console.log(btcPrice.value); // 47250.5

// Historical price at a Unix timestamp
const historicalPrice = await gateway.finance().priceAt('ETH', 1700000000000);
```

### Sports

```typescript
// Live scores for a league
const scores = await gateway.sports().livescore('EPL');

// Full match result by match ID
const result = await gateway.sports().matchDetails('12345678');
console.log(result.homeScore, result.awayScore, result.status);
```

### Economics

```typescript
// FRED macro-economic data series
const inflation = await gateway.economics().series('CPIAUCSL');
console.log(inflation.value); // CPI index value
```

### Weather

```typescript
// Current conditions by coordinates
const weather = await gateway.weather().current(51.5074, -0.1278); // London
console.log(weather.temp_c, weather.condition);
```

---

## Available Domains

| Domain | Method | Description |
|---|---|---|
| `finance()` | `price(symbol)` | Current asset spot price |
| `finance()` | `priceAt(symbol, timestamp)` | Historical price at a timestamp |
| `sports()` | `livescore(league)` | Live match scores for a league |
| `sports()` | `matchDetails(matchId)` | Full match result and statistics |
| `economics()` | `series(id)` | FRED macro-economic data series |
| `weather()` | `current(lat, lon)` | Real-time weather conditions |

---

## Shared Types

The SDK also re-exports core types for use in TypeScript projects:

```typescript
import {
    RecipeExecutionResult,
    TruthAttestation,
    ExecutionProof,
    OutcomeType
} from '@friehub/taas-sdk';
```

| Type | Description |
|---|---|
| `RecipeExecutionResult` | The output of a completed recipe execution |
| `TruthAttestation` | A finalized on-chain truth certificate |
| `ExecutionProof` | Cryptographic proof of execution trace |
| `OutcomeType` | Enum of all possible truth outcome types |

---

## Security

- All gateway responses include a cryptographic proof. Consumers should verify the `signature` against the on-chain `TruthOracleV2` contract before acting on any result.
- No API keys or private keys are ever stored in the SDK. Authentication with the gateway is handled via your JWT.
- The client uses HTTPS exclusively and validates all response schemas automatically.

---

## Related

- [TaaS Interfaces](/guides/taas-interfaces) — For building custom data adapters.
- [Truth Recipes](/protocol/recipes) — For authoring verifiable truth queries.
- [Running a Truth Node](/nodes/truth-node) — For operating a network participant.
