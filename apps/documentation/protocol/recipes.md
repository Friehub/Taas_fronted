# Truth Recipes

A **Recipe** is a JSON-serializable, declarative execution blueprint. It tells the TaaS network exactly how to derive a verifiable fact from real-world data.

---

## Anatomy of a Recipe

```json
{
  "id": "btc-above-100k",
  "version": "1.0.0",
  "outcomeType": "BINARY",
  "inputs": {
    "symbol": { "type": "string", "required": true },
    "threshold": { "type": "number", "required": true }
  },
  "logic": [
    {
      "id": "fetch-price",
      "type": "standard-feed",
      "config": {
        "provider": "coingecko",
        "params": { "symbol": "{{inputs.symbol}}" }
      }
    },
    {
      "id": "evaluate",
      "type": "condition",
      "config": {
        "expression": "{{fetch-price.data.value}} > {{inputs.threshold}}"
      }
    }
  ],
  "attestation": {
    "strategy": "consensus",
    "threshold": 1
  }
}
```

---

## Field Reference

### Top-Level

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the recipe. Used in on-chain requests. |
| `version` | `string` | SemVer string. Allows versioned recipe upgrades. |
| `outcomeType` | `enum` | One of `BINARY`, `SCALAR`, `CATEGORICAL`, `PROBABILISTIC`, `INVALID`. |
| `inputs` | `object` | Schema definition for runtime parameters. |
| `logic` | `array` | Ordered list of execution steps. |
| `attestation` | `object` | Consensus configuration for how nodes should agree. |

### Outcome Types

| Type | Value Shape | Example |
|---|---|---|
| `BINARY` | `0` or `1` | "Did Team A win?" |
| `SCALAR` | `number` | "What is the BTC price?" |
| `CATEGORICAL` | `string` | "Who won the election?" |
| `PROBABILISTIC` | `number (0–1)` | "How likely is this event?" |
| `INVALID` | `string (reason)` | "Question has a false premise" |

### Logic Step Types

| Type | Description |
|---|---|
| `standard-feed` | Fetches data from a registered SovereignAdapter plugin. |
| `condition` | Evaluates a boolean expression from prior step outputs. |
| `aggregate` | Combines multiple step outputs (median, weighted average, etc). |
| `transform` | Applies math or string transformations to step outputs. |

---

## Register a Recipe

Recipes can be registered programmatically:

```typescript
import { RecipeRegistry } from '@friehub/recipes';

await RecipeRegistry.register(recipe);
```

Or via the TaaS Backend REST API:

```bash
curl -X POST https://api.friehub.com/recipes \
  -H 'Authorization: Bearer YOUR_JWT' \
  -H 'Content-Type: application/json' \
  -d @my-recipe.json
```

---

## Execute a Recipe Locally

The execution engine is fully runnable in Node.js:

```typescript
import { RecipeExecutor } from '@friehub/execution-engine';
import { RecipeInstance } from '@friehub/recipes';
import blueprint from './recipe.json';

const result = await RecipeExecutor.execute(
    new RecipeInstance(blueprint).toRecipe(),
    { symbol: 'BTC', threshold: 100000 }
);

console.log(result.truth); // 1 if BTC > 100000, 0 otherwise
```

To route data through the TaaS Gateway (no local API keys required):

```bash
TAAS_USE_PROXY=true TAAS_PROXY_URL=https://api.friehub.com pnpm tsx test.ts
```
