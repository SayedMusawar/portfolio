# Portfolio Website: Build Brief

**Owner:** Muhammad Musawar Ali Shah
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui + MDX
**Hosting:** Vercel (free tier), GitHub for source
**Database:** None at launch. All content lives in files in the repo.

Paste this whole file at the start of any build session. Then say which step of the build order (section 9) you are on.

---

## 1. What this site is

- **Subject:** the personal portfolio of a Computer Science student at FAST-NUCES Karachi who builds full-stack apps, desktop apps, games, and studies AI/ML.
- **Audience:** internship recruiters, engineers reviewing GitHub links, university peers, and readers of the blog.
- **Primary job:** in under 30 seconds, show that this person builds real things, and make it easy to open a project, read a post, or get in touch.
- **Secondary job:** a home for blog writing that grows over time.

## 2. Hard rules

1. **No gradients anywhere.** No `bg-gradient-*`, no `linear-gradient`, no `radial-gradient`, no gradient text, no gradient borders, no glow blurs that read as gradients. Flat colors only.
2. Fully responsive: design mobile-first, check 360px, 768px, 1024px, 1440px.
3. Dark and light themes, both fully designed, toggle saved in `localStorage`, defaults to system preference.
4. Accessible: visible keyboard focus, semantic HTML, alt text, contrast at least WCAG AA, `prefers-reduced-motion` respected.
5. Fast: Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO. Use `next/image` and `next/font`.
6. Never invent facts about me. Use only the data in section 6. If something is missing, leave a clearly marked `TODO` instead of making it up.

## 3. Design system

### Color tokens (flat, no gradients)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F7F8FA` | `#0E1116` | page background |
| `--surface` | `#FFFFFF` | `#161B22` | cards, panels |
| `--border` | `#DDE1E7` | `#2A313C` | outlines, dividers |
| `--text` | `#14181F` | `#E8ECF1` | main text |
| `--muted` | `#5B6472` | `#9AA4B2` | secondary text |
| `--accent` | `#1F4DFF` | `#4D7CFF` | links, buttons, highlights (electric blue) |
| `--accent-fg` | `#FFFFFF` | `#0E1116` | text on accent |

Accent is used for: primary buttons, links, focus rings, the active nav item, and one big graphic moment on the home page. Nowhere else. Restraint makes the blue feel electric.

### Typography

- **Display and headings:** *Space Grotesk* (600-700), tight tracking on large sizes.
- **Body and UI:** *Inter* (400-500).
- **Code and small technical text:** *JetBrains Mono*. Use it only for real code, terminal output, and the algorithm visualizer, not as decoration on labels.
- Type scale: 14 / 16 / 18 / 24 / 32 / 48 / 72 (fluid with `clamp()` for headings).
- Body line length under 75 characters. Line-height 1.6 for body, 1.1 for large headings.
- Sentence case everywhere. No all-caps labels, no eyebrow text above every heading.

### Layout and shape

- Max content width 1120px, generous vertical rhythm (96px between major sections on desktop, 64px on mobile).
- Left-aligned text by default. Center only the hero call-to-action row if it helps.
- **Two border radii only:** 12px for cards/panels, 999px for pills and buttons. No mixing beyond that.
- Depth from **1px borders**, not shadows. One subtle shadow allowed on hover for cards.
- Use a **bento grid** on the Skills section and on the Projects highlights. Vary tile sizes based on importance (flagship project gets a large tile).

### Motion

- One orchestrated moment: the hero (name and headline appear in a short staggered sequence on first load, about 600ms total).
- Everything else motion-wise responds to user action: hover states, expanding cards, theme toggle, filter changes, page transitions of 150-200ms.
- Do **not** add fade-slide-up on every section. Keep scroll motion to nothing or a very simple reveal for the projects grid only.
- Respect `prefers-reduced-motion`: disable the hero sequence and transitions.

### The one memorable element

An **interactive pathfinding visualizer** (BFS / DFS / A*) on a small grid, placed on the home page below the hero or in the AI/ML section. The visitor clicks cells to draw walls, picks an algorithm, and watches it search. Flat colors only: walls in `--text`, visited cells in a tint of `--accent` (a flat lower-opacity fill, not a gradient), path in solid `--accent`. This directly shows AI-coursework skills in a way a bullet list cannot.

## 4. Site map

```
/                    Home (hero, featured projects, visualizer, latest posts, contact strip)
/about               Story, education, leadership
/projects            Filterable grid: All / Web / Desktop / Games / AI
/projects/[slug]     Project detail page
/skills              Bento grid grouped by category
/ai-lab              AI/ML topics + interactive visualizer (full size)
/blog                Post list with tags and search
/blog/[slug]         Post page (MDX)
/blog/tag/[tag]      Posts filtered by tag
/resume              On-page resume + PDF download
/contact             Form + social links
/rss.xml             Blog feed
/sitemap.xml         Auto-generated
```

Navigation: logo/name on the left, links (Projects, Skills, AI Lab, Blog, About), theme toggle and a "Contact" button on the right. Collapses to a slide-in menu on mobile.

## 5. Folder structure

```
portfolio/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    skills/page.tsx
    ai-lab/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    blog/tag/[tag]/page.tsx
    resume/page.tsx
    contact/page.tsx
    api/contact/route.ts
    rss.xml/route.ts
    sitemap.ts
    globals.css
  components/
    ui/                    (shadcn components)
    site-header.tsx
    site-footer.tsx
    theme-toggle.tsx
    hero.tsx
    project-card.tsx
    project-filter.tsx
    skill-tile.tsx
    post-card.tsx
    contact-form.tsx
    pathfinder/            (visualizer components)
  content/
    posts/                 (one .mdx file per blog post)
  data/
    profile.ts
    projects.ts
    skills.ts
    timeline.ts
  lib/
    posts.ts               (read + parse MDX frontmatter)
    utils.ts
  public/
    images/projects/
    resume/Musawar_Ali_Shah_Resume.pdf
    og-default.png
```

## 6. Content data (single source of truth)

### Profile

- **Name:** Muhammad Musawar Ali Shah
- **Role line:** Computer Science student building full-stack apps, desktop software, and AI experiments.
- **Location:** Karachi, Pakistan
- **University:** FAST-NUCES (National University of Computer and Emerging Sciences), BS Computer Science, 2024 to present. Started at the Peshawar campus, now at the Karachi campus.
- **Email:** musawaratwork@gmail.com
- **GitHub:** github.com/SayedMusawar
- **LinkedIn:** linkedin.com/in/muhammad-musawar-ali-shah-427128321
- **TODO (owner to confirm):** current year of study, SSC/HSSC dates, profile photo.

### Projects

| Slug | Title | Category | Year | Stack | Featured |
|---|---|---|---|---|---|
| `lost-and-found-system` | Lost & Found Intelligence System | Web | 2025 | React, FastAPI, PostgreSQL, Axios | Yes (flagship) |
| `it-problem-reporting` | IT Components Problem Reporting System | Desktop | 2025 | Java, Swing, OOP | Yes |
| `chess-game` | Chess Game | Games | 2024 | C++, Qt | Yes |
| `snake-game` | Snake Game | Games | 2024 | C++, SFML | No |
| `weather-app` | Weather Application | Web | 2024 | JavaScript, REST API | No |
| `todo-app` | To-Do List Application | Desktop | 2024 | C++, Qt | No |
| `youtube-clone` | YouTube Clone (static front end) | Web | 2024 | HTML, CSS | No |
| `spotify-clone` | Spotify Clone (interface) | Web | 2024 | HTML, CSS | No |
| `small-projects` | Calculator, Countdown Timer, Number Guessing, Rock Paper Scissors | Misc | 2024 | HTML/CSS, Python | No (group into one entry) |

Each project has: `slug`, `title`, `summary` (one sentence), `description` (short paragraphs), `category`, `year`, `stack[]`, `highlights[]` (3-4 bullets), `githubUrl`, `liveUrl` (optional), `images[]`, `featured`.

**Lost & Found highlights (from resume):** replaced a manual register-based process at the university; 9-table PostgreSQL schema with custom ENUMs, cascade deletes, and audit logging; role-based access for Admin, Staff, Student, and Faculty; SHA-256 password hashing and parameterized queries; item registration and search, claim submission and review, digital receipts, in-app notifications.

**IT Problem Reporting highlights:** role-based workflows for Students, Faculty, IT Staff, and Admins; complaint submission, priority assignment, status tracking, reports; layered architecture (model, repository, service, UI); enum-driven state machines.

**Chess highlights:** full chess rules and piece movement, turn-based gameplay, OOP class design and inheritance, interactive Qt GUI.

**Snake highlights:** real-time game loop, keyboard controls, collision detection, SFML.

### Skills (group exactly like this)

- **Languages:** Python, C++, C, Java, JavaScript (basic)
- **Web:** React, FastAPI, HTML5, CSS3, REST APIs, Axios
- **Databases:** PostgreSQL, MySQL, SQLite
- **Desktop and games:** Qt, SFML, Java Swing
- **AI and ML (coursework level):** BFS, DFS, UCS, A*, Iterative Deepening, Bidirectional Search, Hill Climbing, Simulated Annealing, Minimax, Alpha-Beta Pruning, CSP (N-Queens), Linear and Logistic Regression, Gradient Descent, Naive Bayes, K-Means, K-NN, Neural Networks
- **Python libraries:** NumPy, Pandas, Matplotlib, NetworkX, Scikit-learn
- **Familiar with (not expert):** TensorFlow, PyTorch, OpenAI APIs
- **Tools:** Git and GitHub, Linux (Ubuntu, Arch), VS Code, IntelliJ IDEA, Eclipse
- **Concepts:** OOP, Data Structures, Algorithms, SDLC, Software Design and Analysis

Keep the "familiar with" wording. Do not present those as expert skills.

### Leadership and other

- **Microsoft Learn Student Ambassador (MLSA), 2025-2026:** selected for Microsoft's global student leadership program; organizes and takes part in technical workshops and peer-learning sessions on campus.
- **IEEE Student Member, 2024 to present:** technical events and workshops.
- **Video Editing, Animation and Vlogging, DigiSkills DSTP 3.0 (Batch-01), Aug to Nov 2025.**

### Relevant coursework

OOP, Data Structures, Algorithms, Database Systems, Artificial Intelligence, Software Design and Analysis, Operating Systems, Computer Organization and Assembly Language, Theory of Automata, Discrete Structures, Linear Algebra, Probability and Statistics.

## 7. Feature specs

### Home
1. **Hero:** name in large Space Grotesk, one-line role, two buttons ("View projects" primary, "Read the blog" secondary), small line with location and university. Right side (desktop) or below (mobile): a flat geometric graphic or the visualizer teaser. No gradients, no stock illustrations.
2. **Featured projects:** bento grid, flagship project as the large tile.
3. **Visualizer teaser** linking to `/ai-lab`.
4. **Latest posts:** 3 most recent, or a friendly empty state ("First posts are on the way") if none.
5. **Contact strip:** email and social links.

### Projects page
- Filter pills (All, Web, Desktop, Games, AI, Misc), filtering changes with a quick layout transition.
- Card: image, title, one-line summary, stack pills, year.
- Detail page: title, summary, gallery, "What I built" paragraphs, highlights, stack, GitHub and live buttons, next/previous project links.

### Skills page
- Bento grid, one tile per category, each with the skill list. AI/ML tile is largest. Hover on a skill pill shows nothing fancy, just a state change. No fake percentage bars (they mean nothing).

### AI Lab
- Full visualizer: grid, click/drag to place walls, draw start and end, algorithm select (BFS, DFS, A*), speed slider, reset, and step counter (visited cells, path length).
- Below it: short plain-English explanations of each algorithm, and a list of ML topics studied in coursework.

### Blog
- MDX files in `content/posts/` with frontmatter: `title`, `date`, `summary`, `tags[]`, `draft` (boolean).
- List page: search box (client-side), tag filters, reading time.
- Post page: table of contents, code blocks with syntax highlighting (`rehype-pretty-code` or `shiki`), copy button on code, share links, previous/next post.
- RSS feed and per-post Open Graph metadata.
- Comments (optional, later): Giscus.

### Contact
- Form: name, email, message, honeypot field for spam. Sends through Resend (or Formspree) from `app/api/contact/route.ts`. Clear success and error messages that say what happened and what to do next.
- Also show email, GitHub, and LinkedIn links.

### Resume page
- On-page version plus a "Download PDF" button. Only one current resume file.

### SEO and meta
- `metadata` per page, Open Graph image, `sitemap.ts`, `robots.txt`, JSON-LD `Person` schema on the home page.

## 8. Packages

```
next react react-dom typescript tailwindcss
framer-motion
next-themes
lucide-react
@next/mdx @mdx-js/loader @mdx-js/react gray-matter
rehype-pretty-code shiki remark-gfm rehype-slug rehype-autolink-headings
reading-time
resend            (contact form)
zod               (form validation)
```

shadcn/ui components to add as needed: button, badge, input, textarea, sheet (mobile menu), tabs, card.

## 9. Build order (one step per chat session)

1. **Scaffold and design system:** create the Next.js project, Tailwind config with the tokens above, fonts, theme toggle, header, footer, base layout.
2. **Data files:** `profile.ts`, `projects.ts`, `skills.ts`, `timeline.ts` from section 6.
3. **Home page:** hero, featured projects bento, latest posts placeholder, contact strip.
4. **Projects:** list page with filters, detail pages.
5. **Skills and About pages.**
6. **AI Lab:** the pathfinding visualizer.
7. **Blog system:** MDX pipeline, list page, post page, tags, RSS, first sample post.
8. **Contact form and resume page.**
9. **SEO, accessibility pass, Lighthouse fixes.**
10. **Deploy to Vercel, connect custom domain.**

## 10. Definition of done for each step

- Works at 360px and 1440px wide, in light and dark theme.
- No gradients (search the code for `gradient` before finishing).
- Keyboard navigation works and focus is visible.
- No TypeScript errors, no console errors.
- The code is complete files, ready to paste, with the file path written above each one.

## 11. How to talk to the AI each session

1. Paste this brief.
2. Say: "We are on step N. Give me complete files with the path above each one."
3. After pasting the code and running it, describe any error by copying the exact message.
4. Ask for one change at a time when refining the design.
