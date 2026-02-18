# TaaS Recipes

**Create standard truth definitions for any data source.**

Recipes define how to fetch, process, and return structured outcomes. They are the core building blocks of TaaS that enable permissionless oracle creation.

---

## Quick Start

```typescript
// examples/MyFirstRecipe.ts
import { Recipe, Outcomes } from '@friehub/recipes';

export const MyFirstRecipe: Recipe = {
  id: 'my-first-recipe',
  version: '1.0.0',
  outcomeType: 'BINARY',
  
  inputs: {
    question: { type: 'string', required: true }
  },
  
  handler: async ({ inputs, feeds }) => {
    const answer = await feeds.search(inputs.question);
    return Outcomes.binary(answer ? 1 : 0);
  }
};
```

---

## Rich Outcome Types

TaaS supports **5 outcome types**:

### 1. Binary (YES/NO)

```typescript
export const SimpleCheck: Recipe = {
  id: 'event-happened',
  outcomeType: 'BINARY',
  
  handler: async ({ inputs, feeds }) => {
    const happened = await checkEvent(inputs.eventId);
    
    return Outcomes.binary(happened ? 1 : 0, {
      confidence: 0.95
    });
  }
};
```

### 2. Scalar (Numbers with Units)

```typescript
export const BTCPrice: Recipe = {
  id: 'btc-price',
  outcomeType: 'SCALAR',
  
  handler: async ({ inputs, feeds }) => {
    const prices = await Promise.all([
      feeds.fetch('https://api.binance.com/v3/ticker/price?symbol=BTCUSDT'),
      feeds.fetch('https://api.coingecko.com/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    ]);
    
    const avgPrice = calculateMedian(prices);
    
    return Outcomes.scalar(avgPrice, {
      unit: 'USD',
      precision: 2,
      confidence: 0.98
    });
  }
};
```

### 3. Categorical (Multiple Options)

```typescript
export const MatchWinner: Recipe = {
  id: 'match-winner',
  outcomeType: 'CATEGORICAL',
  
  handler: async ({ inputs, feeds }) => {
    const result = await feeds.fetch(`https://api.sports.com/match/${inputs.matchId}`);
    
    return Outcomes.categorical(result.winner, {
      options: [inputs.team1, inputs.team2, 'Draw'],
      confidence: 1.0
    });
  }
};
```

### 4. Probabilistic (AI Predictions)

```typescript
export const SubjectivePrediction: Recipe = {
  id: 'subjective-analysis',
  outcomeType: 'PROBABILISTIC',
  
  handler: async ({ inputs, feeds }) => {
    const analysis = await feeds.ai({
      model: 'gpt-4',
      prompt: `Analyze: ${inputs.question}\nProvide probability (0-1) and reasoning.`
    });
    
    return Outcomes.probabilistic(analysis.probability, {
      reasoning: analysis.reasoning,
      model: 'gpt-4',
      confidence: 0.85
    });
  }
};
```

### 5. Invalid (False Premise Detection)

```typescript
export const QuestionValidator: Recipe = {
  id: 'validate-question',
  outcomeType: 'INVALID',
  
  handler: async ({ inputs, feeds }) => {
    const facts = await feeds.search(inputs.question);
    
    if (hasFalsePremise(facts)) {
      return Outcomes.invalid(
        'Question contains false premise: premise X is incorrect',
        {
          correction: 'Suggested correct question: ...',
          category: 'FALSE_PREMISE'
        }
      );
    }
    
    // Process normally if valid
    return Outcomes.binary(1);
  }
};
```

---

## Recipe Structure

### Required Fields

```typescript
interface Recipe {
  id: string;              // Unique identifier
  version: string;         // Semantic version (1.0.0)
  outcomeType: OutcomeType; // BINARY | SCALAR | CATEGORICAL | PROBABILISTIC | INVALID
  
  inputs: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean';
      required: boolean;
      default?: any;
    }
  };
  
  handler: (context: RecipeContext) => Promise<Outcome>;
}
```

### Recipe Context

```typescript
interface RecipeContext {
  inputs: Record<string, any>;
  
  feeds: {
    search(query: string): Promise<any>;
    fetch(url: string): Promise<any>;
    ai(params: AIParams): Promise<any>;
  };
  
  utils: {
    median(values: number[]): number;
    mean(values: number[]): number;
    timestamp(): number;
  };
}
```

---

## Advanced Examples

### Multi-Source Consensus

```typescript
export const MultiSourcePrice: Recipe = {
  id: 'multi-source-price',
  outcomeType: 'SCALAR',
  
  handler: async ({ inputs, feeds, utils }) => {
    // Fetch from multiple sources
    const sources = [
      feeds.fetch('https://api.binance.com/v3/ticker/price?symbol=BTCUSDT'),
      feeds.fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot'),
      feeds.fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD')
    ];
    
    const prices = await Promise.all(sources);
    const normalized = prices.map(p => normalizePrice(p));
    
    // Remove outliers
    const cleaned = removeOutliers(normalized);
    
    // Calculate median
    const finalPrice = utils.median(cleaned);
    
    return Outcomes.scalar(finalPrice, {
      unit: 'USD',
      precision: 2,
      confidence: calculateConfidence(cleaned),
      metadata: {
        sources: sources.length,
        outliers: prices.length - cleaned.length
      }
    });
  }
};
```

### Time-Series Analysis

```typescript
export const PriceMovement: Recipe = {
  id: 'price-movement',
  outcomeType: 'CATEGORICAL',
  
  handler: async ({ inputs, feeds }) => {
    const startPrice = await getPriceAt(inputs.startTime);
    const endPrice = await getPriceAt(inputs.endTime);
    
    const change = ((endPrice - startPrice) / startPrice) * 100;
    
    let category;
    if (change > 5) category = 'PUMP';
    else if (change < -5) category = 'DUMP';
    else category = 'STABLE';
    
    return Outcomes.categorical(category, {
      options: ['PUMP', 'DUMP', 'STABLE'],
      metadata: {
        changePercent: change,
        startPrice,
        endPrice
      }
    });
  }
};
```

### Conditional Logic

```typescript
export const ConditionalOutcome: Recipe = {
  id: 'conditional-check',
  outcomeType: 'BINARY', // Can return INVALID if condition not met
  
  handler: async ({ inputs, feeds }) => {
    // Check if event exists
    const event = await feeds.search(`event ${inputs.eventId}`);
    
    if (!event) {
      return Outcomes.invalid(
        `Event ${inputs.eventId} does not exist`,
        { correction: 'Please check event ID' }
      );
    }
    
    // Check if event has concluded
    if (event.status !== 'CONCLUDED') {
      return Outcomes.invalid(
        'Event has not concluded yet',
        { category: 'PREMATURE_QUERY' }
      );
    }
    
    // Return actual outcome
    return Outcomes.binary(event.result ? 1 : 0, {
      confidence: 1.0
    });
  }
};
```

---

## Testing Recipes

### Local Testing

```bash
# Test a recipe locally
npm run test:recipe my-recipe-id -- --inputs '{"symbol":"BTC"}'

# Expected output:
# Recipe executed successfully
# Outcome Type: SCALAR
# Value: 98234.56
# Unit: USD
# Confidence: 0.98
```

### Unit Tests

```typescript
// tests/my-recipe.test.ts
import { describe, it, expect } from 'vitest';
import { MyRecipe } from '../MyRecipe';

describe('MyRecipe', () => {
  it('should return scalar outcome', async () => {
    const result = await MyRecipe.handler({
      inputs: { symbol: 'BTC' },
      feeds: mockFeeds,
      utils: mockUtils
    });
    
    expect(result.type).toBe('SCALAR');
    expect(result.value).toBeGreaterThan(0);
    expect(result.unit).toBe('USD');
  });
  
  it('should handle invalid inputs', async () => {
    const result = await MyRecipe.handler({
      inputs: { symbol: 'INVALID' },
      feeds: mockFeeds,
      utils: mockUtils
    });
    
    expect(result.type).toBe('INVALID');
  });
});
```

---

## Publishing Recipes

### 1. Create Recipe File

```typescript
// recipes/published/my-amazing-recipe.ts
export const MyAmazingRecipe: Recipe = {
  id: 'my-amazing-recipe',
  version: '1.0.0',
  // ... rest of recipe
};
```

### 2. Register Recipe

```typescript
// recipes/index.ts
import { RecipeRegistry } from '@friehub/recipes';
import { MyAmazingRecipe } from './published/my-amazing-recipe';

RecipeRegistry.register(MyAmazingRecipe);
```

### 3. Deploy to Network

```bash
# Publish recipe metadata to IPFS
npm run publish:recipe my-amazing-recipe

# Output:
# Recipe published to IPFS: QmXyz...
# Add to your truth node config:
# RECIPES=["ipfs://QmXyz..."]
```

---

## Best Practices

### Determinism

**Critical**: Recipes MUST be deterministic for verification.

**Good** (Deterministic):
```typescript
const data = await feeds.fetch('https://api.example.com/price');
const price = data.price;
return Outcomes.scalar(price, { unit: 'USD' });
```

**Bad** (Non-deterministic):
```typescript
const random = Math.random(); // Different every time!
const timestamp = Date.now();  // Different every time!
return Outcomes.scalar(random * timestamp);
```

### Error Handling

```typescript
handler: async ({ inputs, feeds }) => {
  try {
    const data = await feeds.fetch(inputs.url);
    return Outcomes.scalar(data.value);
  } catch (error) {
    return Outcomes.invalid(
      `Failed to fetch data: ${error.message}`,
      { category: 'API_ERROR' }
    );
  }
}
```

### Input Validation

```typescript
inputs: {
  symbol: {
    type: 'string',
    required: true,
    validate: (value) => {
      if (!/^[A-Z]{3,5}$/.test(value)) {
        throw new Error('Invalid symbol format');
      }
    }
  }
}
```

---

## More Examples

See `/examples` directory for:
- `ScalarExample.ts` - BTC price aggregation
- `CategoricalExample.ts` - Match winner
- `ProbabilisticExample.ts` - AI predictions
- `InvalidExample.ts` - Question validation
