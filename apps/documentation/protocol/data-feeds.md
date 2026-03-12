# Data Provider Registry

The TaaS Data Provider Registry is a decentralized directory of authorized data sources utilized by the network to resolve truth requests. This registry is continually updated as new adapters are verified and integrated through protocol governance.

---

## Operational Logic

Upon network initialization, the TaaS Protocol loads the authorized provider registry and configures the necessary access credentials as defined in the secure environmental parameters.

Every provider plugin adheres to a standardized architecture, exposing a `fetch()` mechanism that returns a validated and verifiable data point to the decentralized execution engine.

---

## Authorized Providers

### Cryptographic Assets

| Provider | Purpose | Resolution |
|---|---|---|
| CoinGecko | Comprehensive price data for digital assets. | Standard. |
| Birdeye | High-fidelity DeFi market data and token analytics. | Stakeholder API Key Required. |
| CoinMarketCap | Institutional-grade multi-asset rankings and appraisals. | Stakeholder API Key Required. |

### Global Finance and Economics

| Provider | Purpose | Resolution |
|---|---|---|
| Alpha Vantage | Forex rates, equity prices, and commodities market data. | Stakeholder API Key Required. |
| ExchangeRate | Real-time fiat currency exchange rates and valuation. | Stakeholder API Key Required. |
| FRED | Macroeconomic indicators from the Federal Reserve. | Stakeholder API Key Required. |

### Athletics and Entertainment

| Provider | Purpose | Resolution |
|---|---|---|
| Sportmonks | Granular football metrics, results, and statistics. | Stakeholder API Key Required. |
| The Odds | Betting market analytics across major global leagues. | Stakeholder API Key Required. |
| SportsDB | Official event outcomes and historical data. | Stakeholder API Key Required. |

### Environmental Data

| Provider | Purpose | Resolution |
|---|---|---|
| OpenWeather | Real-time and forecasted atmospheric conditions. | Stakeholder API Key Required. |

### Reasoning and Web Search

| Provider | Purpose | Resolution |
|---|---|---|
| Groq | High-speed inference for logical truth validation. | Stakeholder API Key Required. |
| Google Gemini | Advanced reasoning for complex or subjective queries. | Stakeholder API Key Required. |
| Serper | Real-time web search for contextual fact-checking. | Stakeholder API Key Required. |

---

## Custom Adapter Implementation

To integrate a new data source, developers should implement the `SovereignAdapter` class as provided in the protocol interfaces library.

```typescript
import { SovereignAdapter, DataCategory } from '@taas/taas-interfaces';

export class MyCustomAdapter extends SovereignAdapter {
    constructor(apiKey: string) {
        super({
            name: 'my-custom-source',
            category: DataCategory.FINANCE
        });
    }

    protected async fetchData(params: any): Promise<any> {
        const response = await fetch(`https://api.provider.com/data?q=${params.query}`);
        const data = await response.json();

        return {
            value: data.result,
            timestamp: Math.floor(Date.now() / 1000),
            metadata: data
        };
    }

    protected async getMockData(params: any): Promise<any> {
        return this.fetchData(params);
    }
}
```

Once developed, adapters must be reviewed and registered within the network according to the official contribution guidelines.

---

## Protocol Registry Access

The TaaS Gateway provides a secure endpoint for inspecting the real-time status and health of all registered data providers:

```bash
GET https://api.taas.network/gateway/feeds
```

The response includes the status of the circuit breaker mechanism and the current health classification for each provider in the ecosystem.
