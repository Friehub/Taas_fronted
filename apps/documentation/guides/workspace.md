# FrieHub Workspace Guide

This guide explains how to manage your 5 separate repositories using the new Multi-Root Workspace setup.

## 1. How to Open the Workspace

1.  Open VS Code.
2.  Go to `File` -> `Open File...`.
3.  Select `friehub.code-workspace` in your root folder.
4.  **Click "Open Workspace"**.

**Benefits:**
*   You will see 5 distinct folders in your "Explorer" sidebar.
*   VS Code's "Source Control" tab will show 5 separate "Git" sections.
*   You can commit, push, and pull for each repo individually within the same window.

## 2. Directory Structure

*   `prediction_app` (Private Backend Monorepo)
*   `taas-core` (TaaS Protocol)
*   `taas-private` (Dashboard Backend)
*   `prediction_market_frontend` (Public Main App UI) - *Cloned from GitHub*
*   `Taas_fronted` (Public Dashboard UI) - *Cloned from GitHub*

## 3. How to Sync All Repos

Instead of running `git pull` in 5 different folders, simply run the sync script:

```bash
./sync-all.sh
```

This will iterate through all 5 folders and pull the latest changes from GitHub.

## 4. Frontend Development

To work on the frontend:
1.  Open the workspace.
2.  Make changes in `prediction_market_frontend` or `Taas_fronted` folder.
3.  Use the Source Control tab to stage and commit changes.
4.  Push to `main`.
5.  Vercel will automatically deploy the new code.

## 5. IMPORTANT: Dual Frontend Folders
You now have **two copies** of the frontend code:
1.  `prediction_app/frontend` (Inside the private backend repo)
2.  `prediction_market_frontend` (The standalone public repo)

**These are NOT automatically synced.**
*   If you edit files in `prediction_app/frontend`, the public repo (and Vercel) **will not update**.
*   **Recommendation:** Always work in the new **`prediction_market_frontend`** (or `Taas_fronted`) folder for UI changes. This ensures your changes go straight to the public repo and deploy to Vercel.
