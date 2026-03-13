# TaaS Developer Interfaces

The `@taas/taas-interfaces` library is the foundational type contract for the TaaS Protocol. It contains the abstract base classes, TypeScript interfaces, Zod validation schemas, and adapter utilities required to integrate real-world data sources into the TaaS truth network.

This guide is for developers who intend to:
- Build and publish a custom TaaS data adapter
- Author verifiable truth logic using protocol types
- Integrate TaaS data types into their own applications or smart contract clients

---

## Installation

```bash
pnpm add @taas/taas-interfaces
```

Note: This package contains type definitions and abstract classes only. It is safe for use in frontend applications and untrusted compute environments.

---

## Sovereign Adapters

A Sovereign Adapter is a stateless data plugin that connects an external API to the TaaS network. Every data category in the network, such as crypto, sports, or weather, is supported by various adapters.

When a truth request is submitted on-chain, the TaaS network selects the appropriate adapter, executes the fetch logic, and submits the output as a signed attestation to the truth oracle contracts.

### Adapter Lifecycle

1. On-chain request is detected by the network.
2. The internal runtime selects the adapter based on the required data category.
3. The adapter's `fetch()` method is called with specified parameters.
4. The adapter fetches data from the external API and validates the response against a Zod schema.
5. A `TruthPoint` object is returned to the node.
6. The node signs and submits the verified fact to the blockchain.

---

## Authoring a Custom Adapter

To create a custom adapter, extend the `SovereignAdapter` class and implement the required methods.

```typescript
import {
    SovereignAdapter,
    AdapterConfig,
    DataCategory
} from '@taas/taas-interfaces';
import { z } from 'zod';

// 1. Define the response schema for runtime validation
const PriceSchema = z.object({
    symbol: z.string(),
    price: z.number(),
    timestamp: z.number()
});

type PriceData = z.infer<typeof PriceSchema>;

// 2. Define the input parameters
interface PriceParams {
    symbol: string;
}

// 3. Extend SovereignAdapter
export class MyExchangeAdapter extends SovereignAdapter<PriceData, PriceParams> {

    constructor(config: Partial<AdapterConfig> = {}) {
        super({
            ...config,
            name: 'my-exchange',
            category: DataCategory.CRYPTO,
            responseSchema: PriceSchema
        });
    }

    // Implementation for live data retrieval
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
}
```

### Adapter Framework Provisions

| Provision | Description |
|---|---|
| `this.client` | A pre-configured HTTP client supporting internal network requirements. |
| `this.id` | A unique identifier derived from the adapter name. |
| `this.category` | The classification of data this adapter provides. |
| `this.config.responseSchema` | The schema used to ensure data integrity at runtime. |
| `fetch(params)` | The implementation-agnostic method called by the network. |
| `getCapabilities()` | Metadata describing the parameters supported by the adapter. |

The `responseSchema` property is mandatory to ensure all data passing through the network meets protocol-level validation standards.

---

## Defining Capabilities

To facilitate network discovery and dynamic routing, adapters should define their capabilities. This allows the internal runtime to route requests to the correct adapter without hardcoded mappings.

```typescript
import { AdapterCapability } from '@taas/taas-interfaces';

export class MyExchangeAdapter extends SovereignAdapter<PriceData, PriceParams> {

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

The network uses these capabilities to resolve generic recipe definitions into specific data provider calls at execution time.

---

## Core Types Reference

### DataCategory

```typescript
import { DataCategory } from '@taas/taas-interfaces';

DataCategory.CRYPTO      // Cryptocurrency markets
DataCategory.SPORTS      // Match results and scores  
DataCategory.WEATHER     // Climate and temperature data
DataCategory.ECONOMICS   // Macro-economic indicators
DataCategory.FINANCE     // Forex, stocks, commodities
DataCategory.SOCIAL      // Social media signals
DataCategory.ONCHAIN     // On-chain protocol data
DataCategory.CUSTOM      // Multi-step specialized pipelines
```

### TruthPoint

The `TruthPoint` interface wraps data with provenance metadata:

```typescript
interface TruthPoint<T> {
    value: T;
    metadata: {
        source: string;
        timestamp: number;
        requestId: string;
        lineage: any;
        quality: any;
        verifiableHash?: string;
    };
}
```

### DataRequest

The normalized input format for adapter requests:

```typescript
interface DataRequest {
    params: Record<string, any>;
    timestamp?: number;
    timeout?: number;
    context?: {
        requestId: string;
        timestamp: number;
        deadline: number;
    };
}
```

### Outcome Helpers

```typescript
import { Outcomes } from '@taas/taas-interfaces';

Outcomes.binary(1, { confidence: 0.99 })
Outcomes.scalar(47250.5, { unit: 'USD' })
Outcomes.categorical('Selection', { options: ['Option A', 'Option B'] })
Outcomes.probabilistic(0.72, { reasoning: 'Market trend signals' })
Outcomes.invalid('Description', { category: 'REASON' })
```

---

Once developed, adapters must be reviewed and registered within the network according to the official contribution guidelines.

---

## Architectural Principles

The interfaces library contains no dependencies on internal network infrastructure. This design allows third-party developers to build, test, and ship production-ready adapters without maintaining local nodes or accessing private backends.

---

## Related Documentation

- [SDK Documentation](/guides/taas-sdk): Reference for interacting with the Programmable Oracle Gateway.
