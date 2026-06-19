# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — Start dev server
- `npm run build` — Production build
- `npm test` — Run tests (Jest with jsdom)
- `npm run deploy` — Build and deploy to GitHub Pages via gh-pages

## Architecture

This is "The Bureau" — a personal portfolio site hosted at bjblayney.github.io. Create React App (react-scripts) with React 18.

### Routing

`AppRouter.js` uses **HashRouter** (not BrowserRouter) for GitHub Pages compatibility. Routes:
- `/` — Title page (TitlePage.js)
- `/contents` — Card grid table of contents (TableOfContents.js)
- `/chapter/:id` — Chapter detail pages (ChapterPage.js), renders embedded content for gallery/demo types
- `/work` — Work for Hire portfolio page (WorkPage.js)
- `/login` and `/admin` — Auth-protected admin for image uploads

### Content Model

`bookData.js` defines all portfolio items with fields:
- `priority`: `featured` (top billing), `standard`, or `grouped` (de-prioritized)
- `group`: `quizzes` groups items into a single muted card
- `type`: `gallery` (embedded Firestore images), `demo` (embedded component), `project` (external link), `work` (routes to /work)
- `label`: display tag shown on cards (e.g. "Gallery", "Portfolio", "Experiment")

### Visual Direction

**Block print / Hatch Show Print style.** Bold, high-contrast, poster-inspired. Think wood type, solid fills, stacked compositions — not delicate or minimal.

Key design elements:
- **Solid color blocks** — headings are reversed-out text (PAPER on UMBER) with solid aqua offset shadows (`box-shadow: N N 0 AQUA`), not transparent/blurred shadows
- **Thick borders** — cards use 2px solid UMBER borders with 6-10px top bars, not hairlines
- **Filled tags** — labels and type indicators are solid AQUA rectangles with PAPER text
- **Bold buttons** — solid UMBER fill, swap to AQUA on hover. No outlined/ghost buttons
- **Card hover** — lifts with `translate(-2px, -2px)` and grows the solid aqua offset shadow

### Palette

Defined as exports in `styles.js`:
- `TAUPE` (#C4B5A2) — page background
- `UMBER` (#2D1B0E) — primary text, borders, fills
- `AQUA` (#1A5E63) — accent color, offset shadows, tags, hover states
- `PAPER` (#FAFAF5) — card surfaces, reversed-out text
- `CARD_BG` (#D6CBBA) — muted surfaces (quiz group card)

Contrast rule: never use mid-tone grays or reduced opacity for text. UMBER on TAUPE, UMBER on PAPER, or PAPER on UMBER/AQUA.

### Key Patterns

- **Styling**: `styled-components` with shared primitives in `styles.js`. Local styled components in WorkPage.js. No CSS modules.
- **Animations**: `@react-spring/web` for page transitions (useSpring) and staggered card entry (useTrail).
- **Firebase**: Config in `firebase.js` reads from `REACT_APP_FIREBASE_*` env vars. Uses Firebase Auth (via `react-firebase-hooks`) and Firestore for image storage metadata.
- **External projects**: Quiz and game links point to separate GitHub Pages projects on the same domain (e.g. `/dev-reps/`, `/pick-two/`). These only resolve on the live site, not localhost.
