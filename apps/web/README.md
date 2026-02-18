# FTS Dashboard

**Web UI for monitoring truth proposals and rich outcomes**

Monitor TaaS network activity, view rich outcomes, explore recipes, and track truth node performance.

---

##  Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Dashboard will be available at `http://localhost:3000`

---

##  Features

### 1. Truth Explorer
Search and view truth proposals with full audit trails:
- Request ID or transaction hash search
- IPFS certificate viewer
- Execution trace visualization
- Source verification

### 2. Rich Outcome Display
Visualize all 5 outcome types:
- **Binary**: YES/NO badges with confidence
- **Scalar**: Large numbers with units
- **Categorical**: Purple option badges
- **Probabilistic**: Percentage bars + reasoning
- **Invalid**: Warning boxes with corrections

### 3. Recipe Browser
Explore available recipes:
- Filter by outcome type
- View recipe metadata
- Test recipes with custom inputs
- See example executions

### 4. Network Stats
Real-time network statistics:
- Active proposals
- Finalized outcomes
- Dispute rate
- Truth node count

---

##  UI Components

### OutcomeDisplay

Display rich outcomes with type-specific rendering:

```typescript
import { OutcomeDisplay } from '@/components/OutcomeDisplay';

<OutcomeDisplay 
  outcome={{
    type: 'SCALAR',
    value: 98234.56,
    unit: 'USD',
    confidence: 0.98
  }}
  showDetails={true}
/>
```

**Props**:
- `outcome`: Outcome object
- `showDetails?`: Show confidence, sources, etc.
- `className?`: Custom CSS classes

### OutcomeTypeSelector

Select outcome type for recipe creation:

```typescript
import { OutcomeTypeSelector } from '@/components/OutcomeTypeSelector';

<OutcomeTypeSelector 
  selected={outcomeType}
  onChange={setOutcomeType}
/>
```

**Props**:
- `selected`: Currently selected type
- `onChange`: Callback when type changes

### OutcomeCompact

Compact view for tables/lists:

```typescript
import { OutcomeCompact } from '@/components/OutcomeDisplay';

<OutcomeCompact 
  outcome={{ type: 'BINARY', value: 1 }}
/>
//  Green "YES" badge
```

---

##  Configuration

### Environment Variables

Create `.env.local`:

```bash
# Network
NEXT_PUBLIC_RPC_URL=https://testnet1.helioschainlabs.org
NEXT_PUBLIC_CHAIN_ID=42000

# Contract
NEXT_PUBLIC_ORACLE_ADDRESS=0x97C80601A5fA9DC685580dDfcebe919eE6362c61

# IPFS
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/

# API (optional)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Theme Customization

Edit `globals.css`:

```css
:root {
  --outcome-binary-yes: #10b981;
  --outcome-binary-no: #ef4444;
  --outcome-scalar: #3b82f6;
  --outcome-categorical: #a855f7;
  --outcome-probabilistic: #6366f1;
  --outcome-invalid: #f59e0b;
}
```

---

##  Pages

### `/`
Homepage with:
- Network overview
- Recent proposals
- Quick stats
- Getting started guide

### `/explorer`
Truth explorer:
- Search by request ID
- View execution traces
- Download IPFS certificates
- Verify attestations

### `/recipes`
Recipe marketplace:
- Browse all recipes
- Filter by category/type
- View example outputs
- Test recipes live

### `/stats`
Network statistics:
- Proposal volume (24h, 7d, 30d)
- Outcome type distribution
- Truth node leaderboard
- Dispute history

---

##  Development

### Project Structure

```
dashboard/
 app/                  # Next.js 14 app directory
    page.tsx         # Homepage
    explorer/        # Truth explorer
    recipes/         # Recipe browser
    stats/           # Statistics

 components/          # React components
    OutcomeDisplay.tsx
    OutcomeTypeSelector.tsx
    AuditExplorer.tsx
    TruthStream.tsx

 lib/                 # Utilities
    api.ts          # API client
    contracts.ts    # Contract interactions
    ipfs.ts         # IPFS utilities

 public/             # Static assets
```

### Adding New Pages

```typescript
// app/my-page/page.tsx
export default function MyPage() {
  return (
    <div>
      <h1>My Custom Page</h1>
      {/* Your content */}
    </div>
  );
}
```

### Custom Components

```typescript
// components/MyComponent.tsx
import { OutcomeDisplay } from './OutcomeDisplay';

export function MyComponent({ outcome }) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h3>Outcome Result</h3>
      <OutcomeDisplay outcome={outcome} />
    </div>
  );
}
```

---

##  Styling

Uses **Tailwind CSS** for styling:

```typescript
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// Dark mode support
<div className="bg-white dark:bg-gray-800">
  {/* Content */}
</div>
```

---

##  Data Fetching

### From Smart Contract

```typescript
import { readContract } from '@wagmi/core';
import TruthOracleV2ABI from '@/abis/TruthOracleV2.json';

const outcome = await readContract({
  address: process.env.NEXT_PUBLIC_ORACLE_ADDRESS,
  abi: TruthOracleV2ABI,
  functionName: 'getRichOutcome',
  args: [requestId]
});
```

### From IPFS

```typescript
import { fetchIPFS } from '@/lib/ipfs';

const certificate = await fetchIPFS(ipfsHash);
console.log(certificate);
// {
//   requestId, outcome, trace, sources, ...
// }
```

---

##  Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Docker

```bash
# Build image
docker build -t taas-dashboard .

# Run container
docker run -p 3000:3000 taas-dashboard
```

### Static Export

```bash
# Build static site
npm run build
npm run export

# Deploy to any static host
# Output in: /out
```

---

##  API Integration

### Backend API (Optional)

If running backend API:

```typescript
// lib/api.ts
export async function getProposals(filters) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/proposals`,
    { method: 'POST', body: JSON.stringify(filters) }
  );
  
  return response.json();
}
```

---

##  Mobile Responsive

All components are mobile-optimized:

```typescript
// Desktop: 3 columns
// Tablet: 2 columns
// Mobile: 1 column
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

---

##  Testing

```bash
# Run tests
npm test

# E2E tests
npm run test:e2e

# Visual regression
npm run test:visual
```

---

##  More Info

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev

---

**Beautiful UI for TaaS! **
