# TaaS Developer SDK

`@friehub/taas-interfaces` is the foundational type contract for the TaaS Protocol. It contains the abstract base classes, TypeScript interfaces, Zod validation schemas, and adapter utilities required to plug any real-world data source into the TaaS truth network.

This guide is for developers who want to:
- Build and publish a custom TaaS data adapter
- Author verifiable truth recipes using raw protocol types
- Integrate TaaS data types into their own DApps or smart contract clients

---

## Installation

```bash
npm install @friehub/taas-interfaces
# or
pnpm add @friehub/taas-interfaces
```

> This package contains **no implementation logic** — only TypeScript types, Zod schemas, and abstract classes. It is safe for frontend apps, DApps, and untrusted compute environments.

---

## What Is a Sovereign Adapter?

A **Sovereign Adapter** is a stateless data plugin that connects any external API to the TaaS execution engine. Every data category in the TaaS network (crypto, sports, weather, etc.) is backed by one or more adapters.

When a truth request is submitted on-chain, the execution engine selects the appropriate adapter, calls `fetch()`, and submits the output as a signed attestation to the `TruthOracleV2` contract.

### Adapter Lifecycle

```
On-Chain Request
    ↓
Execution Engine selects adapter via DataCategory
    ↓
adapter.fetch(params)
    ↓ fetchData() → calls external API
    ↓ validates response against responseSchema (Zod)
    ↓
Returns TruthPoint<T>
    ↓
Node signs and submits to chain
```

---

## Authoring a Custom Adapter

Extend `SovereignAdapter<Data, Params>` and implement exactly two methods.

```typescript
import {
    SovereignAdapter,
    AdapterConfig,
    DataCategory
} from '@friehub/taas-interfaces';
import { z } from 'zod';

// 1. Define your response schema (Zod validates at runtime)
const PriceSchema = z.object({
    symbol: z.string(),
    price: z.number(),
    timestamp: z.number()
});

type PriceData = z.infer<typeof PriceSchema>;

// 2. Define your input parameters
interface PriceParams {
    symbol: string; // e.g. "BTCUSDT"
}

// 3. Extend SovereignAdapter
export class MyExchangeAdapter extends SovereignAdapter<PriceData, PriceParams> {

    constructor(config: Partial<AdapterConfig> = {}) {
        super({
            ...config,
            name: 'my-exchange',
            category: DataCategory.CRYPTO,
            responseSchema: PriceSchema   // <- v1.0.3: required for dynamic validation
        });
    }

    // Called in live mode — fetch from the real API
    protected async fetchData(params: PriceParams): Promise<PriceData> {
        const response = await this.client.get(
            `https://api.my-exchange.com/ticker/${params.symbol}`
        );
        return {
            symbol: response.data.symbol,
            price: parseFloat(response.data.price),
            timestamp: Date.now()
        };
    }

    // Called in mock/test mode — return deterministic data
    protected async getMockData(params: PriceParams): Promise<PriceData> {
        return {
            symbol: params.symbol,
            price: 50000.00,
            timestamp: Date.now()
        };
    }
}
```

### What `SovereignAdapter` Provides

| Property / Method | Description |
|---|---|
| `this.client` | Pre-configured `axios` instance (proxy, timeouts, retry) |
| `this.id` | Unique adapter ID derived from the `name` config |
| `this.category` | The `DataCategory` for this plugin |
| `this.config.responseSchema` | Zod schema used to validate API output at runtime |
| `fetch(params)` | Public method — already implemented. Calls `fetchData` or `getMockData`. |
| `getCapabilities()` | Returns metadata about the adapter's supported parameters (v1.0.3+) |

> **v1.0.3 Change:** The `responseSchema` property in `AdapterConfig` is now **required** for all adapters. Adapters without a schema will not pass runtime validation inside the execution engine.

---

## Declaring Adapter Capabilities (v1.0.3+)

To enable execution engine discovery and dynamic parameter routing, adapters should override `getCapabilities()`. This allows the engine to route partial or fuzzy requests to the correct adapter without hardcoded mappings.

```typescript
import { AdapterCapability } from '@friehub/taas-interfaces';

export class MyExchangeAdapter extends SovereignAdapter<PriceData, PriceParams> {

    // ... constructor and methods above ...

    getCapabilities(): AdapterCapability[] {
        return [
            {
                paramKey: 'symbol',
                description: 'Trading pair symbol (e.g. BTCUSDT)',
                required: true,
                type: 'string'
            }
        ];
    }
}
```

The engine calls `getCapabilities()` to understand what parameters an adapter accepts, allowing generic recipe definitions to be matched against specific adapters at execution time.

---

## Core Types Reference

### `DataCategory`

```typescript
import { DataCategory } from '@friehub/taas-interfaces';

DataCategory.CRYPTO      // Cryptocurrency markets
DataCategory.SPORTS      // Match results and scores  
DataCategory.WEATHER     // Climate and temperature data
DataCategory.ECONOMICS   // Macro-economic indicators
DataCategory.FINANCE     // Forex, stocks, commodities
DataCategory.SOCIAL      // Social media signals
DataCategory.ONCHAIN     // On-chain protocol data
DataCategory.CUSTOM      // Custom multi-step pipelines
```

### `TruthPoint<T>`

Wraps any adapter response with rich provenance metadata:

```typescript
interface TruthPoint<T> {
    value: T;
    metadata: {
        source: string;
        timestamp: number;
        requestId: string;
        lineage: DataLineage;
        quality: QualityMetrics;
        verifiableHash?: string;  // Keccak256 of normalized payload
    };
}
```

### `DataRequest`

The normalized input to any adapter `fetch()` call:

```typescript
interface DataRequest {
    params: Record<string, any>;
    timestamp?: number;        // For historical data
    timeout?: number;
    attestationContext?: {
        requestId: string;     // On-chain truth request ID
        attestationTimestamp: number;
        deadline: number;
        attempt: number;
    };
}
```

### `Outcomes` (Builder Helpers)

```typescript
import { Outcomes } from '@friehub/taas-interfaces';

Outcomes.binary(1, { confidence: 0.99 })
Outcomes.scalar(47250.5, { unit: 'USD' })
Outcomes.categorical('Real Madrid', { options: ['Real Madrid', 'Barcelona'] })
Outcomes.probabilistic(0.72, { reasoning: 'Trailing market signals' })
Outcomes.invalid('False premise', { category: 'FALSE_PREMISE' })
```

---

## Building a Recipe with the Type System

A recipe defines the exact query the network should resolve. You can author recipes directly using the type system without any backend dependency.

```typescript
import { RecipeInstance, DataCategory } from '@friehub/taas-interfaces';

const recipe: RecipeInstance = {
    id: 'btc-price-daily',
    name: 'BTC Daily Close Price',
    category: DataCategory.CRYPTO,
    params: {
        symbol: 'BTCUSDT',
        resolution: '1d'
    },
    outcomeType: 'scalar',
    schema: {
        unit: 'USD',
        precision: 2
    }
};
```

---

## Architecture Note

The interfaces package deliberately contains zero runtime dependencies on the TaaS backend, gateway, or execution engine. A third-party developer can build, test, and ship a production-grade adapter using **only this package** — without ever running a local node or accessing internal infrastructure.

---

## Related

- [TaaS SDK](/guides/taas-sdk) — Typed HTTP client for querying the Gateway.
- [Truth Recipes](/protocol/recipes) — In-depth guide to authoring verifiable truth queries.
- [Running a Truth Node](/nodes/truth-node) — Operate a network participant.
