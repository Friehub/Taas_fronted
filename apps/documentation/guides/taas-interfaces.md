# TaaS Interfaces

`@friehub/taas-interfaces` is the public type contract for the TaaS Protocol. It is the **only** package a developer needs to build a custom data adapter or author recipes using the raw type system.

---

## Installation

```bash
npm install @friehub/taas-interfaces
# or
pnpm add @friehub/taas-interfaces
```

This package contains no implementation logic — only TypeScript types, Zod schemas, and abstract classes. It is safe for use in any environment including frontend apps, DApps, and untrusted compute environments.

---

## Authoring a Custom Data Adapter

The primary use case for this package is building a `SovereignAdapter` — a stateless data plugin that connects any external API to the TaaS execution network.

```typescript
import {
    SovereignAdapter,
    DataCategory,
    TruthData,
    AdapterConfig
} from '@friehub/taas-interfaces';

class MyWeatherAdapter extends SovereignAdapter<TruthData> {

    constructor(apiKey: string) {
        const config: AdapterConfig = {
            name: 'my-weather-source',
            category: DataCategory.WEATHER,
            apiKey
        };
        super(config);
    }

    protected async fetchData(params: { lat: number; lon: number }): Promise<TruthData> {
        const url = `https://api.my-weather.com/current?lat=${params.lat}&lon=${params.lon}&key=${this.config.apiKey}`;
        const response = await this.client.get(url);

        return {
            value: response.data.temp_c,
            source: this.id,
            timestamp: Date.now(),
            metadata: response.data
        };
    }

    protected async getMockData(params: { lat: number; lon: number }): Promise<TruthData> {
        return {
            value: 22.5,
            source: this.id,
            timestamp: Date.now(),
            metadata: { mock: true }
        };
    }
}
```

### What `SovereignAdapter` Provides

- `this.client` — a pre-configured `axios` instance (with proxy support, timeouts, and optional mock mode).
- `this.id` — automatically derived from the adapter name.
- `this.category` — the `DataCategory` enum value.
- The `fetch()` method is already implemented. You only implement `fetchData()` and `getMockData()`.

---

## Core Types Reference

### `DataCategory`

Standardized domain classification for all data adapters:

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
        verifiableHash?: string; // Keccak256 of normalized payload
    };
}
```

### `DataRequest`

The normalized input to any adapter's `fetch()` call:

```typescript
interface DataRequest {
    params: Record<string, any>;
    timestamp?: number;         // For historical data
    timeout?: number;
    attestationContext?: {
        requestId: string;
        attestationTimestamp: number;
        deadline: number;
        attempt: number;
    };
}
```

### `Outcomes` (Builder Helpers)

Typed constructors for each truth outcome type:

```typescript
import { Outcomes } from '@friehub/taas-interfaces';

Outcomes.binary(1, { confidence: 0.99 })
Outcomes.scalar(47250.5, { unit: 'USD' })
Outcomes.categorical('Real Madrid', { options: ['Real Madrid', 'Barcelona'] })
Outcomes.probabilistic(0.72, { reasoning: 'Trailing market signals' })
Outcomes.invalid('False premise: team has been dissolved', { category: 'FALSE_PREMISE' })
```

---

## Architecture Note

The interfaces package deliberately contains no runtime dependencies on the TaaS backend, gateway, or execution engine. A third-party developer can build and ship an adapter using only this package without ever running a local node or accessing internal infrastructure.
