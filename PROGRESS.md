# Progress log

## Steps done
- [x] Step 0: tools installed, project scaffolded, folders and empty files created
- [x] Step 1: design system, theme toggle, header, footer, layout
- [x] Step 2: data files (profile, projects, skills, timeline)
- [x] Step 3: home page (hero, featured bento, lab teaser, latest posts, contact strip)
- [x] Step 4: projects list with filters, detail pages
- [x] Step 5: skills and about pages
- [x] Step 6: AI Lab pathfinding visualizer
- [x] Step 7: blog (MDX)WW
- [x] Step 8: contact form and resume page
- [ ] Step 9: SEO, accessibility, Lighthouse  <-- NEXT
- [ ] Step 10: deploy to Vercel

## Environment
- Ubuntu, Node LTS via nvm, VS Code, npm
- Next.js 16 (Turbopack), Tailwind v4 (no tailwind.config file, tokens are in app/globals.css)
- Dev server: npm run dev (if port 3000 is busy: pkill -f "next dev")
- Steps 0-8 committed to git, remote origin is https://github.com/SayedMusawar/portfolio.git
- Secrets live in .env.local (git-ignored): RESEND_API_KEY. Restart the dev server after editing it.

## Files that exist and work
- app/layout.tsx, app/page.tsx (home), app/globals.css (has a shiki dual-theme block appended at the end, Step 7)
- app/projects/page.tsx (list with filter), app/projects/[slug]/page.tsx (detail, generateStaticParams, generateMetadata)
- app/skills/page.tsx (bento grid), app/about/page.tsx (story, facts, education, leadership, coursework)
- app/ai-lab/page.tsx (full pathfinding visualizer + algorithm notes + coursework tag list)
- app/blog/page.tsx, app/blog/[slug]/page.tsx, app/blog/tag/[tag]/page.tsx, app/rss.xml/route.ts, app/sitemap.ts
- app/contact/page.tsx (form card + email/GitHub/LinkedIn links), app/api/contact/route.ts (POST, zod, honeypot, Resend)
- app/resume/page.tsx (on-page resume from profile.ts, timeline.ts, getFeaturedProjects(), inline skill groups; PDF button only if the file exists)
- content/posts/hello-world.mdx (sample post)
- lib/posts.ts (fs-based, Server Components only), lib/contact-schema.ts (zod schema + toFieldErrors, safe for client and server), lib/utils.ts
- components/: site-header, site-footer, theme-toggle, theme-provider, hero, project-card, post-card, project-filter,
  skill-tile, timeline-section, blog-list, blog-mdx-components, code-block, table-of-contents, share-links, contact-form
- components/pathfinder/: path-graphic.tsx, algorithms.ts, pathfinder.tsx
- components/ui/: shadcn files (button.tsx is hand-written, see below)
- data/: profile.ts, projects.ts (getProject, getFeaturedProjects, getAdjacentProjects, projectCategories), skills.ts, timeline.ts

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
- Pathfinder tool bar uses plain <button> elements styled as pills, not the shadcn Tabs component.
- Pathfinder animation runs from a single `tick` counter and one timer effect (no refs, no timeout list).
  Visited cells, path, counts and status are derived from `run` + `tick`. Reduced motion is read with
  useSyncExternalStore and makes the result appear instantly.
- Blog MDX is compiled at request time in lib/posts.ts with @mdx-js/mdx's evaluate() function, not by
  importing .mdx files as modules through @next/mdx's loader. Reason: Next 16's Turbopack MDX compiler
  (mdxRs) doesn't run arbitrary JS remark/rehype plugins like rehype-pretty-code, so the loader approach
  wouldn't support syntax highlighting. next.config.ts and the root mdx-components.tsx are untouched and
  unused by the blog. Requires @mdx-js/mdx as a direct dependency.
- Table of contents heading ids come from a hand-written slugify in lib/posts.ts that approximates
  rehype-slug closely but isn't guaranteed identical for unusual heading text.
- Code block copy button is a client component wrapping <pre> and reading its own textContent.
- RSS feed and share links read the site URL from NEXT_PUBLIC_SITE_URL, defaulting to
  http://localhost:3000 until it's set (see Known TODOs).
- Contact validation is shared in lib/contact-schema.ts (zod), used by components/contact-form.tsx and
  app/api/contact/route.ts.
- The contact honeypot field is `company`; the route silently returns success if it is filled.
- The contact route needs RESEND_API_KEY (in .env.local locally, in Vercel env vars at Step 10). Optional:
  CONTACT_TO_EMAIL (defaults to profile.email), CONTACT_FROM_EMAIL (defaults to onboarding@resend.dev, which
  only delivers to the email the Resend account was created with until a domain is verified).
- If RESEND_API_KEY is missing the route returns 503 with a clear message and the form shows it in a red banner.
- The contact route has no rate limiting beyond the honeypot (add a limiter in Step 9 if spam appears).
- The resume PDF button only renders if public/resume/Musawar_Ali_Shah_Resume.pdf exists (fs.existsSync at build time).
- The resume page keeps its own copy of the skill groups from the brief (keep in sync with data/skills.ts).
- Error text uses text-red-600 / dark:text-red-400 (no red token in the design system).

## Problems already solved (do not repeat)
- Lone ">" on its own line in JSX caused "Unexpected token" parse errors (layout.tsx, page.tsx).
  Keep JSX opening tags compact, and avoid very long className strings on one line.
- A line containing only "<a" (or another tag name) was dropped when pasting, which broke
  app/projects/[slug]/page.tsx, components/share-links.tsx and components/blog-mdx-components.tsx.
  Rule: write every JSX opening tag's name and all its attributes on ONE line, however long, never split
  across lines, and replace whole files instead of patching.
  Check with: grep -nE "^\s*<[A-Za-z]+\s*$" path/to/file.tsx (should print nothing)
- Terminal commands (cat > file << 'EOF') were once pasted INTO a .tsx file. When a step needs
  a terminal command, say clearly "run in terminal". When it needs a file, say "paste into file".
- npx tsc --noEmit can show stale errors from .next/dev/types: fix with rm -rf .next
  (stop the dev server first, then run rm -rf .next)
- Sheet component needs the icon-sm button size (already added).
- grep for "gradient" matches "Gradient Descent" in data/skills.ts, app/ai-lab/page.tsx and app/resume/page.tsx.
  That is a false positive (skill names, not CSS).
- Next.js 16: dynamic route params are a Promise (await params) in page components.
- Lint react-hooks/set-state-in-effect: use useSyncExternalStore instead of useState + useEffect for browser values
  (fixed in components/theme-toggle.tsx and components/pathfinder/pathfinder.tsx).
- Lint react-hooks/refs (reading ref.current during render) in pathfinder.tsx: removed all refs, see Decisions.
- git push said "No configured push destination": added the remote with
  git remote add origin https://github.com/SayedMusawar/portfolio.git
- git push said "Password authentication is not supported": GitHub needs a personal access token
  (classic, repo scope) in the password prompt. Credentials are saved with
  git config --global credential.helper store. Never paste the token into files or chats.
- Env files (.env.local) are read only at startup: restart npm run dev after changing them.

## Rules that never change
- No gradients anywhere (check: grep -rniE "gradient" app components data lib; ignore skill-name matches)
- Two radii only, 1px borders instead of shadows (one subtle hover shadow on cards)
- Sentence case, no all-caps labels
- Never invent facts about the owner. Use TODO for unknowns.
- Give complete files with the path above each one, and say whether each is a file or a terminal command.
- Write every JSX opening tag (name + all attributes) on one line, never split across lines.
- Before committing a step: npx tsc --noEmit and npm run lint must both be clean.

## Known TODOs (owner to fill in)
- githubUrl for each project, screenshots (files in public/images/projects/ and paths in the images array),
  highlights for the small projects
- Year of study, SSC/HSSC details, profile photo, resume PDF (public/resume/Musawar_Ali_Shah_Resume.pdf), og-default.png
- NEXT_PUBLIC_SITE_URL env var: not set yet, defaults to http://localhost:3000. Set it to the real
  domain after Step 10 (deploy) - used by app/rss.xml/route.ts and the share links on blog posts.
- RESEND_API_KEY must also be added in Vercel (Settings, Environment Variables) at Step 10.
- Pathfinder: drag-to-draw walls only works with a mouse; touch devices can tap one cell at a time.

## Current step notes
Step 9 not started. From the brief (section 7, SEO and meta) and section 2 (hard rules):
- `metadata` per page (title, description), Open Graph image (public/og-default.png does not exist yet),
  sitemap.ts (exists, verify it covers projects, blog posts and tags), robots.txt or app/robots.ts (not created yet),
  JSON-LD Person schema on the home page, metadataBase from NEXT_PUBLIC_SITE_URL.
- Accessibility pass: visible keyboard focus everywhere, semantic HTML, alt text, contrast at least WCAG AA
  in both themes (including text-muted-foreground and error red), prefers-reduced-motion, tab order, skip link.
- Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO: run on a production build
  (npm run build then npm start), not the dev server.
- Optional if spam appears: rate limiting on app/api/contact/route.ts.
- Files to send for this step are collected in step9-context.txt.

## Step summaries (5 to 8)
- Step 5: /skills bento grid (1 col mobile, 2 at md, 6 at lg; large tile spans 4 cols and 2 rows) and /about.
  Colors written as bg-[var(--surface)] and border-[color:var(--border)] in places. Profile photo and year of study
  are TODOs (code comment in app/about/page.tsx).
- Step 6: pathfinder (12x20 grid, BFS/DFS/A*, draw walls, move start/end, speed slider, Visualize/Reset/Clear walls,
  keyboard-accessible cells) and /ai-lab page with algorithm notes and coursework tags.
- Step 7: blog system (lib/posts.ts, list with client-side search and tag filter, tag pages, post page with TOC,
  share links, prev/next, code block copy button, RSS, sample post). See Decisions for the MDX approach.
- Step 8: contact form (components/contact-form.tsx), API route, contact page, resume page. Also fixed the two
  lint errors in pathfinder.tsx. See Decisions for details.