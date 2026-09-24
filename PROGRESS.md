# Progress log

## Steps done
- [x] Step 0: tools installed, project scaffolded, folders and empty files created
- [x] Step 1: design system, theme toggle, header, footer, layout
- [x] Step 2: data files (profile, projects, skills, timeline)
- [x] Step 3: home page (hero, featured bento, lab teaser, latest posts, contact strip)
- [ ] Step 4: projects list with filters, detail pages
- [ ] Step 5: skills and about pages
- [ ] Step 6: AI Lab pathfinding visualizer
- [ ] Step 7: blog (MDX)
- [ ] Step 8: contact form and resume page
- [ ] Step 9: SEO, accessibility, Lighthouse
- [ ] Step 10: deploy to Vercel

## Environment
- Ubuntu, Node LTS via nvm, VS Code, npm
- Next.js 16 (Turbopack), Tailwind v4 (no tailwind.config file, tokens are in app/globals.css)

## Decisions that differ from the brief
- CSS variables keep the brief's names (--bg, --surface, --border, --text, --muted, --accent, --accent-fg).
  Tailwind utilities: bg-brand / text-brand / text-brand-fg = electric blue accent,
  text-muted-foreground = muted text, bg-surface, border-border, text-foreground, bg-background.
  Reason: shadcn uses "muted" and "accent" for different things.
- The installed shadcn version does NOT support asChild. Links styled as buttons use
  className={buttonVariants(...)} on <Link>. Never use asChild.
- components/ui/button.tsx was rewritten by hand: pill shape, flat, sizes default/sm/lg/icon/icon-sm/icon-lg.
- Skip link uses the .skip-link class in globals.css (not long Tailwind classes in layout.tsx).
- Hero entrance is plain CSS (.hero-in with --i stagger), not Framer Motion.
  Framer Motion is reserved for the project filter (Step 4).
- Text helper classes in globals.css: container-page, section-space, text-display, text-title.
- lib/posts.ts is a stub returning no posts. Step 7 replaces it.
- Empty pages contain a "Coming soon" stub so tsc passes.
- Project githubUrl fields are empty strings (button hidden when empty). Images arrays are empty.

## Rules that never change
- No gradients anywhere (check: grep -rniE "gradient" app components data lib)
- Two radii: rounded-xl (12px) for cards, rounded-full for pills and buttons
- 1px borders instead of shadows (one subtle hover shadow on cards)
- Sentence case, no all-caps labels
- Never invent facts about the owner. Use TODO for unknowns.

## Known TODOs (owner to fill in)
- githubUrl for each project, screenshots, highlights for the small projects
- Year of study, SSC/HSSC details, profile photo, resume PDF, og-default.png

## Current step notes
(write anything unfinished or any error you're stuck on here)
