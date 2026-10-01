import { ROUTES } from '../data/routes'

// Real paths (/flying/) on GitHub Pages. The build writes a copy of index.html
// into each page folder, so every URL loads directly and shares cleanly.
// The single-file preview build sets VITE_ROUTER=hash and uses #/flying instead.
const HASH = import.meta.env.VITE_ROUTER === 'hash'
const BASE = import.meta.env.BASE_URL

export function readRoute() {
  const raw = HASH ? location.hash.replace(/^#\/?/, '') : location.pathname.slice(BASE.length)
  const id = raw.split(/[/?#]/)[0]
  return ROUTES.some((r) => r.id === id) ? id : ''
}

export const hrefFor = (id) => (HASH ? `#/${id}` : `${BASE}${id ? `${id}/` : ''}`)

export function pushRoute(id) {
  if (HASH) location.hash = `/${id}`
  else history.pushState(null, '', hrefFor(id))
}

export const routeEvent = HASH ? 'hashchange' : 'popstate'
