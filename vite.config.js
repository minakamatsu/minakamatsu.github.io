import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/data/content.js'
import { LEGACY, SITE_URL, projectTitle } from './src/data/routes.js'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Every project gets its own folder with a copy of index.html (dist/work/draftmydrone/index.html),
// so minakamatsu.github.io/work/draftmydrone/ loads directly, refreshes fine, and shares with
// its own title and description. Old page addresses get a copy too and jump to the right section.
function pageFiles() {
  return {
    name: 'page-files',
    apply: 'build',
    closeBundle() {
      if (process.env.VITE_ROUTER === 'hash') return
      const html = readFileSync('dist/index.html', 'utf8')
      const write = (dir, out) => {
        mkdirSync(`dist/${dir}`, { recursive: true })
        writeFileSync(`dist/${dir}/index.html`, out)
      }
      for (const p of projects) {
        const title = esc(projectTitle(p))
        const desc = esc(p.summary)
        write(
          `work/${p.slug}`,
          html
            .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
            .replace(/(name="description"\s+content=")[^"]*"/, `$1${desc}"`)
            .replace(/(property="og:title" content=")[^"]*"/, `$1${title}"`)
            .replace(/(property="og:description" content=")[^"]*"/, `$1${desc}"`)
            .replace(/(property="og:url" content=")[^"]*"/, `$1${SITE_URL}work/${p.slug}/"`),
        )
      }
      for (const old of Object.keys(LEGACY)) write(old, html)
      writeFileSync('dist/404.html', html)
    },
  }
}

// base '/' because pages live in subfolders; the site is served from the root of
// minakamatsu.github.io (the user site repo).
export default defineConfig({
  base: process.env.VITE_ROUTER === 'hash' ? './' : '/',
  plugins: [react(), pageFiles()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
