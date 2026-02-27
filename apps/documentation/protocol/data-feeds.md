# Data Feeds

TaaS connects to the real world through **Data Feeds**, which are implemented as Plugins within the `@friehub/taas-plugins` and `@friehub/execution-engine` ecosystems. These plugins define exactly how Sentinels interact with external APIs, ensuring that data fetching is standardized, reliable, and deterministic.

## Standardized Integration

All data feeds must conform to the standard `DataPlugin` interface. This ensures that the Execution Engine can interact with any data source uniformly.

### The `DataPlugin` Interface

```typescript
export interface DataPlugin {
    id: string;              // Unique identifier (e.g., "sportmonks", "binance")
    version: string;
    fetchData(params: any): Promise<any>;
    validateData(data: any): boolean;
    formatData(data: any): any; // Normalizes data for the Attestation Engine
}
```

## Available Feeds

TaaS currently supports a growing ecosystem of official and community-built data feeds:

### 1. Sports Data (`SportMonksPlugin`)

Provides real-time and historical data for various sports (Football, Cricket, etc.), ideal for sports betting platforms and fantasy leagues. It standardizes match events, scores, and player statistics.

### 2. Cryptocurrency Prices

TaaS includes plugins for accessing reliable cryptocurrency market data:
- **`BinancePlugin`**: High-frequency order book and ticker data from Binance.
- **`CoinGeckoPlugin`**: Broad market data covering thousands of tokens.

### 3. Financial Markets (`AlphaVantageAdapter`)

Provides access to traditional financial markets, including Forex and stock equities, enabling real-world asset (RWA) tokenization and tracing.

### 4. Custom API Feeds (`StandardFeedPlugin`)

The `StandardFeedPlugin` allows developers to easily connect to arbitrary JSON REST APIs. By defining precise JSONPath extractors in their Recipes, developers can pull specific data points from almost any web service.

## Building Custom Feeds

Developers can build their own custom data feeds by implementing the `DataPlugin` interface. Once tested, custom feeds can be published and registered on the Friehub Gateway, making them available to the entire Sentinel network for attestation.
