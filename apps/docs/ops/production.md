# Production Workflow Strategy

## 1. Cost Analysis
**Zero External Cost.**
Since you are using a **Self-Hosted Runner**:
-   You are using the CPU/RAM of the VPS you *already pay for*.
-   GitHub Actions is free for public repositories, and for private repositories, you get 2000 free minutes/month (for their hosted runners). **Self-hosted runners do not consume these minutes.**
-   **Total Extra Cost: $0.**

## 2. Safety Strategy: "The Golden Main"
To prevent crashing the production server (VPS), strict discipline is enforced via Git Workflow.

### The Branches
1.  **`main` (Production)**:
    -   **Rule**: NEVER push directly to `main`.
    -   **State**: Always stable, deployable code.
    -   **Action**: Pushing here *automatically triggers* the deployment on the VPS.
2.  **`develop` (or `staging`)**:
    -   **Rule**: This is your "working branch".
    -   **State**: Latest features, might be unstable.
    -   **Action**: Development happens here.

### The Workflow Loop
1.  **Code** on `develop` (or a feature branch like `feat/new-ui`).
2.  **Test** locally (`pnpm run build`, `pnpm test`).
3.  **Push** to `develop`.
4.  **Open Pull Request (PR)**: `develop` -> `main`.
    -   *Crucial Step*: GitHub can run "Checks" (like verification builds) on this PR *before* you merge.
    -   If the checks pass, you click **"Squash and Merge"**.
5.  **Deploy**: The merge to `main` triggers the Self-Hosted Runner on the VPS to pull and restart.

## 3. Implementation Plan

### A. Deployment Workflow (`.github/workflows/deploy.yml`)
We will create this file in your repos. It will **only** run when `main` processes a push.

```yaml
name: Production Deploy
on:
  push:
    branches: ["main"] # ONLY runs on main

concurrency: production_deploy # Prevents multiple deploys running at once

jobs:
  deploy:
    runs-on: [self-hosted, production]
    steps:
      - name: Checkout Code
        # We don't need to checkout if we are just running commands in the existing folder,
        # BUT for a clean history, the runner usually does its own checkout.
        # Strategy: Runner uses its own workspace, but we run the 'update' command 
        # on the ACTUAL app folder.
        run: echo "Starting Deployment..."

      - name: Deploy Backend
        run: |
          cd /home/oxisrael/prediction_market/prediction_app
          git fetch origin main
          git reset --hard origin/main
          pnpm install --frozen-lockfile
          # Build only the backend since VPS is backend-only
          pnpm run build --filter prediction-market-backend
          pm2 restart pm-backend
```

### B. Safety Check Workflow (`.github/workflows/ci.yml`)
This runs on **Pull Requests** to ensure you don't merge broken code.

```yaml
name: Safety Check
on:
  pull_request:
    branches: ["main"]

jobs:
  build_verify:
    runs-on: ubuntu-latest # Run on GitHub's servers (Free tier) to save VPS resources
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm run build --filter prediction-market-backend
```

## 4. Why this works for you
-   **Server safety**: The VPS only updates when you explicitly merge to `main`.
-   **Peace of mind**: The `ci.yml` tells you "Build Successful" allowed to merge.
-   **No "It works on my machine"**: The CI runner verifies the build in a neutral environment.
