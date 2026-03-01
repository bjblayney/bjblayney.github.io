# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — Start dev server
- `npm run build` — Production build
- `npm test` — Run tests (Jest with jsdom)
- `npm run deploy` — Build and deploy to GitHub Pages via gh-pages

## Architecture

This is "The Bureau" — a personal portfolio/landing page hosted at bjblayney.github.io. It's a Create React App (react-scripts) project using React 18.

### Routing

`AppRouter.js` uses **HashRouter** (not BrowserRouter) for GitHub Pages compatibility. Routes:
- `/` — Main tree menu (App.js)
- `/images` — Image gallery from Firestore (ImageLayout.js)
- `/gradient` — Gradient background demo (GradientBackground.js)
- `/login` and `/admin` — Auth-protected admin for image uploads

### Key Patterns

- **Animated tree menu**: The main UI (`App.js`) is a nested `Tree` component using `@react-spring/web` and `react-use-measure` for animated expand/collapse. Tree nodes can be plain text, links, or nested trees.
- **Styling**: Mix of `styled-components` (shared primitives in `styles.js`) and inline styles. No CSS modules.
- **Firebase**: Config in `firebase.js` reads from `REACT_APP_FIREBASE_*` env vars. Uses Firebase Auth (via `react-firebase-hooks`) and Firestore for image storage metadata.
- **Icons**: Custom SVG icon components in `icons.js`.
