# Quick Start

This guide walks through running a TaaS Recipe execution from scratch — no crypto wallet required to test.

## Prerequisites

- Node.js 20+
- pnpm 9+
- A GitHub account with access to the Friehub GitHub Packages registry

---

## 1. Configure Your Registry Access

Create a `.npmrc` file in your project root:

```ini
@friehub:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

You can generate a Personal Access Token (PAT) in GitHub under **Settings → Developer Settings → Personal Access Tokens** with the `read:packages` scope.

---

## 2. Install the Core SDKs

```bash
pnpm add @friehub/execution-engine @friehub/recipes @friehub/sovereign-logic
```

---

## 3. Write a Recipe

Create a file called `btc-price.json`:

```json
{
  "id": "btc-price",
  "version": "1.0.0",
  "outcomeType": "SCALAR",
  "inputs": {
    "symbol": { "type": "string", "required": true }
  },
  "logic": [
    {
      "id": "fetch-price",
      "type": "standard-feed",
      "config": {
        "provider": "coingecko",
        "params": { "symbol": "{{inputs.symbol}}" }
      }
    }
  ],
  "attestation": {
    "strategy": "median",
    "threshold": 1
  }
}
```

---

## 4. Execute the Recipe

Create a file called `test.ts`:

```typescript
import { RecipeExecutor } from '@friehub/execution-engine';
import { RecipeInstance } from '@friehub/recipes';
import blueprint from './btc-price.json';

// Use the TaaS Gateway as a data proxy — no API keys needed
process.env.TAAS_USE_PROXY = 'true';
process.env.TAAS_PROXY_URL = 'https://api.friehub.com';

async function main() {
    const recipe = new RecipeInstance(blueprint).toRecipe();

    const result = await RecipeExecutor.execute(recipe, {
        symbol: 'BTC',
        attestationTimestamp: Date.now()
    });

    console.log('Success:      ', result.success);
    console.log('Truth Value:  ', result.truth);
    console.log('Proof Hash:   ', result.proof);
}

main().catch(console.error);
```

Run it:

```bash
pnpm tsx test.ts
```

---

## 5. Register a Recipe

To make your recipe available to all Truth Nodes in the network, register it via the TaaS Backend API:

```bash
curl -X POST https://api.friehub.com/recipes \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT' \
  -d @btc-price.json
```

---

## Next Steps

- Read the [Truth Recipes](/protocol/recipes) reference to understand recipe fields.
- Learn about the [Data Feed Registry](/protocol/data-feeds) to see all available providers.
- Deploy a [Truth Node](/nodes/truth-node) to participate in the network.
