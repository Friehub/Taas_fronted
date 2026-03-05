# Compiling & Deploying

Once your recipe is authored, it must be registered with the TaaS Gateway so that nodes can discover and execute the logic.

## 1. Local Testing
Before deploying, you can verify your recipe logic locally.

```typescript
const result = await myRecipe.test({ targetPrice: 2500 });
console.log("Local Test Result:", result);
```

## 2. Registering with the Gateway

### Option A: The CLI Way (Recommended)
The fastest way to deploy a recipe is using the TaaS CLI. It handles compilation and submission in a single command.

```bash
# Register a recipe with the gateway
npx taas deploy ./my-recipe.ts --token YOUR_AUTH_TOKEN
```

### Option B: The Programmatic Way
If you are building custom tooling, you can use the integrated `deploy()` method in the SDK.

```typescript
import { TruthGatewayClient } from '@friehub/taas-sdk';

const client = new TruthGatewayClient("https://gateway.friehub.cloud");

async function deploy() {
    // One-step compilation and registration
    const response = await myRecipe.deploy(client, process.env.TAAS_ADMIN_KEY);
    
    console.log(`Recipe deployed! ID: ${response.id}`);
}
```

## 3. Just-In-Time Discovery
TaaS employs Just-In-Time (JIT) Discovery. Once you have submitted your recipe to the gateway, any request on-chain will trigger nodes to automatically synchronize and execute the logic, even if they have not previously encountered that recipe.

Note: In a production environment, recipe submission is typically restricted to authorized developers to ensure the integrity of the truth repository.
