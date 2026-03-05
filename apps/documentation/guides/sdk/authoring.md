# Writing Recipes

Recipes are the heart of TaaS. They define the autonomous logic used to seek and verify truth.

## The Recipe Blueprint
A recipe is a Directed Acyclic Graph (DAG). You define it using our fluent TypeScript builder.

```typescript
import { Recipe, Step, Truth } from '@friehub/taas-sdk';

export const myRecipe = Recipe.define({
    name: "ETH Price Drop Protection",
    description: "Resolves TRUE if ETH drops below target",
    category: "FINANCE",
    outcomeType: "BINARY"
})
```

## Defining Inputs
Inputs are the parameters passed to your recipe when it's requested on-chain.

```typescript
.withInput({
    targetPrice: { type: 'number', label: 'Threshold (USD)', default: 2000 }
})
```

## The Logic Handler
The `handler` is where you orchestrate data sources and transformations.

```typescript
.handler(async (inputs) => {
    // 1. Fetch live ETH price
    const ethPrice = await Truth.finance().price('ETH');

    // 2. Define the condition logic
    const isBelow = Step.logic.condition(
      `\${${ethPrice.targetVar}} < \${${inputs.targetPrice}}`
    );

    // 3. Optional: Add a fallback
    // Step.logic.fallback(ethPrice.targetVar, 'binance-backup-node');

    return isBelow;
})
```

## Compilation
Once defined, compile the recipe into a JSON blueprint that the protocol can execute.

```typescript
const blueprint = await myRecipe.compile();
```
