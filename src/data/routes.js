// One entry per page. `channel` is the Raceband channel shown on the home page.
// Plain data (no React) so vite.config.js can read it to generate the page files.
export const ROUTES = [
  { id: '', label: 'Home', title: 'Min-Naing Akamatsu | FPV pilot and Purdue engineering student' },
  {
    id: 'flying',
    label: 'Flying',
    channel: ['R1', '5658'],
    teaser: 'Racing FPV for Purdue in the Collegiate Drone Racing Association.',
  },
  {
    id: 'builds',
    label: 'Builds',
    channel: ['R2', '5695'],
    teaser: "DraftMyDrone, Accelerator OS and other software I've designed and shipped.",
  },
  {
    id: 'engineering',
    label: 'Engineering',
    channel: ['R3', '5732'],
    teaser: 'Quads on the NSDS drone team, RDE research, jet engine parts, VEX and FTC.',
  },
  {
    id: 'experience',
    label: 'Experience',
    channel: ['R4', '5769'],
    teaser: 'LaunchPad, drone racing, NSDS, freelance web work, education and honors.',
  },
  {
    id: 'about',
    label: 'About',
    channel: ['R5', '5806'],
    teaser: 'My toolkit, and what I do off the sticks.',
  },
  {
    id: 'contact',
    label: 'Contact',
    channel: ['R6', '5843'],
    teaser: 'Email, LinkedIn, GitHub and my resume.',
  },
]

export const PAGES = ROUTES.filter((r) => r.id)
export const pageTitle = (r) => (r.id ? `${r.label} | Min-Naing Akamatsu` : r.title)
