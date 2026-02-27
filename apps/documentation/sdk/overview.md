# SDK & Interfaces

The TaaS developer ecosystem provides two key packages for building and integrating with the protocol:

| Package | Purpose |
| :--- | :--- |
| `@friehub/taas-sdk` | Write and compile Truth Recipes locally |
| `@friehub/taas-interfaces` | Shared TypeScript types for all packages |

---

## `@friehub/taas-sdk`

The SDK lets developers **define, test, and compile** Truth Recipes using a clean TypeScript API. Recipes compiled by the SDK produce a protocol-compliant JSON definition that can be submitted to the TaaS network.

### Installation

```bash
npm install @friehub/taas-sdk
```

### Defining a Recipe

Use `Recipe.define()` to create a recipe blueprint. The handler receives typed input proxies and returns the truth logic.

```typescript
import { Recipe } from '@friehub/taas-sdk';

const NFLWinnerRecipe = Recipe.define({
  name: 'NFL Game Winner',
  description: 'Determines which team won a given NFL match.',
  category: 'Sports',
  outcomeType: 'CATEGORICAL',
  inputs: {
    matchId: { type: 'string', label: 'Match ID', required: true }
  },
  handler: async (inputs) => {
    // The SDK captures your data-fetching intent during compilation
    const result = await inputs.feeds.sports.getFixture(inputs.matchId);
    return result.winner;
  }
});
```

### Compiling a Recipe

Call `.compile()` to transform the handler into the protocol's JSON pipeline format:

```typescript
const recipeJSON = await NFLWinnerRecipe.compile();
console.log(JSON.stringify(recipeJSON, null, 2));
```

The compiled output is a complete, verified Recipe JSON ready for submission to the network. The compilation step captures your intent (what data you want, how to transform it) and generates the correct `pipeline` and `attestation` blocks automatically.

---

## `@friehub/taas-interfaces`

The interfaces package is the **single source of truth for all shared types** across the TaaS ecosystem. If you are building a custom integration, use these types to ensure compatibility.

### Installation

```bash
npm install @friehub/taas-interfaces
```

### Key Types

#### `SovereignAdapter`

The abstract base class for all TaaS data source plugins. Extend this to build a custom data provider that integrates with the FrieHub Gateway.

```typescript
import { SovereignAdapter, AdapterConfig, DataCategory } from '@friehub/taas-interfaces';

export class MyCustomAdapter extends SovereignAdapter {
  constructor() {
    super({
      name: 'my-source',
      category: DataCategory.FINANCE,
      apiKey: process.env.MY_API_KEY
    });
  }

  protected async fetchData(params: { symbol: string }) {
    const response = await this.client.get(`/prices/${params.symbol}`);
    return response.data;
  }

  protected async getMockData(params: { symbol: string }) {
    return { price: 100.0, symbol: params.symbol };
  }
}
```

#### `DataCategory`

An enum defining all supported data categories:

```typescript
import { DataCategory } from '@friehub/taas-interfaces';

// Available categories
DataCategory.CRYPTO    // Cryptocurrency market data
DataCategory.SPORTS    // Sports results and fixtures
DataCategory.FOREX     // Foreign exchange rates
DataCategory.FINANCE   // Traditional finance (stocks, commodities)
DataCategory.ECONOMICS // Macroeconomic indicators
DataCategory.CUSTOM    // Custom / generic data sources
```

#### `DataSource`

The interface that all adapters implement. Defines the contract for data fetching:

```typescript
interface DataSource<T> {
  id: string;
  name: string;
  category: DataCategory;
  capabilities: SourceCapabilities;
  fetch(request: DataRequest): Promise<DataResponse<T>>;
}
```

---

## Outcome Types

TaaS supports five outcome types for truth results, defined in `@friehub/taas-interfaces`:

| Type | Value Format | Use Case |
| :--- | :--- | :--- |
| `BINARY` | `0` or `1` | Yes/No — Did it happen? |
| `SCALAR` | `number` | What was the price / temperature / score? |
| `CATEGORICAL` | `string` | Which option won (from a predefined list)? |
| `PROBABILISTIC` | `0.0 – 1.0` | How probable is this outcome? |
| `INVALID` | `string (reason)` | Question is unanswerable / based on false premise |

### Helper Functions

The `Outcomes` builder provides typed constructors for each type:

```typescript
import { Outcomes } from '@friehub/taas-interfaces';

// Binary — Did the event happen?
Outcomes.binary(1, { confidence: 0.99 });

// Scalar — What was the price?
Outcomes.scalar(98234.56, { unit: 'USD', precision: 2 });

// Categorical — Who won?
Outcomes.categorical('Chiefs', { options: ['Chiefs', 'Eagles', 'Draw'] });

// Probabilistic — AI-estimated likelihood
Outcomes.probabilistic(0.87, { reasoning: 'Strong consensus across 4 sources' });

// Invalid — Cannot answer
Outcomes.invalid('Match has not yet concluded', { category: 'FUTURE_DEPENDENT' });
```

---

## GatewayClient

The SDK exposes a `GatewayClient` for Sentinel nodes and integrations that need to communicate with the Sovereign Gateway directly (e.g., requesting a `TruthPoint` for a given recipe and input set).

```typescript
import { GatewayClient } from '@friehub/taas-sdk';

const client = new GatewayClient({
  gatewayUrl: 'https://gateway.friehub.io',
  walletAddress: '0xYourWalletAddress',
  signMessage: (msg) => wallet.signMessage(msg) // SIWE auth
});

const result = await client.verify({
  template: recipeJSON,
  inputs: { matchId: '12345', attestationTimestamp: 1735689600 }
});

console.log(result.truth); // The attested truth value
```
