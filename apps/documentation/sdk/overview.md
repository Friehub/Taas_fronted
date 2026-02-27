# SDK Overview

The TaaS ecosystem provides developer tooling to make interacting with the Fact Engine as seamless as possible. The primary packages for developers are:

## 1. `@friehub/taas-interfaces`

This package contains the core TypeScript interfaces, types, and constants that define the shape of data across the entire protocol. It acts as the single source of truth for communication between Sentinels, the Gateway, Smart Contracts, and developer applications.

### Key Exports
- `Recipe` and `RecipeDefinition`: Types defining how a truth query should be constructed.
- `Attestation`: The structured data format resolved by Sentinel Nodes.
- `SovereignAdapter`: Interfaces for adapting internal data structures for on-chain consumption.

## 2. `@friehub/taas-sdk`

The TaaS SDK provides utility functions and classes to help developers write and test recipes locally before deploying them or requesting their execution on the network.

### Writing a Recipe

Using the SDK, developers can programmatically define a Truth Recipe.

```typescript
import { RecipeBuilder } from '@friehub/taas-sdk';

const nflRecipe = new RecipeBuilder()
  .setName("NFL Superbowl LVIII Result")
  .setSourcePlugin("sportmonks")
  .setQuery({ matchId: '12345' })
  .setValidationRules({
    requireConsensus: true,
    minSignatures: 3
  })
  .build();

console.log(nflRecipe);
```

### Local Testing

The SDK includes a local sandbox environment allowing developers to mock Sentinel nodes and test how their recipe evaluates against sample data before spending `$TAAS` or `$HLS` tokens on the live network.
