# Pahadon Ka Ghar — Mountain Retreat Kashmir

> **"Your Home in the Mountains, Where Every Guest Is Special"**  
> Located at Hariganiwan, Kangan, Ganderbal, Old Sonamarg Road, Jammu & Kashmir (Altitude 2,100 m, 32 km from Sonamarg, 350m walk to Sindh River).  
> Custom Domain: **`pahadonkaghar.com`**

---

## 🛠️ Why GitHub Pages Showed a Blank White Page & How It's Fixed

If you encountered a **blank white page** after uploading or deploying this project to GitHub Pages, the root causes were:

1. **Unresolved Imports from Deleted Files**:
   - `OfflineIndicator.tsx` and `PWAInstallButton.tsx` were imported in `App.tsx` and `Navbar.tsx` after the files were deleted. This caused the TypeScript compiler and Vite to throw module errors during build and browser runtime, preventing React from mounting.
   - All dangling imports and plugins have been removed cleanly.

2. **`vite-plugin-pwa` Build Failure**:
   - The PWA plugin was attempting to bundle missing icons and threw missing module errors. `vite.config.ts` has been restored to a clean, fast configuration with `base: './'`.

3. **Relative Base Path (`base: './'`)**:
   - Standard Vite projects default to `base: '/'`. When deployed on GitHub Pages (`https://<username>.github.io/<repo-name>/`), absolute links like `/assets/index-xxx.js` 404 because the browser requests them from the domain root instead of the repository directory.
   - Setting `base: './'` ensures all bundled JS, CSS, and asset links are relative and work on both custom domains (`pahadonkaghar.com`) and GitHub repository subpaths.

4. **Missing CNAME in Build Folder**:
   - The user added `CNAME` for `pahadonkaghar.com` at the root, but Vite only bundles files from `public/`. We copied `CNAME` into `public/CNAME` and `docs/CNAME` so it is included in all builds.

5. **Jekyll Processing Bypassed (`.nojekyll`)**:
   - Added `.nojekyll` to the root, `/public`, and `/docs` directories so GitHub Pages serves raw Vite build assets directly without running Jekyll.

6. **Single Page Application 404 Fallback (`404.html`)**:
   - Added a SPA redirect script in `public/404.html` and `docs/404.html`. If a visitor refreshes on a subpath or deep link, GitHub Pages redirects back to `index.html` while preserving URL hash and queries.

7. **Pre-Built `/docs` Directory for 1-Click Branch Deployment**:
   - GitHub Pages only allows selecting `/(root)` or `/docs` when deploying from a branch. We configured the build to automatically output the production bundle into `/docs/`.

---

## 🚀 How to Deploy on GitHub Pages (Choose Option 1 or 2)

### Option 1: Deploy from Branch via `/docs` (Easiest — 1 Minute)
This is the most reliable and immediate method:
1. Push all files to your GitHub repository (`main` branch).
2. On GitHub, go to your repository **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select **`main`**
   - **Folder**: Select **`/docs`** (click Save)
4. Under **Custom domain**:
   - Enter: `pahadonkaghar.com` (click Save)
5. Done! Your website is live within 30 seconds at `https://pahadonkaghar.com` with NO blank pages!

### Option 2: Deploy via GitHub Actions (Automated CI/CD)
1. On GitHub, go to your repository **Settings** → **Pages**.
2. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
3. The included `.github/workflows/deploy.yml` workflow will automatically run tests, build the bundle, and publish your site on every push.

---

## 💻 Local Development & Build

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run unit test suite
npm test

# 3. Start local development server
npm run dev

# 4. Build production bundle (syncs to both dist/ and docs/)
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## 📞 Property Contact Information

- **Address**: Hariganiwan, Kangan, Ganderbal, Old Sonamarg Road, Jammu & Kashmir, 191202
- **Direct Reservations**: `+91 94699 19558` / `+91 95963 21510`
- **Email**: `khandayjeelani00@gmail.com`
- **Google Maps Pin**: [https://share.google/IPvR3GgrQvLpcwsgq](https://share.google/IPvR3GgrQvLpcwsgq)
