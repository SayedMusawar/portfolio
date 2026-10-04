# Progress log

## Steps done
- [x] Step 0: tools installed, project scaffolded, folders and empty files created
- [x] Step 1: design system, theme toggle, header, footer, layout
- [x] Step 2: data files (profile, projects, skills, timeline)
- [x] Step 3: home page (hero, featured bento, lab teaser, latest posts, contact strip)
- [x] Step 4: projects list with filters, detail pages
- [x] Step 5: skills and about pages
- [x] Step 6: AI Lab pathfinding visualizer
- [x] Step 7: blog (MDX)
- [x] Step 8: contact form and resume page
- [x] Step 9: SEO and accessibility code (metadata, sitemap, robots, JSON-LD, OG image, a11y fixes). Lighthouse scores NOT measured yet
- [ ] Feature phase (see below)  <-- CURRENT
- [ ] Step 10: deploy to Vercel (after the feature phase, or earlier if the owner decides)

## Feature phase (extras the owner chose, built one at a time, before or around Step 10)
- [x] F1a: GitHub links in data/projects.ts (6 of 9 projects have a repo; todo-app, spotify-clone, small-projects have none)
- [~] F1b: screenshots. Done for lost-and-found-system (3), it-problem-reporting (5), chess-game (4). Still missing: snake, weather, todo, youtube clone, spotify clone, small projects
- [ ] F2: print-friendly /resume (Ctrl+P gives a clean PDF). Resume PDF itself was uploaded by the owner to public/resume/
- [ ] F3: playable Snake and Chess on the site by compiling the owner's EXISTING C++ to WebAssembly. NO TypeScript rewrite (owner decision 2026-10-04). Plan in NEXT_STEP_GAMES_AND_LOST_FOUND.md
- [ ] F4: live link to the Lost & Found app (plan in the same file)
- [ ] F5: command palette (Ctrl/Cmd+K)
- [ ] F6: live GitHub activity section (server fetch, cached)
- [ ] F7: theme toggle with circular reveal (View Transitions API, graceful fallback)
- [ ] F8: AI Lab expansion (compare mode, UCS/Dijkstra, bidirectional, maze generator, touch support, minimax with alpha-beta, N-Queens, K-Means)
- [ ] F9: case-study content on project pages, 2 or 3 real blog posts
- [ ] F10: Vercel Analytics and Speed Insights, custom 404, /now page
- Lighthouse: baseline not run yet. Run on a production build (npm run build, npm start) before and after the feature phase.

## Environment
- Ubuntu, Node LTS via nvm, VS Code, npm
- Next.js 16 (Turbopack), Tailwind v4 (no tailwind.config file, tokens are in app/globals.css)
- Dev server: npm run dev (if port 3000 is busy: pkill -f "next dev")
- Steps 0-8 committed to git, remote origin is https://github.com/SayedMusawar/portfolio.git
- Secrets live in .env.local (git-ignored): RESEND_API_KEY. Restart the dev server after editing it.
- Site URL comes from lib/site.ts getSiteUrl(): NEXT_PUBLIC_SITE_URL, else https://$VERCEL_PROJECT_PRODUCTION_URL, else http://localhost:3000.
- Helper scripts live in scripts/ (prepare-screenshots.sh, make-context.sh). Never put secrets or .env files in context bundles.

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
- Step 9 additions: lib/site.ts, lib/og-image.tsx, app/opengraph-image.tsx, app/twitter-image.tsx, app/robots.ts,
  app/sitemap.ts (now filled in), components/json-ld.tsx
- scripts/prepare-screenshots.sh (ImageMagick: raw screenshots to 16:9 WebP in public/images/projects/<slug>/NN.webp)
- public/images/projects/{lost-and-found-system,it-problem-reporting,chess-game}/*.webp
- public/resume/Musawar_Ali_Shah_Resume.pdf (uploaded by the owner)

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

- Project images are objects: Project.images is ProjectImage[] = { src, alt }[] (alt text per image, written from the real screenshot).
  Image files live in public/images/projects/<slug>/01.webp, 02.webp, ...
- ProjectCard cover is a full 16:9 frame (aspect-video, object-cover object-top). Cards without images show the category icon in the same frame.
  The GitHub button shows only on the detail page, not on cards (a card is already a link; no link inside a link).
- Screenshots are padded to 16:9 at native size (not stretched, not upscaled). The Lost & Found login screenshot has the
  "developed by" block (roll numbers) blurred on purpose.
- OG and Twitter images are generated in code (app/opengraph-image.tsx, app/twitter-image.tsx via lib/og-image.tsx, flat colors, default font).
  public/og-default.png is no longer needed.
- Layout metadata: metadataBase from getSiteUrl(), canonical "./" (resolves per page), RSS alternate link, theme-color viewport.
  Layout openGraph has only type, siteName, locale (no title), so pages without their own openGraph fall back to <title>. Blog posts set their own.
- JetBrains Mono is loaded with preload: false (only used for code).
- main has id="main", tabIndex={-1} and inline outline none so the skip link target works.
- Security headers are in next.config.ts (nosniff, referrer policy, frame options, permissions policy). No CSP on purpose (inline scripts from Next and next-themes).
- JSON-LD: Person on the home page, BlogPosting on blog posts, via components/json-ld.tsx.
- Games on the site (planned, not built): the owner's existing C++ games are compiled to WebAssembly (Emscripten) and embedded via an iframe
  that loads only after a Play click. Chess uses Qt for WebAssembly. Snake (SFML) needs a browser-capable graphics layer (SMK, VRSFML, SDL2 or a thin shim),
  chosen after inspecting the code. Owner does NOT want a TypeScript rewrite. Label honestly: say "C++ compiled to WebAssembly" and name any adapted layer.

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

- Images showed alt text and the dev log printed 404 for /images/projects/...: the .webp files did not exist in public/images/projects.
  Fix: run bash scripts/prepare-screenshots.sh (needs ImageMagick and the raw screenshots in ~/Pictures/Screenshots) or unzip a prepared zip into public/images.
  Check with: ls -R public/images/projects
- Module not found '@/components/json-ld': the new file had not been created. Check the file exists with the exact name before importing.

## Rules that never change
- No gradients anywhere (check: grep -rniE "gradient" app components data lib; ignore skill-name matches)
- Two radii only, 1px borders instead of shadows (one subtle hover shadow on cards)
- Sentence case, no all-caps labels
- Never invent facts about the owner. Use TODO for unknowns.
- Give complete files with the path above each one, and say whether each is a file or a terminal command.
- Write every JSX opening tag (name + all attributes) on one line, never split across lines.
- Before committing a step: npx tsc --noEmit and npm run lint must both be clean.
- Never share or commit secrets (.env.local, API keys, tokens, database URLs with passwords).
- Never present a rewrite as the original code (see Decisions, games).
- Do not rewrite the owner's C++ games in TypeScript or any other language. Connect the existing code (WebAssembly). If blocked, report the exact blocker.

## Known TODOs (owner to fill in)
- Screenshots for snake, weather, todo, youtube clone, spotify clone, small projects (files in public/images/projects/<slug>/ and entries in data/projects.ts)
- Lost & Found: claim review and digital receipt screenshots (dummy data only), if the owner wants them
- highlights for the small projects (data/projects.ts has TODO comments)
- Open question 1: year. data/projects.ts says 2025 for lost-and-found-system and it-problem-reporting, but the app screenshots show Spring 2026 / 2026 dates. Owner to confirm.
- Open question 2: the Lost & Found app credits a co-developer (Muhammad Ahmed Asim). Owner to say whether the project text should mention a team.
- Year of study, SSC/HSSC details, profile photo
- NEXT_PUBLIC_SITE_URL: set to the real domain after Step 10 (the Vercel fallback works until then).
- RESEND_API_KEY must also be added in Vercel (Settings, Environment Variables) at Step 10.
- GitHub profile bio is out of date (says FAST-NUCES Peshawar, different email, portfolio "coming soon"). Owner may update before deploying.
- Weather repo is named Whether_APP on GitHub (typo). Link works; if renamed, update githubUrl in data/projects.ts.
- Pathfinder: drag-to-draw walls only works with a mouse; touch devices can tap one cell at a time. (Planned in F8.)

## Current step notes
Current focus: the feature phase. Next in line: F2 (print-friendly resume), then F3 and F4 using NEXT_STEP_GAMES_AND_LOST_FOUND.md.
To start F2 the assistant needs: cat app/resume/page.tsx and grep -n "print" app/globals.css.
Lighthouse has not been run yet; do it on a production build and send the failing item names.
How to give the assistant context in a new chat: attach PORTFOLIO_BUILD_BRIEF.md, SESSION_STARTER.md, PROGRESS.md,
NEXT_STEP_GAMES_AND_LOST_FOUND.md, and the files produced by: bash scripts/make-context.sh (next-context.txt and file-list.txt).

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
- Step 9: lib/site.ts (getSiteUrl), metadataBase and canonical in layout, generated OG and Twitter image, robots.ts, sitemap.ts
  (static pages, projects, posts, tags), JSON-LD (Person, BlogPosting), security headers, footer tap targets, labelled blog nav,
  JetBrains Mono preload off.
- Feature phase so far: GitHub links and screenshots for three projects, per-image alt text, 16:9 project cards.
