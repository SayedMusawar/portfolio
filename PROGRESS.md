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
- [ ] Step 8: contact form and resume page  <-- NEXT
- [ ] Step 9: SEO, accessibility, Lighthouse
- [ ] Step 10: deploy to Vercel

## Environment
- Ubuntu, Node LTS via nvm, VS Code, npm
- Next.js 16 (Turbopack), Tailwind v4 (no tailwind.config file, tokens are in app/globals.css)
- Dev server: npm run dev (if port 3000 is busy: pkill -f "next dev")
- Steps 0-7 committed to git

## Files that exist and work
- app/layout.tsx, app/page.tsx (home), app/globals.css (has a shiki dual-theme block appended at the end, Step 7)
- app/projects/page.tsx (list with filter), app/projects/[slug]/page.tsx (detail, generateStaticParams, generateMetadata)
- app/skills/page.tsx (bento grid), app/about/page.tsx (story, facts, education, leadership, coursework)
- app/ai-lab/page.tsx (full pathfinding visualizer + algorithm notes + coursework tag list)
- app/blog/page.tsx (server component, calls getAllPosts/getAllTags, renders BlogList)
- app/blog/[slug]/page.tsx (async, compiles MDX via lib/posts.ts, renders TOC + share links + prev/next)
- app/blog/tag/[tag]/page.tsx (filtered list, generateStaticParams from tags, 404s on empty tag)
- app/rss.xml/route.ts (generates RSS XML from getAllPosts)
- content/posts/hello-world.mdx (sample post: frontmatter, a code block, two h2 headings)
- lib/posts.ts: getAllPosts, getLatestPosts, getAllTags, getPostsByTag, getAdjacentPosts,
  getPostSlugsForParams, getPostContent (async — compiles MDX with @mdx-js/mdx's evaluate() at
  request time, NOT via @next/mdx's webpack/Turbopack loader — see "Decisions" below).
  fs-based, so it must only ever be imported from Server Components, never from a "use client" file.
- components/: site-header, site-footer, theme-toggle, theme-provider, hero, project-card, post-card,
  project-filter, skill-tile, timeline-section, blog-list (client, search + tag filter),
  blog-mdx-components (MDX element overrides), code-block (client, copy button on code fences),
  table-of-contents (static list from headings), share-links (client, X/LinkedIn/copy link)
- components/pathfinder/: path-graphic.tsx (still frame, used on home page teaser),
  algorithms.ts (bfs, dfs, astar, pure functions returning visitedInOrder + path),
  pathfinder.tsx (client component: grid, tool picker, speed slider, Visualize/Reset/Clear walls)
- components/ui/: shadcn files (button.tsx is hand-written, see below)
- data/: profile.ts, projects.ts (with getProject, getFeaturedProjects, getAdjacentProjects, projectCategories), skills.ts, timeline.ts
- app/resume, app/contact are still "Coming soon" stubs; components/contact-form.tsx still empty

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
- Pathfinder animation timing: staggered by the speed-slider delay per visited cell; path draws at half
  that delay; both collapse to 0ms when prefers-reduced-motion is set.
- Blog MDX is compiled at request time in lib/posts.ts with @mdx-js/mdx's evaluate() function, not by
  importing .mdx files as modules through @next/mdx's loader. Reason: Next 16's Turbopack MDX compiler
  (mdxRs) doesn't run arbitrary JS remark/rehype plugins like rehype-pretty-code, so the loader approach
  wouldn't support syntax highlighting. next.config.ts and the root mdx-components.tsx are untouched and
  unused by the blog. Requires @mdx-js/mdx as a direct dependency (installed Step 7).
- Table of contents headings/ids are generated by a hand-written slugify function in lib/posts.ts that
  approximates rehype-slug's ids closely but isn't guaranteed identical for unusual heading text.
- Code block copy button is a client component wrapping <pre> and reading its own textContent, not
  passed the raw code string as a prop.
- RSS feed and share links read the site URL from NEXT_PUBLIC_SITE_URL, defaulting to
  http://localhost:3000 until it's set (see Known TODOs).

## Problems already solved (do not repeat)
- Lone ">" on its own line in JSX caused "Unexpected token" parse errors (layout.tsx, page.tsx).
  Keep JSX opening tags compact, and avoid very long className strings on one line.
- A line containing only "<a" (or another tag name) was dropped when pasting, which broke
  app/projects/[slug]/page.tsx, and again in Step 7 broke components/share-links.tsx and
  components/blog-mdx-components.tsx (multi-line <a ...> tags with attributes on their own lines
  turned into orphaned attribute lines with no tag start). Rule: write every JSX opening tag's name
  and all its attributes on ONE line, however long, never split across lines. Write "<a href={...}
  target=..." on one line, and replace whole files instead of patching. Check with: grep -c "<a " file
- Terminal commands (cat > file << 'EOF') were once pasted INTO a .tsx file. When a step needs
  a terminal command, say clearly "run in terminal". When it needs a file, say "paste into file".
- npx tsc --noEmit can show stale errors from .next/dev/types: fix with rm -rf .next
  (stop the dev server first, then run rm -rf .next)
- Sheet component needs the icon-sm button size (already added).
- grep for "gradient" matches "Gradient Descent" in data/skills.ts. That is a false positive.
- Next.js 16: dynamic route params are a Promise (await params) in page components.
- Lint error react-hooks/set-state-in-effect in components/theme-toggle.tsx: replaced the
  useState + useEffect mounted flag with useSyncExternalStore(() => () => {}, () => true, () => false).
- git push said "No configured push destination": added the remote with
  git remote add origin https://github.com/SayedMusawar/portfolio.git
- git push said "Password authentication is not supported": GitHub needs a personal access token
  (classic, repo scope) in the password prompt. Credentials are saved with
  git config --global credential.helper store. Never paste the token into files or chats.

## Rules that never change
- No gradients anywhere (check: grep -rniE "gradient" app components data lib)
- Two radii only, 1px borders instead of shadows (one subtle hover shadow on cards)
- Sentence case, no all-caps labels
- Never invent facts about the owner. Use TODO for unknowns.
- Give complete files with the path above each one, and say whether each is a file or a terminal command.
- Write every JSX opening tag (name + all attributes) on one line, never split across lines.

## Known TODOs (owner to fill in)
- githubUrl for each project, screenshots (files in public/images/projects/ and paths in the images array),
  highlights for the small projects
- Year of study, SSC/HSSC details, profile photo, resume PDF, og-default.png
- NEXT_PUBLIC_SITE_URL env var: not set yet, defaults to http://localhost:3000. Set it to the real
  domain after Step 10 (deploy) — used by app/rss.xml/route.ts and the share links on blog posts.

## Current step notes
Step 7 code generated, hit and fixed the recurring "lone <a" paste bug (see Problems already solved),
should be verified working now. Before starting Step 8: confirm the Step 7 checklist passes, then
`git add -A && git commit -m "Step 7: blog system (MDX)" && git push`.

Step 8 not started. Needs: components/contact-form.tsx (name, email, message, honeypot field, zod
validation), app/api/contact/route.ts (send via Resend, already a dependency), clear success/error
states on the form, app/contact/page.tsx (form + email/GitHub/LinkedIn links, replacing the stub),
app/resume/page.tsx (on-page resume from data/profile.ts + timeline.ts, "Download PDF" button —
note public/resume/ has no PDF yet, that's a Known TODO, so the button should be left as a clearly
marked TODO or hidden until the file exists, not a broken link).

## Step 5: Skills and About pages (done)

- Built /skills (bento grid from data/skills.ts) and /about (story, facts card, education, leadership,
  other training, coursework, contact section).
- Files: app/skills/page.tsx, app/about/page.tsx, components/skill-tile.tsx (replaced),
  components/timeline-section.tsx (new).
- Skills grid: 1 column on mobile, 2 at md, 6 at lg. Large tile spans 4 columns and 2 rows, all other
  tiles span 2.
- Colors are written as bg-[var(--surface)] and border-[color:var(--border)] so no Tailwind theme
  mapping is needed.
- Buttons and links are plain Link and a tags with classes, no asChild.
- TODO (owner to confirm): profile photo and current year of study. Left as a code comment in
  app/about/page.tsx.

## Step 6: AI Lab pathfinding visualizer (done)

- Built components/pathfinder/algorithms.ts (pure BFS, DFS, A* functions), components/pathfinder/pathfinder.tsx
  (interactive grid, 12x20 cells, draw walls, move start/end, speed slider, Visualize/Reset/Clear walls,
  keyboard-accessible cells), app/ai-lab/page.tsx (full visualizer + per-algorithm explanations +
  coursework topic tags).
- Colors reuse bg-brand / bg-brand/25 / bg-foreground / bg-surface, matching components/pathfinder/path-graphic.tsx.
- Drag-to-draw walls only works with a mouse; touch devices can tap one cell at a time. Known trade-off,
  not fixed.

## Step 7: Blog system (done)

- Built lib/posts.ts (reads content/posts/*.mdx with gray-matter + reading-time for metadata, compiles
  MDX to a React component per post with @mdx-js/mdx's evaluate() — see Decisions above for why).
- app/blog/page.tsx (server) + components/blog-list.tsx (client: search box, tag pills, filters
  client-side over posts passed as props).
- app/blog/tag/[tag]/page.tsx: filtered list, generateStaticParams from tags, notFound() on empty tag.
- app/blog/[slug]/page.tsx: renders compiled MDXContent with components/blog-mdx-components.tsx
  overrides, a static table of contents (components/table-of-contents.tsx) from h2/h3 headings,
  share links (components/share-links.tsx: X, LinkedIn, copy link), prev/next post links.
- components/code-block.tsx: client component, copy button reads its own <pre> textContent.
- app/rss.xml/route.ts: hand-built RSS XML from getAllPosts(), no package added for this.
- content/posts/hello-world.mdx: sample post so the list page isn't empty (title "Hello, world",
  tag "meta", includes a Python code block and two h2 sections to exercise highlighting + TOC).
- globals.css: appended a small block pairing rehype-pretty-code's shiki dual-theme CSS vars with the
  .dark class toggle (not the rest of the file rewritten).
- Hit the "lone <a on its own line gets dropped on paste" bug again in share-links.tsx and
  blog-mdx-components.tsx — see Problems already solved for the fix and the new rule.