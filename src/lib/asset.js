// Resolves files in /public so they work on any GitHub Pages path.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
