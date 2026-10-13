import { LEGACY, projectBySlug } from '../data/routes'

// Real paths on GitHub Pages: / for home, /work/<slug>/ for a project.
// The build writes an index.html into each project folder so every link loads directly.
// The single-file preview build sets VITE_ROUTER=hash and uses #/work/<slug> instead.
const HASH = import.meta.env.VITE_ROUTER === 'hash'
const BASE = import.meta.env.BASE_URL

// { page: 'home', section? } or { page: 'project', slug }
export function readRoute() {
  const raw = HASH ? location.hash.replace(/^#\/?/, '') : location.pathname.slice(BASE.length)
  const parts = raw.split(/[?#]/)[0].split('/').filter(Boolean)
  if (parts[0] === 'work' && parts[1] && projectBySlug(parts[1])) return { page: 'project', slug: parts[1] }
  if (parts[0] && LEGACY[parts[0]]) return { page: 'home', section: LEGACY[parts[0]], legacy: true }
  const section = HASH ? undefined : location.hash.replace(/^#/, '') || undefined
  return { page: 'home', section }
}

export function hrefFor(target) {
  if (target.page === 'project') return HASH ? `#/work/${target.slug}` : `${BASE}work/${target.slug}/`
  if (HASH) return '#/'
  return `${BASE}${target.section ? `#${target.section}` : ''}`
}

export function pushRoute(target) {
  if (HASH) {
    const h = target.page === 'project' ? `#/work/${target.slug}` : '#/'
    if (location.hash !== h) location.hash = h
  } else {
    history.pushState(null, '', hrefFor(target))
  }
}

export function replaceRoute(target) {
  if (!HASH) history.replaceState(null, '', hrefFor(target))
}

export const routeEvent = HASH ? 'hashchange' : 'popstate'
export const sameRoute = (a, b) => a.page === b.page && a.slug === b.slug
