// Everything written on the site lives in this file.
// Edit text here and the page updates. Image paths point inside /public.

export const site = {
  first: 'Min-Naing',
  last: 'Akamatsu',
  short: 'Min-Naing Akamatsu',
  callsign: 'AKAMATSU',
  email: 'makamats@purdue.edu',
  linkedin: 'https://www.linkedin.com/in/minakamatsu',
  github: 'https://github.com/minakamatsu',
  resume: 'resume.pdf',
  heroLine:
    "First-year engineering student at Purdue and FPV racer on the university's drone racing team. I'm looking for a summer 2027 internship building unmanned systems.",
}

// Licenses. They show as badges in the hero, rows in the Flying stats, and the first row of Skills.
// `id` is optional: add your ham call sign or Part 107 certificate number and it shows on the badge.
export const credentials = [
  {
    short: 'FAA Part 107',
    name: 'FAA Part 107 Remote Pilot Certificate',
    note: 'Certified to fly drones commercially in the US.',
    id: '',
  },
  {
    short: 'FCC Ham Radio · Technician',
    name: 'FCC Amateur Radio License (Technician Class)',
    note: 'Technician privileges cover the 5.8 GHz amateur band that analog FPV video runs on.',
    id: '',
  },
]

export const flying = {
  lede: 'I race FPV for Purdue in the Collegiate Drone Racing Association.',
  body: [
    "Since the season started I've held the third-fastest spot in our team standings. Most of that comes from over 100 hours in the simulator, drilling racing lines, throttle control and precise maneuvering at speed.",
    'Off the course I help with the practical side of running a team: equipment setup, race strategy, organizing practices, and managing RF interference when analog FPV and DJI systems are flying in the same space.',
    'The scheduling and flight-time problems I kept running into at practice turned into my LaunchPad project, which I cover under Experience.',
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
    ['Part 107', 'Certified'],
    ['Ham radio', 'Technician'],
  ],
}

// Every project on the site. Each one gets a card on the home page and its own page
// at minakamatsu.github.io/work/<slug>/. The order here is the order on the site.
//   featured  true = big card under Work; false = smaller card under "Software I've shipped"
//   summary   one sentence: what it is, what you did, what came of it
//   badge     the short proof line on the card
//   glance    the at-a-glance panel at the top of the project page
//   body      the write-up, one heading and paragraph per section
//   learned   left empty on purpose. Write it in your own words and a
//             "What I learned" section appears on that project's page.
//   image     drop a photo or screenshot at public/<image> and it replaces the drawing
export const projects = [
  {
    slug: "nsds-drone-team",
    featured: true,
    kind: "Drones",
    title: "NSDS drone team",
    summary:
      "Building quads from tiny whoops up to 7 inch on Purdue's National Security & Defense Society drone team, and making our own frames and camera mounts.",
    badge: "Whoops to 7\"",
    when: "Fall 2026 – Present",
    where: "Purdue National Security & Defense Society",
    glance: [
      ["Role", "Drone team member"],
      ["Team", "Purdue NSDS"],
      ["When", "Fall 2026 – Present"],
      ["Builds", "Whoops to 7 inch"],
      ["Makes", "Frames, camera mounts"],
    ],
    body: [
      {
        h: "The builds",
        p: "On the society's drone team we build all kinds of quads, from tiny whoops up to 7 inch quads. Covering that whole range means working with various stacks, motors, props, battery cell counts and video systems.",
      },
      {
        h: "Parts we make",
        p: "We also CAD and manufacture our own parts in house, like frames and camera mounts. Designing for FPV means designing for crashes, so every part has to stay light, take hits, and still be quick to swap out at the field.",
      },
    ],
    tags: ["Quad Builds", "CAD", "Manufacturing", "Frames", "Camera Mounts", "Whoops to 7\""],
    links: [],
    drawing: "quads",
    image: "images/nsds-quads.jpg",
    learned: '',
  },
  {
    slug: "draftmydrone",
    featured: true,
    kind: "Drone software",
    title: "DraftMyDrone",
    summary:
      "A live FPV build planner I designed and built that catches incompatible parts before you buy them, scores the build out of 100 and estimates how it will fly.",
    badge: "Live",
    when: "Apr 2026 – Present",
    where: "FPV build planner, live",
    glance: [
      ["Role", "Designed and built it"],
      ["Status", "Live"],
      ["When", "Apr 2026 – Present"],
      ["Stack", "Next.js, TypeScript, Postgres"],
      ["Tested", "Rules engine and physics"],
    ],
    body: [
      {
        h: "The problem",
        p: "FPV parts that are each fine on their own can still add up to a quad that doesn't work: a stack that won't mount to the frame, a battery the ESC can't take, a camera from one video system and goggles from another. DraftMyDrone is a build planner that catches those before you buy.",
      },
      {
        h: "How it checks a build",
        p: "You fill nine slots from frame to goggles, filtered by flight style. Underneath is a rules engine that checks frame and stack mounting patterns, battery cell count against the stack and motor limits, high-KV motors on 6S, one video system across VTX, camera and goggles, and prop size against the frame. Every error, warning and note takes points off a 100-point compatibility score.",
      },
      {
        h: "Estimates and sharing",
        p: "It also estimates all-up weight, thrust, thrust-to-weight and a rough flight time, and labels them as approximations. Builds save to an account, share by link, or export as CSV. The compatibility engine and the physics have their own automated tests.",
      },
    ],
    tags: ["Next.js", "TypeScript", "Postgres", "Clerk", "Vitest"],
    links: [["draftmydrone.com", "https://draftmydrone.com"]],
    drawing: "buildcheck",
    image: "images/draftmydrone.jpg",
    learned: '',
  },
  {
    slug: "ftc-robohawks",
    featured: true,
    kind: "Robotics",
    title: "FIRST Tech Challenge",
    summary:
      "Lead CAD designer, builder and driver for team 14461. I designed an adjustable-hood shooter that scored over 95% of the time in multi-location testing.",
    badge: "95%+ in testing",
    when: "Senior year, 2025–26",
    where: "Team 14461 RoboHawks, Jericho",
    glance: [
      ["Role", "Lead CAD, builder, driver"],
      ["Team", "14461 RoboHawks"],
      ["When", "Senior year, 2025–26"],
      ["Subsystem", "Variable-hood shooter"],
      ["Result", "Over 95% in shot testing"],
    ],
    body: [
      {
        h: "My role",
        p: "I was the lead CAD designer, but was also the builder and driver for the team. Moving from the big VEX program I used to be a part of, I joined a local FTC team for my last year to have more ownership over the design.",
      },
      {
        h: "The shooter",
        p: "My main subsystem was the shooter: a rigid outer hood with a freely rotating inner hood, so the launch angle adjusts and the robot can score from different spots on the field. In shot testing from multiple locations it scored over 95% of the time.",
      },
    ],
    tags: ["Lead CAD", "Robot Driver", "Build Quality", "Leadership"],
    links: [],
    drawing: "shooter",
    image: "images/ftc-robot.jpg",
    learned: '',
  },
  {
    slug: "vex-62880c",
    featured: true,
    kind: "Robotics",
    title: "VEX Robotics",
    summary:
      "CAD designer, builder and scout for team 62880C, which won the 2025 New York Southern State Championship and reached the division semifinals at Worlds.",
    badge: "2025 State Champion",
    when: "Feb 2024 – Jan 2026",
    where: "Coast-2-Coast Robotics, team 62880C",
    glance: [
      ["Role", "CAD, builder, scout"],
      ["Team", "62880C, Coast-2-Coast"],
      ["When", "Feb 2024 – Jan 2026"],
      ["Result", "2025 NY Southern State Champion"],
      ["Worlds", "Division semifinals"],
    ],
    body: [
      {
        h: "My role",
        p: "I was a CAD designer, builder and scout for 62880C. I designed robot components and assemblies with the programming subteam, then helped build, scout and iterate on them between events. We won the 2025 New York Southern State Championship and reached the division semifinals at the VEX World Championship.",
      },
      {
        h: "What it taught me",
        p: "VEX is where I learned the most about actually making robots: fabrication, CNC work, build quality and iteration.",
      },
    ],
    tags: ["CAD", "CNC", "Fabrication", "Build Quality", "Sensor Integration", "Robotic Design"],
    links: [],
    drawing: "assembly",
    image: "images/vex-robot.jpg",
    learned: '',
  },
  {
    slug: "rde-research",
    featured: true,
    kind: "Research",
    title: "Rotating detonation engines",
    summary:
      "Research from 2023 to 2025 on how fuel choice affects rotating detonation engine performance, modeled in Python with Cantera and SDToolbox.",
    badge: "2023 to 2025",
    when: "2023 to 2025",
    where: "Jericho Science Research Program",
    glance: [
      ["Role", "Student researcher"],
      ["Program", "Jericho Science Research"],
      ["When", "2023 to 2025"],
      ["Tools", "Python, Cantera, SDToolbox"],
    ],
    body: [
      {
        h: "The question",
        p: "I studied how fuel choice trades off against performance in rotating detonation engines. An RDE burns its mixture in a detonation wave that circles an annular chamber thousands of times per second, which promises higher efficiency from a mechanically simple engine.",
      },
      {
        h: "How I modeled it",
        p: "I modeled detonation properties for candidate fuels in Python with Cantera and SDToolbox, working with Chapman–Jouguet velocity and pressure, ZND structure and cell size. Comparing fuels fairly turned out to be the hard part, because performance and environmental metrics do not sit on one scale, so the analysis moved toward a multivariate comparison.",
      },
    ],
    tags: ["Python", "Cantera", "SDToolbox", "Detonation modeling"],
    links: [],
    drawing: "rde",
    image: "images/rde.jpg",
    learned: '',
  },
  {
    slug: "jet-engine",
    featured: true,
    kind: "Propulsion CAD",
    title: "Jet engine components in CAD",
    summary:
      "The combustion chamber and centrifugal compressor for my most recent jet engine, designed in CAD part by part, with the compressor 3D printed.",
    badge: "Compressor printed",
    when: "Ongoing",
    where: "Since high school",
    glance: [
      ["Type", "Personal project"],
      ["When", "Since high school"],
      ["Parts", "Combustor, compressor"],
      ["Made", "Compressor 3D printed"],
    ],
    body: [
      {
        h: "The design",
        p: "I've been designing jet engine components in CAD since high school. On my most recent engine I designed the combustion chamber and the centrifugal compressor in CAD, working through blade count, passages and chamber volume part by part, then 3D printed the compressor.",
      },
    ],
    tags: ["CAD", "Manufacturing", "Design"],
    links: [],
    drawing: "jet",
    image: "images/jet-engine.jpg",
    learned: '',
  },
  {
    slug: "accelerator-os",
    featured: false,
    kind: "Software",
    title: "Accelerator OS",
    summary:
      "A multi-tenant dashboard I built so each auto shop I make a site for can see its own visits, estimate requests and calls, and nothing else.",
    badge: "Multi-tenant",
    when: "Aug 2026 – Present",
    where: "Back end for my client sites",
    glance: [
      ["Role", "Designed and built it"],
      ["When", "Aug 2026 – Present"],
      ["Used by", "My client sites"],
      ["Stack", "Next.js, Supabase, Postgres"],
    ],
    body: [
      {
        h: "What it does",
        p: "The auto shop sites I build each load a small tracker, and Accelerator OS turns that into a simple dashboard for the owner: visits, estimate requests, and taps on call, directions and contact. A click is reported as a click, never relabeled as a lead or revenue.",
      },
      {
        h: "Keeping each shop separate",
        p: "It's multi-tenant, so the core job is making sure a shop only ever sees its own data. The server derives the tenant instead of trusting the browser, Postgres row-level security backs that up, and tests cover the boundaries. Estimate forms go through validation, consent, spam checks and rate limits, then a notification worker with retries emails the shop.",
      },
      {
        h: "A deploy that broke",
        p: "One production deploy failed because blank optional environment variables were read as configured. I fixed the validation, derived URLs from Vercel's system variables, and added regression tests for it.",
      },
    ],
    tags: ["Next.js", "Supabase", "Row-level security", "Vitest"],
    links: [["GitHub", "https://github.com/minakamatsu/Accelerator-OS"]],
    drawing: "tenants",
    image: "images/accelerator-os.jpg",
    learned: '',
  },
  {
    slug: "desktop-cat",
    featured: false,
    kind: "Software",
    title: "Desktop Cat",
    summary:
      "A native desktop app on Tauri and Rust where up to eight pixel cats live along the bottom of your screen.",
    badge: "Windows and Mac",
    when: "May 2026",
    where: "Native desktop app",
    glance: [
      ["Role", "Designed and built it"],
      ["When", "May 2026"],
      ["Built on", "Tauri 2, Rust"],
      ["Ships as", "Windows installer, Mac build"],
    ],
    body: [
      {
        h: "What it does",
        p: "Up to eight pixel cats live along the bottom of your screen. They walk, nap and react to clicks, stay on top of other windows, and walk back to the bottom after you drag them somewhere.",
      },
      {
        h: "How it is built",
        p: "It's built on Tauri 2, so it runs as a native app with a Rust core instead of in a browser tab. Inside is a behavior state machine, a sprite animator fed by an Aseprite export script, tray controls, saved settings and launch at startup, packaged as a Windows installer and a Mac build.",
      },
    ],
    tags: ["Tauri", "Rust", "TypeScript"],
    links: [["Download", "https://mypetcat.vercel.app"], ["GitHub", "https://github.com/minakamatsu/mypetcat"]],
    drawing: "cat",
    image: "images/desktop-cat.gif",
    learned: '',
  },
]

// Smaller things I've built, listed at the end of Work
export const experiments = [
  ["FrontRow", "Three versions of a marketplace for short paid live sessions between fans and creators. It started as a sealed-bid auction, added a chance-based entry mode, and ended up as fixed-price booking with waiting rooms and proportional refunds."],
  ["BuffMeNerfThem", "Weekly buff and nerf voting on Overwatch heroes, so balance feedback arrives as structured data instead of forum threads. The database allows one vote per hero per week, and row-level security keeps individual votes private while the leaderboard shows totals."],
  ["Photo booking site", "Portfolio and booking site for a photographer, with Square checkout and a payment webhook that is safe to receive twice."],
  ["3D printing community", "A forum and model library for hobbyists, with STL, OBJ, 3MF and G-code uploads, voting and moderator roles."],
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
    when: 'Fall 2026 – Present',
    org: 'Purdue National Security & Defense Society',
    role: 'Member, FPV drone team',
    points: [
      'Member of the student society that connects Purdue students with careers in national defense and security.',
      "On the society's FPV drone team, we build quads ranging from whoops to 7 inch quads.",
      'CAD and manufacture in-house parts such as frames and camera mounts.',
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
  { area: 'CAD', items: ['SolidWorks', 'Fusion 360', 'Onshape'] },
  { area: 'Manufacturing', items: ['CNC machining', 'laser cutting', '3D printing'] },
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
      'Played 10+ years with teams like NY Barcelona FC and Valencia CF Academy. Won the Hershey U15 tournament with Syosset and played varsity soccer at Jericho as the Center Back.',
  },
]

export const contact = {
  lede:
    "I'm looking for a summer 2027 internship on a team building unmanned systems, including defense and counter-UAS work. If you have room for a first-year who flies, CADs and builds, I'd love to talk.",
}
