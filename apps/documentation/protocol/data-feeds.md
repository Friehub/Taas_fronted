# Data Feeds

TaaS connects to the real world through **Data Feeds** — curated, enterprise-grade data sources managed by the FrieHub Sovereign Gateway. When a Recipe specifies a data source, the gateway fetches it, validates it through its proprietary quality layer, and returns a cryptographically signed **TruthPoint** to the requesting Sentinel node.

Developers do not manage API keys or call external APIs directly. The gateway abstracts that entirely.

---

## How Data Feeds Work

1. A Recipe's pipeline includes one or more `standard-feed` nodes.
2. Each node specifies a `category` and a `method` (the data source ID).
3. At execution time, the Sentinel node requests that data from the gateway.
4. The gateway fetches it from its enterprise API layer, signs the response, and returns a **TruthPoint**.
5. The Sentinel cryptographically verifies the gateway's signature before accepting any data.

This design means:
- Sentinels **never see raw API credentials**.
- Every data point in a recipe is **independently signed and verifiable**.
- If the gateway returns invalid or tampered data, the Sentinel's verification step will reject it.

---

## Available Data Categories

The gateway organizes all data sources into categories. Use the `category` field in your `standard-feed` node to route to the correct source group.

| Category | Description | Example Sources |
| :--- | :--- | :--- |
| `crypto` | Cryptocurrency price and market data | Binance, CoinGecko |
| `sports` | Match results, fixtures, player stats | SportMonks |
| `forex` | Foreign exchange rates | AlphaVantage |
| `finance` | Traditional equities and market data | AlphaVantage |
| `weather` | Meteorological data by coordinates | Open-Meteo |
| `econ` | Macroeconomic indicators | FRED |
| `onchain` | Blockchain state data (balances, prices) | RPC / Hyperion |
| `news` | News articles and headlines | Various |
| `social` | Social sentiment and engagement metrics | Various |
| `ai` | AI model outputs and inference results | Various |
| `random` | Verifiable random number generation | VRF-based |
| `web` | Generic REST API data | Custom endpoints |

---

## Defining a Data Feed Node in a Recipe

A `standard-feed` node in a Recipe pipeline looks like this:

```json
{
  "id": "fetch_btc_price",
  "type": "standard-feed",
  "category": "crypto",
  "method": "binance",
  "args": ["BTCUSDT"],
  "targetVar": "btcPrice",
  "dataPath": "price"
}
```

### Fields

| Field | Required | Description |
| :--- | :--- | :--- |
| `id` | Yes | Unique node identifier within the pipeline |
| `type` | Yes | Always `"standard-feed"` for this node type |
| `category` | Yes | Data category (see table above) |
| `method` | Yes | The specific data source/provider ID |
| `args` | Yes | Parameters passed to the data source (e.g., symbol, match ID) |
| `targetVar` | Yes | Context variable name where the result is stored |
| `dataPath` | No | JSONPath selector to extract a nested field from the response |
| `dependencies` | No | Node IDs that must complete before this node runs |
| `timeout` | No | Per-node timeout in milliseconds |

---

## Examples

### Crypto Price — BTC/USDT

Fetches the current BTC/USDT price from Binance and stores it in `btcPrice`:

```json
{
  "id": "fetch_btc",
  "type": "standard-feed",
  "category": "crypto",
  "method": "binance",
  "args": ["BTCUSDT"],
  "targetVar": "btcPrice",
  "dataPath": "price"
}
```

### Sports Match Result

Fetches the result of a football fixture from SportMonks using a dynamic `matchId` input:

```json
{
  "id": "fetch_match",
  "type": "standard-feed",
  "category": "sports",
  "method": "sportmonks",
  "args": ["${matchId}"],
  "targetVar": "matchData",
  "dataPath": "data.result"
}
```

Variables from the Recipe `inputs` block (like `matchId`) are interpolated into `args` using `${variableName}` syntax.

### Forex Rate

Fetches the EUR/USD exchange rate:

```json
{
  "id": "fetch_eurusd",
  "type": "standard-feed",
  "category": "forex",
  "method": "alphavantage",
  "args": ["EUR", "USD"],
  "targetVar": "eurUsdRate",
  "dataPath": "rate"
}
```

---

## Multi-Source Aggregation

For higher-confidence truth, you can combine multiple `standard-feed` nodes with an `aggregate` or `consensus` node. This cross-verifies the data from independent sources before attestation.

```json
[
  {
    "id": "feed_binance",
    "type": "standard-feed",
    "category": "crypto",
    "method": "binance",
    "args": ["BTCUSDT"],
    "targetVar": "priceBinance",
    "dataPath": "price"
  },
  {
    "id": "feed_coingecko",
    "type": "standard-feed",
    "category": "crypto",
    "method": "coingecko",
    "args": ["bitcoin"],
    "targetVar": "priceCG",
    "dataPath": "usd"
  },
  {
    "id": "aggregate_price",
    "type": "aggregate",
    "sources": ["priceBinance", "priceCG"],
    "strategy": "median",
    "targetVar": "finalPrice",
    "dependencies": ["feed_binance", "feed_coingecko"]
  }
]
```

The gateway handles all deduplication, rate limiting, and resilience internally. If one source is temporarily unavailable, the gateway's circuit breaker ensures the other sources continue to provide data without disruption.

---

## Custom Data Sources

If your use case requires a data source not available in the current gateway offering, contact the FrieHub team to discuss enterprise onboarding or join the community adapter program.

> [!NOTE]
> The internal mechanics of how the gateway fetches, normalizes, and signs data are proprietary to FrieHub. The interface exposed to Recipe authors is the `standard-feed` node — everything below that is managed by the protocol.
