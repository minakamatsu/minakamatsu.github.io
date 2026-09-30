// Everything written on the site lives in this file.
// Edit text here and the page updates. Image paths point inside /public.

export const site = {
  first: 'Min-Naing',
  last: 'Akamatsu',
  short: 'Min Akamatsu',
  callsign: 'MIN',
  email: 'makamats@purdue.edu',
  linkedin: 'https://www.linkedin.com/in/minakamatsu',
  github: 'https://github.com/minakamatsu',
  resume: 'resume.pdf',
  heroLine:
    "First-year engineering student at Purdue and FPV racer on the university's drone racing team. I'm looking for a summer 2027 internship building unmanned systems.",
}

export const flying = {
  lede: 'I race FPV for Purdue in the Collegiate Drone Racing Association.',
  body: [
    "Since the season started I've held the third-fastest spot in our team standings. Most of that comes from over 100 hours in the simulator, drilling racing lines, throttle control and precise maneuvering at speed.",
    'Off the course I help with the practical side of running a team: equipment setup, race strategy, organizing practices, and managing RF interference when analog FPV and DJI systems are flying in the same space.',
    'The scheduling and flight-time problems I kept running into at practice turned into my LaunchPad project, which I cover under Work.',
  ],
  photo: {
    src: 'images/fpv-racing.jpg',
    alt: 'Min at a Purdue drone racing practice',
  },
  // Rendered like a Betaflight post-flight stats screen
  stats: [
    ['Team rank', 'P3'],
    ['Sim time', '100+ h'],
    ['League', 'CDRA'],
    ['Team', 'Purdue'],
    ['On team since', 'Aug 2026'],
  ],
}

export const research = [
  {
    id: 'rde',
    title: 'Rotating detonation engines',
    when: '2023 to 2025',
    where: 'Jericho Science Research Program',
    body:
    [
      'I studied how fuel choice trades off against performance in rotating detonation engines. An RDE burns its mixture in a detonation wave that circles an annular chamber thousands of times per second, which promises higher efficiency from a mechanically simple engine.',
      'I modeled detonation properties for candidate fuels in Python with Cantera and SDToolbox, working with Chapman–Jouguet velocity and pressure, ZND structure and cell size. Comparing fuels fairly turned out to be the hard part, because performance and environmental metrics do not sit on one scale, so the analysis moved toward a multivariate comparison.',
    ],
    tags: ['Python', 'Cantera', 'SDToolbox', 'Detonation modeling'],
    schematic: 'rde',
    image: 'images/rde.jpg', // optional: drop a real figure here and it replaces the drawing
  },
  {
    id: 'jet',
    title: 'Jet engine components in CAD',
    when: 'Personal project',
    where: 'Ongoing since middle school',
    body:
      "I've been modeling jet engines since middle school. On my most recent one I designed the combustion chamber and the centrifugal compressor in CAD, working through blade count, passages and chamber volume part by part, then 3D printed the compressor.",
    tags: ['CAD', 'Turbomachinery', 'Propulsion'],
    schematic: 'jet',
    image: 'images/jet-engine.jpg',
  },
]

export const otherBuilds = [
  ['Next-Gen Up', 'Chief of Engineering for a group of high school students working on problems around our neighborhood.'],
  ['Columbia SHAPE', 'Selective summer engineering program on Columbia’s campus in 2023, environmental engineering track with hands-on lab work.'],
]

// Software. `learned` is left empty on purpose: write it in your own words
// and it shows up under the project. `image` replaces the drawing if the file exists.
export const builds = [
  {
    id: 'draftmydrone',
    feature: true,
    title: 'DraftMyDrone',
    when: 'Apr 2026 – Present',
    where: 'FPV build planner, live',
    body: [
      "FPV parts that are each fine on their own can still add up to a quad that doesn't work: a stack that won't mount to the frame, a battery the ESC can't take, a camera from one video system and goggles from another. DraftMyDrone is a build planner that catches those before you buy.",
      'You fill nine slots from frame to goggles, filtered by flight style. Underneath is a rules engine that checks frame and stack mounting patterns, battery cell count against the stack and motor limits, high-KV motors on 6S, one video system across VTX, camera and goggles, and prop size against the frame. Every error, warning and note takes points off a 100-point compatibility score.',
      'It also estimates all-up weight, thrust, thrust-to-weight and a rough flight time, and labels them as approximations. Builds save to an account, share by link, or export as CSV. The compatibility engine and the physics have their own automated tests.',
    ],
    tags: ['Next.js', 'TypeScript', 'Postgres', 'Clerk', 'Vitest'],
    links: [['draftmydrone.com', 'https://draftmydrone.com']],
    drawing: 'buildcheck',
    image: 'images/draftmydrone.jpg',
    learned: '',
  },
  {
    id: 'accelerator',
    title: 'Accelerator OS',
    when: 'Aug 2026 – Present',
    where: 'Back end for my client sites',
    body: [
      'The auto shop sites I build each load a small tracker, and Accelerator OS turns that into a simple dashboard for the owner: visits, estimate requests, and taps on call, directions and contact. A click is reported as a click, never relabeled as a lead or revenue.',
      "It's multi-tenant, so the core job is making sure a shop only ever sees its own data. The server derives the tenant instead of trusting the browser, Postgres row-level security backs that up, and tests cover the boundaries. Estimate forms go through validation, consent, spam checks and rate limits, then a notification worker with retries emails the shop.",
      "One production deploy failed because blank optional environment variables were read as configured. I fixed the validation, derived URLs from Vercel's system variables, and added regression tests for it.",
    ],
    tags: ['Next.js', 'Supabase', 'Row-level security', 'Vitest'],
    links: [['GitHub', 'https://github.com/minakamatsu/Accelerator-OS']],
    drawing: 'tenants',
    image: 'images/accelerator-os.jpg',
    learned: '',
  },
  {
    id: 'mypetcat',
    title: 'Desktop Cat',
    when: 'May 2026',
    where: 'Native desktop app',
    body: [
      'Up to eight pixel cats live along the bottom of your screen. They walk, nap and react to clicks, stay on top of other windows, and walk back to the bottom after you drag them somewhere.',
      "It's built on Tauri 2, so it runs as a native app with a Rust core instead of in a browser tab. Inside is a behavior state machine, a sprite animator fed by an Aseprite export script, tray controls, saved settings and launch at startup, packaged as a Windows installer and a Mac build.",
    ],
    tags: ['Tauri', 'Rust', 'TypeScript'],
    links: [
      ['Download', 'https://mypetcat.vercel.app'],
      ['GitHub', 'https://github.com/minakamatsu/mypetcat'],
    ],
    drawing: 'cat',
    image: 'images/desktop-cat.gif',
    learned: '',
  },
]

export const moreBuilds = [
  ['FrontRow', 'Three versions of a marketplace for short paid live sessions between fans and creators. It started as a sealed-bid auction, added a chance-based entry mode, and ended up as fixed-price booking with waiting rooms and proportional refunds.'],
  ['BuffMeNerfThem', 'Weekly buff and nerf voting on Overwatch heroes, so balance feedback arrives as structured data instead of forum threads. The database allows one vote per hero per week, and row-level security keeps individual votes private while the leaderboard shows totals.'],
  ['Photo booking site', 'Portfolio and booking site for a photographer, with Square checkout and a payment webhook that is safe to receive twice.'],
  ['3D printing community', 'A forum and model library for hobbyists, with STL, OBJ, 3MF and G-code uploads, voting and moderator roles.'],
]

// Optional CAD gallery. Add renders to public/images/ with these names.
// The section only appears once at least one image exists.
export const cadGallery = [
  { src: 'images/cad-1.jpg', caption: '' },
  { src: 'images/cad-2.jpg', caption: '' },
  { src: 'images/cad-3.jpg', caption: '' },
  { src: 'images/cad-4.jpg', caption: '' },
  { src: 'images/cad-5.jpg', caption: '' },
  { src: 'images/cad-6.jpg', caption: '' },
]

export const work = [
  {
    when: 'Sep 2026 – Present',
    org: 'Purdue LaunchPad',
    role: 'Mentee in a selective entrepreneurship program',
    points: [
      'Selected for a competitive program with roughly a 30% acceptance rate.',
      'Building a software concept for the scheduling and flight-time coordination problems I see in collegiate drone racing.',
      'Running customer discovery, validating what teams actually need, and prototyping scheduling workflows.',
    ],
  },
  {
    when: 'Aug 2026 – Present',
    org: 'Purdue Collegiate Drone Racing',
    role: 'FPV drone racer, Collegiate Drone Racing Association',
    points: [
      'Consistently ranked third-fastest in team standings since the start of the season.',
      '100+ hours of simulator practice on racing lines, throttle control and precision maneuvering.',
      'Work with other pilots on equipment setup, race strategy, practice organization and RF interference between FPV and DJI systems.',
    ],
  },
  {
    when: 'Jul 2026 – Present',
    org: 'Independent web development',
    role: 'Freelance web developer, Long Island',
    links: [
      ['West John Auto', 'https://github.com/minakamatsu/West-John-Auto'],
      ["Sam's Auto Care", 'https://github.com/minakamatsu/Sams-s-Auto-Care'],
    ],
    points: [
      'Design and deploy websites for independent auto repair shops in Westbury and Hicksville, built phone-first with a sticky call bar, tap-to-call and directions.',
      'Track calls, directions and review clicks, and feed them into Accelerator OS, the client dashboard I built for these sites.',
      'Handle hosting, deployment, maintenance and client communication.',
    ],
  },
  {
    when: 'Feb 2024 – Jan 2026',
    org: 'Coast-2-Coast VEX Robotics',
    role: 'CAD designer, builder and scout',
    points: [
      'Won the 2025 VEX Robotics New York Southern State Championship.',
      'Reached the division semifinals at the VEX Robotics World Championship.',
      'Designed robot components and assemblies in CAD with the programming subteam, then helped build, scout and iterate on them between events.',
    ],
    image: 'images/vex-robot.jpg', // optional
  },
  {
    when: 'Mar 2024 – Jan 2025',
    org: 'Phenomenal Vinyl',
    role: 'Intern at an automotive wrap and customization shop',
    points: [
      'Supported operations and customer-facing events, including the New York International Auto Show.',
      'Helped prepare vehicle displays and events, and picked up a lot about how a small business actually runs.',
    ],
  },
]

export const toolkit = [
  { area: 'CAD', items: ['SolidWorks', 'Fusion 360', 'Onshape'], note: '70+ projects across all three' },
  { area: 'Manufacturing', items: ['CNC machining', 'laser cutting', '3D printing'], note: 'Hands-on experience from high school' },
  { area: 'Hardware', items: ['mechanical design', 'rapid prototyping', 'robotics', 'Arduino'] },
  { area: 'FPV', items: ['race piloting', 'equipment setup', 'ELRS', 'RF coordination across analog and DJI'] },
]

export const interests = ['UAVs', 'autonomous systems', 'aerospace propulsion', 'robotics', 'entrepreneurship']

export const education = [
  {
    school: 'Purdue University, College of Engineering',
    when: 'Expected May 2030',
    detail: 'Coursework: Calculus II, Engineering Design and Data Analysis, General Chemistry, The Data Mine.',
  },
  {
    school: 'Jericho Senior High School',
    when: 'Jericho, NY',
    detail:
      'GPA 4.09. Double-accelerated math through multivariable calculus, college calculus at Nassau Community College (final grade A), and the Science Research program.',
  },
]

export const honors = [
  { year: '2025', title: 'VEX Robotics NY Southern State Champion', detail: 'Coast-2-Coast Robotics, qualified for Worlds' },
  { year: '2024', title: 'VEX Worlds division semifinalist', detail: 'Science division' },
  { year: '2024', title: 'NFTE business competition finalist', detail: 'Zuora subscription challenge' },
  { year: '2022', title: 'Gold medal, Concours International de Musique du Québec', detail: 'Violin' },
  { year: '2022', title: 'Hershey Soccer Summer Classic champion', detail: 'U15' },
  { year: '2016–24', title: 'NYSSMA violin solo, 97 or higher every year', detail: 'Nine straight evaluations' },
]

export const offDuty = [
  {
    title: 'Violin',
    body:
      'Nine straight years of NYSSMA solo scores at 97 or above, a gold medal in Québec, and December concerts alongside the North Shore Symphony Orchestra at Adelphi University from 2022 to 2024. I also assistant-taught a children’s ensemble at Virtuoso Suzuki Academy and have played for residents at an assisted living and memory care home.',
  },
  {
    title: 'Soccer and track',
    body:
      'Trained five days a week with Valencia CF Academy, won the Hershey U15 tournament with Syosset, played varsity soccer at Jericho, and still play club with Barcelona FC. I ran varsity winter and spring track too.',
  },
]

export const contact = {
  lede:
    "I'm looking for a summer 2027 internship on a team building unmanned systems, including defense and counter-UAS work. If you have room for a first-year who flies, CADs and builds, I'd love to talk.",
}
