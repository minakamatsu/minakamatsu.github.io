import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PAGES, pageTitle } from './src/data/routes.js'

const SITE = 'https://minakamatsu.github.io/'

// Every page gets its own folder with a copy of index.html (dist/flying/index.html, ...),
// so minakamatsu.github.io/flying/ loads directly, refreshes fine, and shares with the
// right title. 404.html sends any unknown address to the home page.
function pageFiles() {
  return {
    name: 'page-files',
    apply: 'build',
    closeBundle() {
      if (process.env.VITE_ROUTER === 'hash') return
      const html = readFileSync('dist/index.html', 'utf8')
      for (const page of PAGES) {
        const title = pageTitle(page)
        const out = html
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(property="og:title" content=")[^"]*"/, `$1${title}"`)
          .replace(/(property="og:url" content=")[^"]*"/, `$1${SITE}${page.id}/"`)
        mkdirSync(`dist/${page.id}`, { recursive: true })
        writeFileSync(`dist/${page.id}/index.html`, out)
      }
      writeFileSync('dist/404.html', html)
    },
  }
}

// base '/' because pages live in subfolders; the site must be served from the
// root of minakamatsu.github.io (the user site repo), which it is.
export default defineConfig({
  base: process.env.VITE_ROUTER === 'hash' ? './' : '/',
  plugins: [react(), pageFiles()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
