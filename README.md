# minakamatsu.github.io

Personal site for Min-Naing Akamatsu. Vite + React, with a Three.js (react-three-fiber) FPV quad in the hero and framer-motion for the rest.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # serves the built site
```

Needs Node 20 or newer.

## Deploy to GitHub Pages

1. Create a repo named `minakamatsu.github.io` (that makes the site live at https://minakamatsu.github.io).
2. Push this folder to the `main` branch.
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

Using a different repo name (like `portfolio`) also works, since `vite.config.js` uses relative paths. If you do that, update the `og:url` and `og:image` links in `index.html` to the new address so link previews still work.

## Editing content

All the text lives in `src/data/content.js`: bio, flying stats, research, work history, toolkit, record, and contact links. Change it there and the whole site updates.

The downloadable resume is `public/resume.pdf`. Replace it whenever you update your resume (keep the same file name).

## Writing your own reflections

Each project in `builds` (and `research`, if you add the field) has a `learned: ''` line. It is empty on purpose. Write a sentence or two in your own words and a "What I learned" note appears under that project. Leave it empty and nothing shows.

## Adding your photos

Drop images into `public/images/` with these exact names. Every slot is optional. If a file is missing, the site shows its built-in graphic instead, so nothing looks broken.

| File | Where it shows |
| --- | --- |
| `fpv-racing.jpg` | Flying section, inside the goggle frame (landscape, 4:3 works best) |
| `draftmydrone.jpg` | DraftMyDrone in Builds (replaces the build-check readout; a planner screenshot works well) |
| `accelerator-os.jpg` | Accelerator OS in Builds (a dashboard screenshot) |
| `desktop-cat.gif` | Desktop Cat in Builds (a short screen recording as a GIF) |
| `rde.jpg` | Rotating detonation engine research (replaces the drawing) |
| `jet-engine.jpg` | Jet engine components in CAD (replaces the drawing) |
| `vex-robot.jpg` | Under the VEX Robotics entry in Work |
| `cad-1.jpg` … `cad-6.jpg` | CAD gallery. The whole section stays hidden until at least one exists. Add captions in `content.js`. |

Keep images under ~400 KB each (export at around 1600 px wide, JPG quality 80) so the page stays fast.

`public/og-image.jpg` is the preview image when the link is shared on LinkedIn or iMessage. It is a screenshot of the hero; replace it if you want something else.
