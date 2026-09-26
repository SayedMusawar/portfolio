# Progress log

## Steps done
- [x] Step 0: tools installed, project scaffolded, folders and empty files created
- [x] Step 1: design system, theme toggle, header, footer, layout
- [x] Step 2: data files (profile, projects, skills, timeline)
- [x] Step 3: home page (hero, featured bento, lab teaser, latest posts, contact strip)
- [x] Step 4: projects list with filters, detail pages
- [ ] Step 5: skills and about pages  <-- NEXT
- [ ] Step 6: AI Lab pathfinding visualizer
- [ ] Step 7: blog (MDX)
- [ ] Step 8: contact form and resume page
- [ ] Step 9: SEO, accessibility, Lighthouse
- [ ] Step 10: deploy to Vercel

## Environment
- Ubuntu, Node LTS via nvm, VS Code, npm
- Next.js 16 (Turbopack), Tailwind v4 (no tailwind.config file, tokens are in app/globals.css)
- Dev server: npm run dev (if port 3000 is busy: pkill -f "next dev")
- Step 4 is committed to git

## Files that exist and work
- app/layout.tsx, app/page.tsx (home), app/globals.css
- app/projects/page.tsx (list with filter), app/projects/[slug]/page.tsx (detail, generateStaticParams, generateMetadata)
- components/: site-header, site-footer, theme-toggle, theme-provider, hero, project-card, post-card, project-filter
- components/pathfinder/path-graphic.tsx (still frame only; the real visualizer is Step 6)
- components/ui/: shadcn files (button.tsx is hand-written, see below)
- data/: profile.ts, projects.ts (with getProject, getFeaturedProjects, getAdjacentProjects, projectCategories), skills.ts, timeline.ts
- lib/posts.ts is a STUB returning no posts (Step 7 replaces it)
- All other app pages are "Coming soon" stubs (about, skills, ai-lab, blog, resume, contact)
- Still empty: components/skill-tile.tsx, contact-form.tsx

## Decisions that differ from the brief
- CSS variables keep the brief's names (--bg, --surface, --border, --text, --muted, --accent, --accent-fg).
  Tailwind utilities: bg-brand / text-brand / text-brand-fg = electric blue accent,
  text-muted-foreground = muted text, bg-surface, border-border, text-foreground, bg-background.
  Reason: shadcn uses "muted" and "accent" for different things.
- The installed shadcn version does NOT support asChild. Links styled as buttons use
  className={buttonVariants(...)} on <Link> (internal) or <a> (external). Never use asChild.
- components/ui/button.tsx was rewritten by hand: pill shape, flat, sizes default/sm/lg/icon/icon-sm/icon-lg.
- Skip link uses the .skip-link class in globals.css.
- Hero entrance is plain CSS (.hero-in with --i stagger), not Framer Motion.
  Framer Motion is only used in components/project-filter.tsx (AnimatePresence popLayout, respects reduced motion).
- globals.css helpers: container-page, section-space, text-display, text-title.
- Card radius is rounded-xl (12px). Pills and buttons are rounded-full.
- Project githubUrl fields are empty strings (the GitHub button is hidden when empty). images arrays are empty
  (ProjectCard and the detail page show a category icon placeholder instead).
- The AI category has no projects yet; the filter shows a friendly empty state.
- Pages do not add their own <main>; layout.tsx provides it. Pages use a div or article with container-page section-space.
- Do not use brand icons (like Github) from lucide-react; newer versions removed them. Use text or a safe icon.
- Highlights section on the detail page is hidden when a project has no highlights (TODO in data).

## Problems already solved (do not repeat)
- Lone ">" on its own line in JSX caused "Unexpected token" parse errors (layout.tsx, page.tsx).
  Keep JSX opening tags compact, and avoid very long className strings on one line.
- A line containing only "<a" (or another tag name) was dropped when pasting, which broke app/projects/[slug]/page.tsx.
  Write "<a href={...}" on one line, and replace whole files instead of patching. Check with: grep -c "<a " file
- Terminal commands (cat > file << 'EOF') were once pasted INTO a .tsx file. When a step needs
  a terminal command, say clearly "run in terminal". When it needs a file, say "paste into file".
- npx tsc --noEmit can show stale errors from .next/dev/types: fix with rm -rf .next
  (stop the dev server first, then run rm -rf .next)
- Sheet component needs the icon-sm button size (already added).
- grep for "gradient" matches "Gradient Descent" in data/skills.ts. That is a false positive.
- Next.js 16: dynamic route params are a Promise (await params) in page components.

## Rules that never change
- No gradients anywhere (check: grep -rniE "gradient" app components data lib)
- Two radii only, 1px borders instead of shadows (one subtle hover shadow on cards)
- Sentence case, no all-caps labels
- Never invent facts about the owner. Use TODO for unknowns.
- Give complete files with the path above each one, and say whether each is a file or a terminal command.

## Known TODOs (owner to fill in)
- githubUrl for each project, screenshots (files in public/images/projects/ and paths in the images array),
  highlights for the small projects
- Year of study, SSC/HSSC details, profile photo, resume PDF, og-default.png

## Current step notes
Step 5 not started. Needs: app/skills/page.tsx (bento grid, one tile per category from data/skills.ts,
AI and ML tile largest, no percentage bars, simple hover state on pills), components/skill-tile.tsx,
app/about/page.tsx (story, education, leadership, using data/profile.ts and data/timeline.ts, TODO markers for missing facts).
## Step 5: Skills and About pages (done)

- Built `/skills` (bento grid from `data/skills.ts`) and `/about` (story, facts card, education, leadership, other training, coursework, contact section).
- Files: `app/skills/page.tsx`, `app/about/page.tsx`, `components/skill-tile.tsx` (replaced), `components/timeline-section.tsx` (new).
- Skills grid: 1 column on mobile, 2 at md, 6 at lg. Large tile spans 4 columns and 2 rows, all other tiles span 2.
- Colors are written as `bg-[var(--surface)]` and `border-[color:var(--border)]` so no Tailwind theme mapping is needed.
- Buttons and links are plain `Link` and `a` tags with classes, no `asChild`.
- TODO (owner to confirm): profile photo and current year of study. Left as a code comment in `app/about/page.tsx`.

### Solved problems

- Lint error `react-hooks/set-state-in-effect` in `components/theme-toggle.tsx`: replaced the `useState` + `useEffect` mounted flag with `useSyncExternalStore(() => () => {}, () => true, () => false)`.
- The gradient grep matches `"Gradient Descent"` in `data/skills.ts`. That is a skill name, not styling, so it is fine.
- `git push` said "No configured push destination": added the remote with `git remote add origin https://github.com/SayedMusawar/portfolio.git`.
- `git push` said "Password authentication is not supported": GitHub needs a personal access token (classic, `repo` scope) in the password prompt. Credentials are saved with `git config --global credential.helper store`. Never paste the token into files or chats.

### Next

- Step 6: AI Lab pathfinding visualizer (BFS, DFS, A*).

## Step 5: Skills and About pages (done)

- Built `/skills` (bento grid from `data/skills.ts`) and `/about` (story, facts card, education, leadership, other training, coursework, contact section).
- Files: `app/skills/page.tsx`, `app/about/page.tsx`, `components/skill-tile.tsx` (replaced), `components/timeline-section.tsx` (new).
- Skills grid: 1 column on mobile, 2 at md, 6 at lg. Large tile spans 4 columns and 2 rows, all other tiles span 2.
- Colors are written as `bg-[var(--surface)]` and `border-[color:var(--border)]` so no Tailwind theme mapping is needed.
- Buttons and links are plain `Link` and `a` tags with classes, no `asChild`.
- TODO (owner to confirm): profile photo and current year of study. Left as a code comment in `app/about/page.tsx`.

### Solved problems

- Lint error `react-hooks/set-state-in-effect` in `components/theme-toggle.tsx`: replaced the `useState` + `useEffect` mounted flag with `useSyncExternalStore(() => () => {}, () => true, () => false)`.
- The gradient grep matches `"Gradient Descent"` in `data/skills.ts`. That is a skill name, not styling, so it is fine.
- `git push` said "No configured push destination": added the remote with `git remote add origin https://github.com/SayedMusawar/portfolio.git`.
- `git push` said "Password authentication is not supported": GitHub needs a personal access token (classic, `repo` scope) in the password prompt. Credentials are saved with `git config --global credential.helper store`. Never paste the token into files or chats.

### Next

- Step 6: AI Lab pathfinding visualizer (BFS, DFS, A*).

## Step 5: Skills and About pages (done)

- Built `/skills` (bento grid from `data/skills.ts`) and `/about` (story, facts card, education, leadership, other training, coursework, contact section).
- Files: `app/skills/page.tsx`, `app/about/page.tsx`, `components/skill-tile.tsx` (replaced), `components/timeline-section.tsx` (new).
- Skills grid: 1 column on mobile, 2 at md, 6 at lg. Large tile spans 4 columns and 2 rows, all other tiles span 2.
- Colors are written as `bg-[var(--surface)]` and `border-[color:var(--border)]` so no Tailwind theme mapping is needed.
- Buttons and links are plain `Link` and `a` tags with classes, no `asChild`.
- TODO (owner to confirm): profile photo and current year of study. Left as a code comment in `app/about/page.tsx`.

### Solved problems

- Lint error `react-hooks/set-state-in-effect` in `components/theme-toggle.tsx`: replaced the `useState` + `useEffect` mounted flag with `useSyncExternalStore(() => () => {}, () => true, () => false)`.
- The gradient grep matches `"Gradient Descent"` in `data/skills.ts`. That is a skill name, not styling, so it is fine.
- `git push` said "No configured push destination": added the remote with `git remote add origin https://github.com/SayedMusawar/portfolio.git`.
- `git push` said "Password authentication is not supported": GitHub needs a personal access token (classic, `repo` scope) in the password prompt. Credentials are saved with `git config --global credential.helper store`. Never paste the token into files or chats.

### Next

- Step 6: AI Lab pathfinding visualizer (BFS, DFS, A*).
