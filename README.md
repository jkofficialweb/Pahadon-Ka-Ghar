# Pahadon Ka Ghar — Mountain Retreat Kashmir

> **"Your Home in the Mountains, Where Every Guest Is Special"**  
> Located at Hariganiwan, Kangan, Ganderbal, Old Sonamarg Road, Jammu & Kashmir (Altitude 2,100 m, 32 km from Sonamarg, 350m walk to Sindh River).

---

## 🛠️ GitHub & GitHub Pages Compatibility Fixes

If you encountered a **blank page** after uploading or deploying this project to GitHub or GitHub Pages, this repository has been configured with the following production fixes:

1. **Relative Base Path (`base: './'`) in `vite.config.ts`**:
   - Standard Vite projects default to `base: '/'`. When deployed on GitHub Pages (`https://<username>.github.io/<repo-name>/`), absolute links like `/assets/index-xxx.js` 404 because the browser requests them from the domain root instead of your repository folder.
   - Setting `base: './'` ensures all bundled JS, CSS, and asset links are relative and load reliably regardless of your repository name or custom domain.

2. **Jekyll Processing Bypassed (`.nojekyll`)**:
   - Added `.nojekyll` to the root and `/public` directories. GitHub Pages defaults to Jekyll, which drops files and folders starting with underscores or special characters. `.nojekyll` tells GitHub Pages to serve all static Vite assets directly.

3. **Single Page Application 404 Fallback (`public/404.html`)**:
   - Added a SPA redirect script in `public/404.html`. If a visitor refreshes on a subpath or deep link, GitHub Pages redirects back to `index.html` while preserving URL hash and queries, eliminating blank 404 pages.

4. **Asset Path Normalization (`src/utils/assets.ts`)**:
   - All hotel photos, gallery views, trekking trails, and Wazwan menu images are hosted under `public/assets/` and resolved via `getAssetUrl()`. This guarantees images load without 404 errors across both local dev and production GitHub subpaths.

5. **React Error Boundary (`src/components/ErrorBoundary.tsx`)**:
   - Wrapped the entire application mount with a graceful Error Boundary in `src/main.tsx`. If an unexpected error or storage failure occurs on an older browser, the application displays a mountain retreat recovery screen with a "Reload" and "Reset" button instead of a blank white screen.

6. **Automatic GitHub Pages Deployment Workflow (`.github/workflows/deploy.yml`)**:
   - A ready-to-run GitHub Actions workflow that automatically runs unit tests, compiles the production bundle (`npm run build`), and deploys directly to GitHub Pages on every push to `main` or `master`.

---

## 🚀 How to Deploy on GitHub Pages

### Option A: Via GitHub Actions (Recommended)
1. Push this repository to your GitHub account (`main` or `master` branch).
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!

### Option B: Via Deploy from Branch
1. Run `npm run build` locally.
2. Publish the `dist` folder to a `gh-pages` branch.
3. In repository **Settings** → **Pages**, select **Deploy from a branch** and choose `gh-pages` / `/(root)`.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run unit test suite (Node built-in runner)
npm test # or: npx tsx --test src/utils/*.test.ts

# 3. Start local development server
npm run dev

# 4. Build and preview production bundle
npm run build
npm run preview
```

---

## 📞 Property Contact Information

- **Address**: Hariganiwan, Kangan, Ganderbal, Old Sonamarg Road, Jammu & Kashmir, 191202
- **Direct Reservations**: `+91 94699 19558` / `+91 95963 21510`
- **Email**: `khandayjeelani00@gmail.com`
- **Google Maps Pin**: [https://share.google/IPvR3GgrQvLpcwsgq](https://share.google/IPvR3GgrQvLpcwsgq)
