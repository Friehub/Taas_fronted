# Quick Start

This guide walks through authoring a TaaS Recipe from scratch. Recipes are the unit of work in the TaaS Protocol — a structured JSON object that defines how a real-world fact should be derived and attested on-chain.

## How the Authoring Flow Works

As a developer, you work with two packages:

| Package | Role | Access |
|---|---|---|
| `@friehub/taas-interfaces` | Core type definitions for `Recipe`, `TruthType`, `SovereignAdapter`, etc. | **Public** |
| `@friehub/taas-plugins` | Pre-built data source adapters (Coingecko, Sportmonks, etc.) | **Private (request access)** |

You **cannot** directly import from `@friehub/execution-engine`, `@friehub/recipes`, or `@friehub/sovereign-logic`. Those are internal runtime packages used by Truth Nodes and the TaaS Backend.

---

## 1. Install the Interfaces Package

```bash
pnpm add @friehub/taas-interfaces
```

If you have been granted access to the plugins registry, also add:
```bash
# .npmrc required
# @friehub:registry=https://npm.pkg.github.com
# //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT

pnpm add @friehub/taas-plugins
```

---

## 2. Understand the Recipe Structure

A `Recipe` in TaaS has four top-level sections:

```typescript
import { Recipe, TruthType, DataCategory } from '@friehub/taas-interfaces';

const btcPriceRecipe: Recipe = {
    id: 'btc-price-scalar',
    metadata: {
        id: 'btc-price-scalar',
        name: 'Verified BTC Price',
        description: 'Fetches the Bitcoin spot price from multiple sources.',
        category: 'Finance',
        version: '1.0.0',
        tags: ['crypto', 'price', 'finance']
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
        attestationConfig: {
            minSources: 2,
            maxDeviation: 0.05
        },
        steps: [
            {
                id: 'fetch-coingecko',
                type: 'standard-feed',
                params: {
                    source: 'coingecko',
                    symbol: '{{symbol}}'
                },
                targetVar: 'price_cg'
            },
            {
                id: 'fetch-binance',
                type: 'standard-feed',
                params: {
                    source: 'binance',
                    symbol: '{{symbol}}'
                },
                targetVar: 'price_bn'
            },
            {
                id: 'aggregate',
                type: 'consensus',
                params: {
                    inputs: ['price_cg', 'price_bn'],
                    strategy: 'median'
                },
                targetVar: 'final_price',
                dependencies: ['fetch-coingecko', 'fetch-binance']
            }
        ]
    }
};
```

---

## 3. Truth Types

Every recipe must declare a `truthType` in its `ui` block:

| Type | Description | Example |
|---|---|---|
| `TruthType.BINARY` | Yes/No (0 or 1) | Did BTC close above $100k? |
| `TruthType.SCALAR` | Numeric value | What is the BTC price in USD? |
| `TruthType.CATEGORICAL` | One of N options | Who won the Premier League? |
| `TruthType.PROBABILISTIC` | Confidence score (0-1) | How likely is a rate cut? |
| `TruthType.INVALID` | Unanswerable | Question has a false premise |

---

## 4. Pipeline Step Types

The `logic.steps` array defines the execution pipeline. Available step types:

| Type | Description |
|---|---|
| `standard-feed` | Fetches data from a registered plugin adapter (e.g., `coingecko`, `sportmonks`) |
| `fetch` | Generic HTTP fetch |
| `transform` | Applies a data transformation to a previous step's output |
| `math` | Evaluates a numeric expression |
| `consensus` | Aggregates multiple source outputs (median, weighted average, etc.) |
| `distiller` | Runs heavy-logic normalization (used by the execution engine internally) |
| `reasoner` | AI-assisted reasoning step (for `PROBABILISTIC` recipes) |

---

## 5. Register Your Recipe

Once your recipe JSON is finalized, submit it to the TaaS Backend API:

```bash
curl -X POST https://api.friehub.com/recipes \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT' \
  -d @btc-price-recipe.json
```

The truth network will automatically discover and execute it when requested on-chain.

---

## Next Steps

- Read the full [Recipe Protocol Reference](/protocol/recipes).
- See all available [Data Feed Adapters](/protocol/data-feeds) and their source IDs.
- Learn how to [write a custom plugin adapter](/guides/development) using `@friehub/taas-interfaces`.
