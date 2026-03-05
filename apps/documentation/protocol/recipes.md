# Truth Recipes

A Recipe is the fundamental unit of work in the TaaS Protocol. It is a structured definition that instructs the network on how to derive a verifiable fact from real-world data sources.

---

## Core Concepts

### The Recipe Structure

A recipe consists of four primary sections:

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
        description: 'Retrieves the Bitcoin spot price from multiple verified sources.',
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

## Building Recipes Programmatically

The TaaS system provides a `RecipeBuilder` for a streamlined, programmatic approach to recipe definition:

```typescript
import { RecipeBuilder, TruthType } from '@friehub/taas-interfaces';

const recipe = RecipeBuilder.create('BTC Price Threshold')
    .withDescription('Returns 1 if BTC is above a specified price, 0 otherwise')
    .withCategory('Finance')
    .withPathway('crypto', { symbol: 'BTC' })
    .withTitleTemplate('Is BTC above {{threshold}} USD?')
    .withInput('threshold', 'number', 'Price Threshold (USD)', true)
    .withTruthType(TruthType.BINARY)
    .withAttestation('comparison')
    .build();
```

---

## Truth Types

Each recipe must specify a `truthType` within its UI configuration to define the expected outcome format:

| Type | Description | Result Format |
|---|---|---|
| `TruthType.BINARY` | Represents a Yes (1) or No (0) outcome. | uint8(0) |
| `TruthType.SCALAR` | Represents a numeric value. | uint8(1) |
| `TruthType.CATEGORICAL` | Represents one of several specified string options. | uint8(2) |
| `TruthType.PROBABILISTIC` | Represents a confidence score between 0 and 1. | uint8(3) |
| `TruthType.INVALID` | Used when a question is unanswerable or based on a false premise. | uint8(4) |

---

## Pipeline Execution

The `logic.steps` array defines the execution pipeline. Each step identifies a specific operation required to resolve the truth request.

### Pipeline Step Reference

| Type | Purpose | Parameters |
|---|---|---|
| `standard-feed` | Retrieve data from an authorized network adapter. | `category`, `method`, `args` |
| `fetch` | Perform a generic HTTP request. | `url`, `dataPath` |
| `transform` | Apply a mathematical or string transformation. | `expression`, `inputVar` |
| `math` | Evaluate a numeric expression. | `expression` |
| `consensus` | Aggregate values from multiple sources. | `sources`, `agreementThreshold` |
| `accumulator` | Track values over time, such as maximum or minimum. | `inputVar`, `operation` |
| `reasoner` | Apply logic to resolve complex or subjective queries. | `question`, `contextVar` |
| `distiller` | Process and summarize large data sets. | `inputVar`, `chunkSize` |
| `search` | Perform a web search for relevant context. | `query`, `engine`, `count` |

---

## Attestation Strategies

The `logic.attestationStrategy` defines how the network derives a final result from the pipeline outputs:

| Strategy | Description |
|---|---|
| `median` | Calculates the statistical median of all retrieved values. |
| `comparison` | Evaluates a logic condition, typically for binary outcomes. |
| `scalar` | Returns the raw numeric output from the pipeline. |
| `external_oracle` | Delegates the final resolution to a secondary verification layer. |

---

## Data Categories

The `logic.pathway` maps to a `DataCategory`, determining which adapters are prioritized for execution:

| Category | Domain |
|---|---|
| `DataCategory.CRYPTO` | Market data for digital assets. |
| `DataCategory.SPORTS` | Athletics results and statistics. |
| `DataCategory.WEATHER` | Environmental and climate data. |
| `DataCategory.ECONOMICS` | Global macroeconomic indicators. |
| `DataCategory.FINANCE` | Traditional markets, stocks, and commodities. |
| `DataCategory.SOCIAL` | Social media metrics and trends. |
| `DataCategory.CUSTOM` | Specialized multi-step logic pipelines. |

---

## Registration Process

Once a recipe is authored, it remains dormant until registered with the TaaS Gateway:

```bash
curl -X POST https://api.friehub.com/recipes \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d @my-recipe.json
```

All active Truth Nodes will automatically recognize and execute the recipe upon the detection of an on-chain request.
