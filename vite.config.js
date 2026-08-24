import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is the URL path the built site is served from, and it is baked into
// every asset link at build time. GitHub Pages serves a project site from
// https://<user>.github.io/<repo>/, so the build must know the repo name.
//
//   - In GitHub Actions, GITHUB_REPOSITORY is "owner/repo" — take the repo half.
//   - Set BASE_PATH to override it, e.g. "/" when using a custom domain.
//   - Falling back to the repo name keeps a plain local `npm run build` correct.
//
// Local dev always serves from "/", so only the build gets a prefix.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const buildBase = process.env.BASE_PATH || `/${repoName || 'dev-questionnaire-lab'}/`

export default defineConfig(({ command }) => ({
  base: command === 'build' ? buildBase : '/',
  plugins: [react()],
  server: { port: 5173, open: true }
}))
