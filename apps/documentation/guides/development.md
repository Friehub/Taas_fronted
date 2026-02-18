# TaaS Development Workflow Guide

**Goal:** Maintain stability in `main` (Production) while allowing rapid iteration in `dev`.

## 1. The Golden Rule
**Never push directly to `main`.**
*   `main` = Production Code (Auto-Deploys to VPS).
*   `dev` = Staging / Active Development.

## 2. Setting Up Local Environment
You should generally work on the `dev` branch locally.

```bash
# For each repository (prediction_app, taas-core, taas-private)
git checkout dev
git pull origin dev
```

## 3. Daily Workflow (The "Feature" Cycle)

### Step A: Start a New Feature
1.  Make sure you are on `dev` and up to date.
    ```bash
    git checkout dev
    git pull origin dev
    ```
2.  Create a feature branch (optional but recommended for teams), OR just commit to `dev` if you are a solo dev/small team.
    *   *Solo Mode:* Just work on `dev`.
    *   *Team Mode:* `git checkout -b feat/my-new-feature`

### Step B: Commit & Push
1.  Make your changes.
2.  Test locally (run builds, check UI).
3.  Push to `dev`.
    ```bash
    git add .
    git commit -m "feat: added cool dashboard widget"
    git push origin dev
    ```
    *Note: Pushing to `dev` does NOT trigger a deployment to the VPS.*

### Step C: Deploying to Production (The "Release")
When you are ready to ship your changes to the world:

1.  **Go to GitHub**.
2.  **Open a Pull Request**.
    *   **Base:** `main`
    *   **Compare:** `dev`
3.  **Review Changes**: Check the file diffs one last time.
4.  **Merge Pull Request**.
5.  **Watch the Magic**:
    *   Merging to `main` triggers the **GitHub Action**.
    *   The Runner on your VPS wakes up.
    *   It pulls the new code from `main`.
    *   It installs dependencies, builds, and restarts PM2.
    *   **Live in ~2 minutes!** 🚀

## 4. Hotfixes (Emergency Fixes)
If Production is broken and you can't wait for `dev` to be merged:

1.  Checkout `main`.
    ```bash
    git checkout main
    git pull origin main
    ```
2.  Create a hotfix branch.
    ```bash
    git checkout -b hotfix/critical-bug
    ```
3.  Fix the bug.
4.  Push and Merge to **BOTH** `main` (to fix prod) AND `dev` (so it doesn't come back).

## 5. Summary of Branches

| Branch | Identity | Auto-Deploy? | protection |
| :--- | :--- | :--- | :--- |
| **`main`** | Production | **YES** (to VPS) | **Protected** (PR only recommended) |
| **`dev`** | Staging / Work | **NO** | Open |

---
**Authentication Reminder:**
Your VPS has `.env` files that Git ignores.
*   If you add a new generic secret (API Key), add it to `.env` on the VPS manually!
*   If you add a standard config (Port number), commit it to code.
