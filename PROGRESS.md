# Progress log

## Steps done
- [x] Step 0: tools installed, project scaffolded, folders and empty files created
- [x] Step 1: design system, theme toggle, header, footer, layout
- [x] Step 2: data files (profile, projects, skills, timeline)
- [x] Step 3: home page (hero, featured bento, lab teaser, latest posts, contact strip)
- [ ] Step 4: projects list with filters, detail pages  <-- NEXT
- [ ] Step 5: skills and about pages
- [ ] Step 6: AI Lab pathfinding visualizer
- [ ] Step 7: blog (MDX)
- [ ] Step 8: contact form and resume page
- [ ] Step 9: SEO, accessibility, Lighthouse
- [ ] Step 10: deploy to Vercel

## Environment
- Ubuntu, Node LTS via nvm, VS Code, npm
- Next.js 16 (Turbopack), Tailwind v4 (no tailwind.config file, tokens are in app/globals.css)
- Dev server: npm run dev (if port 3000 is busy: pkill -f "next dev")

## Files that exist and work
- app/layout.tsx, app/page.tsx (home), app/globals.css
- components/: site-header, site-footer, theme-toggle, theme-provider, hero, project-card, post-card
- components/pathfinder/path-graphic.tsx (still frame only; the real visualizer is Step 6)
- components/ui/: shadcn files (button.tsx is hand-written, see below)
- data/: profile.ts, projects.ts (with getProject, getFeaturedProjects, getAdjacentProjects, projectCategories), skills.ts, timeline.ts
- lib/posts.ts is a STUB returning no posts (Step 7 replaces it)
- All other app pages are "Coming soon" stubs
- Still empty: components/project-filter.tsx, skill-tile.tsx, contact-form.tsx

## Decisions that differ from the brief
- CSS variables keep the brief's names (--bg, --surface, --border, --text, --muted, --accent, --accent-fg).
  Tailwind utilities: bg-brand / text-brand / text-brand-fg = electric blue accent,
  text-muted-foreground = muted text, bg-surface, border-border, text-foreground, bg-background.
  Reason: shadcn uses "muted" and "accent" for different things.
- The installed shadcn version does NOT support asChild. Links styled as buttons use
  className={buttonVariants(...)} on <Link>. Never use asChild.
- components/ui/button.tsx was rewritten by hand: pill shape, flat, sizes default/sm/lg/icon/icon-sm/icon-lg.
- Skip link uses the .skip-link class in globals.css.
- Hero entrance is plain CSS (.hero-in with --i stagger), not Framer Motion.
  Framer Motion is reserved for the project filter (Step 4).
- globals.css helpers: container-page, section-space, text-display, text-title.
- Card radius is rounded-xl (12px). Pills and buttons are rounded-full.
- Project githubUrl fields are empty strings (hide the GitHub button when empty). images arrays are empty
  (ProjectCard shows a category icon instead).
- The AI category has no projects yet, so the filter needs a friendly empty state.

## Problems already solved (do not repeat)
- Lone ">" on its own line in JSX caused "Unexpected token" parse errors (layout.tsx, page.tsx).
  Keep JSX opening tags compact, and avoid very long className strings on one line.
- Terminal commands (cat > file << 'EOF') were once pasted INTO a .tsx file. When a step needs
  a terminal command, say clearly "run in terminal". When it needs a file, say "paste into file".
- npx tsc --noEmit can show stale errors from .next/dev/types: fix with rm -rf .next
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
- githubUrl for each project, screenshots, highlights for the small projects
- Year of study, SSC/HSSC details, profile photo, resume PDF, og-default.png

## Current step notes
Step 4 not started. Needs: app/projects/page.tsx (filter pills with Framer Motion layout transition),
components/project-filter.tsx, app/projects/[slug]/page.tsx (gallery placeholder, highlights, stack,
GitHub/live buttons, prev/next), generateStaticParams, empty state for filters with no results.
