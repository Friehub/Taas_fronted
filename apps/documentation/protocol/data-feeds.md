# Data Feed Registry

The TaaS Data Feed Registry is a runtime directory of all active data provider plugins registered in the network. It is managed by the `@friehub/sovereign-logic` package and populated by the `@friehub/taas-plugins` ecosystem.

---

## How it Works

When the TaaS Backend or a Truth Node starts, it initializes the plugin registry by calling:

```typescript
import { bootstrapRegistry, globalLogicRegistry } from '@friehub/sovereign-logic';
import { CategoryMapper } from '@friehub/taas-plugins';

await bootstrapRegistry({});

const plugins = CategoryMapper.getPlugins({
    keys: {
        coingecko: process.env.COINGECKO_API_KEY,
        sportmonks: process.env.SPORTMONKS_KEY,
        openweather: process.env.OPENWEATHER_KEY,
        // ... other providers
    }
});

for (const plugin of plugins) {
    globalLogicRegistry.register(plugin);
}
```

Each plugin is a `SovereignAdapter` instance with a standardized `fetch({ params })` method that returns a `TruthData` object.

---

## Registered Providers

### Crypto

| Provider ID | Description | Required Key |
|---|---|---|
| `coingecko` | Cryptocurrency price data (BTC, ETH, all tokens) | Optional |
| `birdeye` | Solana DeFi token prices and market data | `BIRDEYE_API_KEY` |
| `cmc` | CoinMarketCap multi-asset price rankings | `CMC_API_KEY` |

### Finance & Economics

| Provider ID | Description | Required Key |
|---|---|---|
| `alphavantage` | Forex rates, stock prices, commodity data | `ALPHA_VANTAGE_KEY` |
| `exchangerate` | Currency exchange rate data | `EXCHANGERATE_KEY` |
| `fred` | US Federal Reserve Economic Data (macroeconomics) | `FRED_KEY` |

### Sports

| Provider ID | Description | Required Key |
|---|---|---|
| `sportmonks` | Football/soccer fixture results and statistics | `SPORTMONKS_KEY` |
| `theoddsapi` | Sports betting odds across major leagues | `THE_ODDS_API_KEY` |
| `sportsdb` | Multi-sport event outcomes | `SPORTS_DB_KEY` |

### Weather

| Provider ID | Description | Required Key |
|---|---|---|
| `openweather` | Current and forecasted weather by location | `OPENWEATHER_KEY` |

### Social & AI

| Provider ID | Description | Required Key |
|---|---|---|
| `groq` | Fast LLM inference for text-based truth queries | `GROQ_API_KEY` |
| `gemini` | Google Gemini AI inference | `GEMINI_API_KEY` |
| `serper` | Google Search API for web-based fact checking | `SERPER_API_KEY` |

---

## Writing a Custom Adapter

Implement the `SovereignAdapter` interface from `@friehub/taas-interfaces`:

```typescript
import { SovereignAdapter, TruthData, DataCategory } from '@friehub/sovereign-logic';

export class MyCustomAdapter extends SovereignAdapter<TruthData> {
    constructor(apiKey: string) {
        super({
            name: 'my-custom-source',
            category: DataCategory.FINANCE
        });
    }

    protected async fetchData(params: any): Promise<TruthData> {
        const response = await fetch(`https://my-api.com/data?q=${params.query}`);
        const json = await response.json();

        return {
            id: 'my-custom-source',
            value: json.result,
            category: DataCategory.FINANCE,
            source: 'my-custom-source',
            timestamp: Math.floor(Date.now() / 1000),
            metadata: json
        };
    }

    protected async getMockData(params: any): Promise<TruthData> {
        return this.fetchData(params); // For testing
    }
}
```

Register it:

```typescript
globalLogicRegistry.register(new MyCustomAdapter(process.env.MY_API_KEY!));
```

---

## Querying the Registry via the Gateway

The TaaS Gateway exposes a REST endpoint to inspect all registered feed statuses:

```bash
GET https://api.friehub.com/gateway/feeds
```

Response:
```json
{
  "success": true,
  "total": 14,
  "feeds": [
    {
      "id": "coingecko",
      "name": "CoinGecko",
      "category": "CRYPTO",
      "status": "HEALTHY",
      "circuitBreaker": { "state": "CLOSED" }
    }
  ]
}
```
