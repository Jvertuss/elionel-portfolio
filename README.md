# Elionel Vertus — Portfolio

A Smash Ultimate-style game-menu portfolio built with React and Vite.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve dist/ locally
```

`vite.config.js` uses `base: './'`, so `dist/` works on any static host or sub-folder (hash routing, no server config needed).

## Where things live

| What | Where |
| --- | --- |
| All text, projects, experience, links, playlist | `src/data.js` |
| Home menu, Projects, Experience, About, Contact, Full page | `src/pages/` |
| Music player (never autoplays) | `src/components/MusicPlayer.jsx` |
| All styling | `src/styles.css` |
| Résumé PDF | `public/resume.pdf` |
| Favicon | `public/favicon.svg` |
| Design references (not used by the site) | `reference/` |

## Common edits

- **Add or edit a project:** add an object to `PROJECTS` in `src/data.js` (order = display order). Set `tone` to `red`, `blue`, `pink`, `green`, `yellow`, `purple`, `orange`, or `teal`.
- **Add a photo to About:** put it in `public/images/` and set `photo: asset('images/your-photo.jpg')` in `SITE`.
- **Update the résumé:** replace `public/resume.pdf`.
- **Email / LinkedIn:** `SITE.email` and `SITE.linkedin`.

## Controls

Mouse and touch work everywhere. Keyboard: arrow keys move the cursor on the home menu and the experience grid, Enter opens, Esc goes back. Music only starts when a visitor presses play.
