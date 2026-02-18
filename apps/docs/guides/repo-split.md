# Repo Splitting Guide: Public Frontend, Private Backend

**Goal:** Publish your Frontends to Vercel (Public Repos) while keeping your Backends secure in your private Mono-repos.

**Method:** "Git Subtree Push".
This allows you to keep your current folder structure exactly as it is, but push *copy* of the frontend folder to a separate GitHub repository.

---

## 1. Preparation (GitHub Website)
Go to GitHub and create two **NEW, PUBLIC** repositories. Do *not* initialize them with README/gitignore. Just empty repos.

1.  **Name:** `prediction_market_frontend` (for Main App)
2.  **Name:** `Taas_fronted` (for Dashboard)

---

## 2. Split `prediction_app` (Frontend)

Run these commands in your terminal:

```bash
# Go to your existing repo
cd ~/prediction_market/prediction_app

# 1. Add the new public repo as a "remote"
git remote add public-ui https://github.com/Friehub/prediction_market_frontend.git

# 2. Push ONLY the 'frontend' folder to the 'main' branch of the new repo
git subtree push --prefix frontend public-ui main
```

**Result:**
*   Your `prediction_app` repo stays exactly the same (Private, Monorepo).
*   The `prediction-market-ui` repo now contains *only* the code from your `frontend` folder.
*   The root of `prediction-market-ui` will be the contents of `frontend` (so `package.json` is at the top level). **Perfect for Vercel.**

---

## 3. Split `taas-private` (Dashboard)

```bash
# Go to your existing repo
cd ~/prediction_market/taas-private

# 1. Add the new public repo as a "remote"
git remote add public-dashboard https://github.com/Friehub/Taas_fronted.git

# 2. Push ONLY the 'dashboard' folder to the 'main' branch of the new repo
git subtree push --prefix dashboard public-dashboard main
```

---

## 4. Connect Vercel
1.  Go to Vercel.
2.  Import Project.
3.  Select the **New Public Repos** (`prediction-market-ui` and `taas-dashboard`).
4.  **Framework Preset:** Next.js (It should detect it automatically since `package.json` is now at the root).
5.  **Environment Variables:** Add your `NEXT_PUBLIC_API_URL` etc. here.

---

## 5. How to Update in the Future
You continue working in your normal folders (`prediction_app` / `taas-private`).

When you want to deploy a frontend change:
1.  Commit changes locally as usual.
2.  Run the push command again:
    ```bash
    # For Main App
    git subtree push --prefix frontend public-ui main

    # For Dashboard
    git subtree push --prefix dashboard public-dashboard main
    ```
    *(You can save these as scripts in `package.json` to make it easier!)*
