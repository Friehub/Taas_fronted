# Truth Recipes

A Recipe is the unit of work in the TaaS Protocol. It is a structured definition that tells the network how to derive a verifiable fact from real-world data.

---

## Core Concepts

### The Recipe Object

A recipe has four required sections:

```typescript
import {
    Recipe,
    TruthType,
    DataCategory
} from '@friehub/taas-interfaces';

const recipe: Recipe = {
    id: 'btc-price',

    metadata: {
        id: 'btc-price',
        name: 'Verified BTC Price',
        description: 'Fetches the Bitcoin spot price from multiple sources.',
        category: 'Finance',
        version: '1.0.0',
        tags: ['crypto', 'price']
    },

    ui: {
        titleTemplate: 'What is the price of {{symbol}}?',
        truthType: TruthType.SCALAR,
        variables: [
            {
                name: 'symbol',
                label: 'Asset Symbol',
                type: 'string',
                required: true,
                defaultValue: 'BTC'
            }
        ]
    },

    logic: {
        pathway: DataCategory.CRYPTO,
        attestationStrategy: 'median',
        attestationConfig: { minSources: 2, maxDeviation: 0.05 },
        steps: [
            {
                id: 'fetch-price',
                type: 'standard-feed',
                params: {
                    category: 'crypto',
                    method: 'fetch',
                    args: [JSON.stringify({ symbol: '{{symbol}}' })]
                },
                targetVar: 'price_raw'
            }
        ]
    }
};
```

---

## Building with the Fluent API

The recipe system also provides a `RecipeBuilder` for a more programmatic approach:

```typescript
import { RecipeBuilder, TruthType } from '@friehub/taas-interfaces';

const recipe = RecipeBuilder.create('BTC Price Threshold')
    .withDescription('Returns 1 if BTC is above a given price, 0 otherwise')
    .withCategory('Finance')
    .withPathway('crypto', { symbol: 'BTC' })
    .withTitleTemplate('Is BTC above {{threshold}} USD?')
    .withInput('threshold', 'number', 'Price Threshold ($)', true)
    .withTruthType(TruthType.BINARY)
    .withAttestation('comparison')
    .build();
```

---

## Truth Types

Every recipe must declare a `truthType` in the `ui` block:

| Enum | Description | Smart Contract Value |
|---|---|---|
| `TruthType.BINARY` | Yes (1) or No (0) | uint8(0) |
| `TruthType.SCALAR` | Numeric value | uint8(1) |
| `TruthType.CATEGORICAL` | One of N string options | uint8(2) |
| `TruthType.PROBABILISTIC` | Confidence score (0-1) | uint8(3) |
| `TruthType.INVALID` | Unanswerable / false premise | uint8(4) |

---

## Pipeline Steps

The `logic.steps` array defines the execution pipeline. Each step is a `PipelineStep` object:

```typescript
interface PipelineStep {
    id: string;
    type: 'standard-feed' | 'fetch' | 'transform' | 'math' |
          'consensus' | 'accumulator' | 'reasoner' | 'distiller' | 'search';
    params: Record<string, any>;
    targetVar: string;
    dependencies?: string[];
}
```

### Step Type Reference

| Type | Purpose | Key params |
|---|---|---|
| `standard-feed` | Fetch from a registered data adapter | `category`, `method`, `args` |
| `fetch` | Generic HTTP request | `url`, `dataPath` |
| `transform` | Apply a math or string expression | `expression`, `inputVar` |
| `math` | Numeric expression evaluation | `expression` |
| `consensus` | Aggregate multiple source values | `sources`, `agreementThreshold` |
| `accumulator` | Track a running value over time (MAX/MIN/SUM) | `inputVar`, `operation` |
| `reasoner` | AI-based reasoning for subjective questions | `question`, `contextVar` |
| `distiller` | Summarize large text into facts | `inputVar`, `chunkSize` |
| `search` | Web search for contextual data | `query`, `engine`, `count` |

---

## Attestation Strategies

The `logic.attestationStrategy` field controls how the execution engine produces a final result from the pipeline outputs:

| Strategy | Description |
|---|---|
| `median` | Takes the statistical median of all source values |
| `comparison` | Evaluates a conditional expression (useful for BINARY recipes) |
| `scalar` | Returns the raw numeric output of the pipeline |
| `external_oracle` | Delegates to an external oracle (UMA, Chainlink) |

---

## Data Categories

The `logic.pathway` field maps to a `DataCategory`, which determines which adapters are available for `standard-feed` steps:

| Category | Description |
|---|---|
| `DataCategory.CRYPTO` | Cryptocurrency prices and market data |
| `DataCategory.SPORTS` | Match results, scores, statistics |
| `DataCategory.WEATHER` | Temperature, precipitation, climate data |
| `DataCategory.ECONOMICS` | Macro-economic indicators (inflation, GDP) |
| `DataCategory.FINANCE` | Forex rates, stock prices, commodities |
| `DataCategory.SOCIAL` | Social media signals |
| `DataCategory.CUSTOM` | Custom multi-step pipelines with no single pathway |

---

## Builder Methods

`RecipeBuilder` provides fluent helper methods for common configurations:

| Method | Description |
|---|---|
| `.withInput(name, type, label, required)` | Adds a typed input variable |
| `.withTruthType(type)` | Sets the outcome type |
| `.withAttestation(strategy)` | Sets the attestation strategy |
| `.withComparison(op, targetVar, value)` | Configures a binary comparison |
| `.withStep(type, id, params, targetVar)` | Adds a custom pipeline step |
| `.withGenericFeed(url, dataPath)` | Adds an HTTP data fetch |
| `.withConsensusStep(symbol, targetVar)` | Adds multi-source consensus |
| `.withAccumulator(inputVar, op)` | Adds a value tracker (MAX/MIN/SUM) |
| `.withAIJudgment(question, contextVar)` | Adds an AI reasoning step |
| `.withSearch(query, targetVar)` | Adds a web search step |
| `.withDistiller(inputVar, targetVar)` | Adds a text distillation step |
| `.withResultLabels(labels[])` | Sets labels for `CATEGORICAL` outcomes |

---

## Registering a Recipe

Once your recipe is authored, register it via the TaaS Gateway API:

```bash
curl -X POST https://api.friehub.com/recipes \
  -H 'Authorization: Bearer YOUR_JWT' \
  -H 'Content-Type: application/json' \
  -d @my-recipe.json
```

All Truth Nodes in the network will automatically pick it up when requested on-chain.
