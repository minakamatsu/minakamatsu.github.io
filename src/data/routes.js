// Plain data (no React) so vite.config.js can read it to write one HTML file per page.
import { projects } from './content.js'

export const HOME_TITLE = 'Min-Naing Akamatsu | FPV pilot and Purdue engineering student'
export const SITE_URL = 'https://minakamatsu.github.io/'

// Sections of the home page, in nav order
export const SECTIONS = [
  ['work', 'Work'],
  ['flying', 'Flying'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

// Addresses from the previous multi-page version, so old links still land somewhere sensible
export const LEGACY = {
  flying: 'flying',
  builds: 'work',
  engineering: 'work',
  research: 'work',
  experience: 'experience',
  skills: 'skills',
  about: 'skills',
  toolkit: 'skills',
  contact: 'contact',
}

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug)
export const projectTitle = (p) => `${p.title} | Min-Naing Akamatsu`

export function nextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
