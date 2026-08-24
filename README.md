# Dev Questionnaire Lab

A hands-on, build-it-yourself study app covering **every question** in the front-end developer questionnaire. Instead of just reading answers, you run and edit them: live JavaScript and React playgrounds, interview-ready explanations, and a self-check quiz per topic.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173). It opens automatically.

To make a production build:

```bash
npm run build && npm run preview
```

## Run it on CodeSandbox / iPad

This is a standard Vite project, so it imports straight into CodeSandbox:

1. In CodeSandbox, choose **Import** and upload this folder (or the zip), or import it from a GitHub repo.
2. It auto-detects Vite and runs `npm install` + `npm run dev` for you — the app boots in the preview pane, playgrounds included.

To get it onto GitHub, the simplest route is CodeSandbox's built-in GitHub export ("Create Repository" / "Export to GitHub") — it creates the repo and pushes in one step. Or push manually from a computer with git:

```bash
git init
git add .
git commit -m "Dev Questionnaire Lab"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

> The React playgrounds load Babel from a CDN, so rendering a React demo needs an internet connection.

## What's inside

**33 topics across 8 sections**, in questionnaire order:

- **HTML & CSS** — Flexbox, Bootstrap vs Tailwind
- **Core JavaScript** — var/let/const, ==/===, hoisting, closures, the event loop, promises & async/await, map/filter/reduce, spread/rest, debounce/throttle
- **React Fundamentals** — virtual DOM, hooks, props vs state, controlled/uncontrolled, useState, useEffect
- **Advanced React** — Context API, optimizing components, optimizing re-renders, large-app architecture, Redux & state libraries, dynamic routing, app-wide performance
- **Frameworks & Tooling** — Next.js (SSR/SSG/ISR)
- **Testing** — test pyramid, testing in production, Vitest + RTL
- **TypeScript** — TS vs JS
- **Coding Challenges** — reverse a string, fetch & list users

Each topic has three parts: **read the concept → run the code → test yourself.**

## How the playgrounds work

- **JS playground** (`src/playgrounds/JsPlayground.jsx`) runs your code in a sandboxed async function with `console.*` captured into an output panel. Top-level `await` and real `fetch` calls work — the promises, event-loop, and async/await topics execute for real.
- **React playground** (`src/playgrounds/ReactPlayground.jsx`) compiles the JSX you write with Babel standalone (loaded via CDN in `index.html`) and mounts the resulting `App` component into a live preview. Define a component named `App` and hit **Render**. Hooks (`useState`, `useEffect`, `useRef`, `useReducer`, `useCallback`, `useMemo`, `useContext`, `createContext`) are all in scope.

Edit any playground, break it on purpose, re-run it — that's the fastest way to make the answers stick.

## Editing content

All topic content is authored as data in `src/data/topics-1.js` … `topics-4.js`. Each block is `{ type: 'p' | 'ul' | 'h2' | 'callout' | 'js' | 'react' | 'quiz', ... }`. Add or edit a topic there and it appears in the sidebar automatically.

## Progress

Topics you mark "understood" are saved in `localStorage`, and the sidebar tracks your completion percentage.

## Project structure

```
src/
  App.jsx                  sidebar, progress, home, topic view, nav
  components/
    Blocks.jsx             maps content-block data → UI
    Quiz.jsx               self-check quiz with feedback
  playgrounds/
    JsPlayground.jsx       editable JS runner + console capture
    ReactPlayground.jsx    JSX → Babel → live preview
  data/
    topics.js             combines sections, builds sidebar groups
    topics-1..4.js        the syllabus content
  styles.css              visual system
```

## Styling

The colour tokens, the accent rules and the contrast floor are documented in
[STYLE.md](STYLE.md). Read it before you change [src/styles.css](src/styles.css).

This app uses the shared paper/phosphor token system: one `light-dark()` value
per colour, e-ink paper in the light scheme and CRT phosphor in the dark one. It
follows the reader's operating system appearance — there is no in-app switch.

[tools/contrast-audit.py](tools/contrast-audit.py) checks every colour against
the surface it lands on. It must exit 0 before you commit a stylesheet change:

```bash
python3 tools/contrast-audit.py src/styles.css
```

## Deploy to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and publishes on every push to `master`. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. The site is then served at `https://<user>.github.io/dev-questionnaire-lab/`.

GitHub Pages serves a project site from `https://<user>.github.io/<repo>/`, so the build sets Vite's `base` to that subpath. The repo name comes from `GITHUB_REPOSITORY` in Actions. Set `BASE_PATH` to override it — use `BASE_PATH=/` for a custom domain.

The React playground compiles student-written JSX in the browser using Babel, loaded from a CDN in `index.html`. The deployed site depends on that CDN staying reachable.
