# Next step: playable games and the Lost & Found link

Features F3 (playable Snake and Chess) and F4 (Lost & Found live link) from PROGRESS.md.
OWNER DECISION (2026-10-04): no rewrite in TypeScript or any other language. The existing C++ games are connected to the site (WebAssembly).
Written 2026-10-04. Read PROGRESS.md and PORTFOLIO_BUILD_BRIEF.md first. All portfolio rules still apply
(flat colors, no gradients, one-line JSX tags, no asChild, never invent facts).
Do not suggest rewriting the games in TypeScript. If something blocks the C++ route, report the exact blocker and let the owner decide.

## 1. The plan: compile the existing C++ to WebAssembly

Both games stay C++. They are compiled with Emscripten to WebAssembly (a .wasm file the browser runs) and embedded on the site.
Your repositories remain the source of truth.

| Game | Library | Browser route | How much changes in your code |
|---|---|---|---|
| Chess | Qt Widgets | Qt for WebAssembly | Little or none. Qt's docs say Qt Widgets is supported. Emscripten must match your Qt version (for Qt 6.11.1 the docs list Emscripten 4.0.7). Source: https://doc.qt.io/qt-6/wasm.html |
| Snake | SFML | needs a browser-capable graphics layer (see below) | The window, drawing and input calls change; your game logic stays |

Why Snake needs more work: official SFML does not target the browser. SFML forum answers say it can be done but needs
SFML's OpenGL code reworked for OpenGL ES and all dependencies compiled for Emscripten (https://en.sfml-dev.org/forums/index.php?topic=19075.0).
Those posts are old, so this must be re-checked, but I found no official SFML browser support. These C++ options exist:

- **S1. SMK (Simple Multimedia Kit).** Its author wrote it to port SFML games to WebAssembly. SFML-like API, not identical. https://github.com/ArthurSonzogni/smk
- **S2. VRSFML.** Vittorio Romeo's SFML fork with first-class Emscripten support. It modernizes the API, so some call sites change. https://github.com/vittorioromeo/VRSFML
- **S3. SDL2.** Emscripten ships an SDL2 port. You replace the SFML window, drawing and input calls with SDL2 calls.
- **S4. A thin shim.** A small header that implements only the SFML classes your Snake uses, on top of SDL2, so the original source needs very few edits. Decide this after reading the code (section 5).

Also needed for any option: a browser cannot run a blocking `while (window.isOpen())` loop.
Either change it to Emscripten's main-loop call (small change) or build with `-sASYNCIFY`, which lets a blocking loop work at some cost in size and speed.

Not recommended: running the native game on a server and streaming video to visitors. It needs an always-on server, costs money, and is a security risk.
Optional extra: put Windows and Linux builds on GitHub Releases and add Download buttons next to Play.

Be honest on the page: Snake's graphics layer is adapted for the browser, so say "C++ compiled to WebAssembly" and name the layer used. Do not say "unchanged".

## 2. Decisions to make before coding

1. Snake route (S1 to S4): decide after the code inspection in section 5. The assistant recommends one from the evidence.
2. Lost & Found: is the app already deployed somewhere with a public URL? (Part D, case 1 or 2)
3. Where do games live on the site? Suggested: `/play` (index), `/play/snake`, `/play/chess`, and a "Play in browser" button on the project pages.
4. Add Download buttons (GitHub Releases) next to Play? Optional.

## 3. Labels the site must use (never claim more than is true)

- Chess: "Playable in your browser. This is the original C++ and Qt code compiled to WebAssembly."
- Snake: "Playable in your browser. This is my C++ game compiled to WebAssembly. The graphics and input layer was adapted for the browser (<SMK, VRSFML or SDL2>)."
- Always keep the GitHub link to the C++ repo next to the Play button.

## 4. Part A: Chess (Qt for WebAssembly)

### A0. Inspect the repo first (run in terminal, paste the output to the assistant)

```bash
cd ~/path/to/Chess-Game        # your chess repo folder
ls
qmake --version                # or: qtpaths --version
grep -rn "QT +=\|find_package(Qt\|target_link_libraries" CMakeLists.txt *.pro 2>/dev/null
grep -rln "QThread\|QtConcurrent\|QMediaPlayer\|QSound\|QFileDialog\|QNetwork" . --include=*.cpp --include=*.h
ls *.qrc 2>/dev/null; grep -rn "QPixmap\|QIcon\|:/" . --include=*.cpp | head -20
```

What matters:
- Only Qt Widgets (plus Core and Gui)? Good. Sound, network or file dialogs need changes for the browser.
- Piece images loaded from a `.qrc` resource file (":/...") work in WebAssembly. Images loaded from disk paths will not; they must move into the `.qrc`.
- Threads: avoid them. Pick the single-threaded WebAssembly kit so the page needs no special headers.

### A1. Build steps

1. Check your Qt version: `qmake --version`. Open https://doc.qt.io/qt-6/wasm.html and find the Emscripten version for your Qt minor version.
2. In the Qt Online Installer or Maintenance Tool, add the "WebAssembly" component for your Qt version (single-threaded kit is simplest).
   Kit folder names vary: run `ls ~/Qt/*/` to see them.
3. Install the matching Emscripten (replace 4.0.7 with the version the docs list for YOUR Qt):

```bash
git clone https://github.com/emscripten-core/emsdk.git ~/emsdk
cd ~/emsdk
./emsdk install 4.0.7
./emsdk activate 4.0.7
source ./emsdk_env.sh
em++ --version
```

4. Build with the Qt WebAssembly kit (easiest in Qt Creator: choose the WebAssembly kit and build). On the command line:

```bash
# CMake project (adjust the Qt path and kit folder name to your install):
~/Qt/6.x.x/wasm_singlethread/bin/qt-cmake -S . -B build-wasm
cmake --build build-wasm

# qmake project:
~/Qt/6.x.x/wasm_singlethread/bin/qmake && make
```

5. Test locally:

```bash
cd build-wasm
python3 -m http.server 8080     # then open http://localhost:8080/<yourapp>.html
```

6. Copy the output (`<app>.html`, `<app>.js`, `<app>.wasm`, `qtloader.js`, `qtlogo.svg`) into `public/games/chess/`. Check size: `du -h public/games/chess/*`.
7. Known gotchas: the Emscripten version must match Qt's; `QMessageBox` dialogs work but appear inside the canvas;
   a multi-threaded kit needs the headers `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`;
   a large .wasm slows the first load (measure it).
8. Embedding: Play button first, then an `<iframe src="/games/chess/<app>.html">` (see Part C). The game never loads for Lighthouse.
9. Git: if the build is over about 50 MB, do not commit it; host it elsewhere or build in CI.

If the build fails: stop, copy the exact error and send it. Do not switch to another language without the owner's decision.

## 5. Part B: Snake (existing C++ in the browser)

### B0. Inspect the repo first (run in terminal, paste the output to the assistant)

```bash
cd ~/path/to/snake_game        # your snake repo folder
ls -R | head -60
grep -rhoE "sf::[A-Za-z0-9_]+" . --include=*.cpp --include=*.h --include=*.hpp | sort | uniq -c | sort -rn
grep -rn "isOpen\|pollEvent\|while *(" . --include=*.cpp | head -20
grep -rn "loadFromFile\|openFromFile\|\.ttf\|\.png\|\.wav\|\.ogg" . --include=*.cpp --include=*.h | head -20
ls CMakeLists.txt Makefile *.pro 2>/dev/null; sfml-config --version 2>/dev/null || pkg-config --modversion sfml-all 2>/dev/null
```

How the assistant will decide:
- Uses only RenderWindow, RectangleShape or CircleShape, Event, Keyboard, Clock (and maybe Text and Font)? Then S4 (thin shim) or S1 (SMK) is a small job.
- Uses sf::Sound or sf::Music? More work (audio in the browser needs a user click first and an audio backend).
- Loads fonts, images or sounds from files? They must be packed into the build (Emscripten `--preload-file`), so paths must be relative.
- Which SFML version (2.x or 3)? It changes how well each option fits.

### B1. Build steps (typical; the assistant will give exact files once the route is chosen)

```bash
git clone https://github.com/emscripten-core/emsdk.git ~/emsdk     # skip if already done for chess (any version is fine for Snake)
cd ~/emsdk && ./emsdk install latest && ./emsdk activate latest && source ./emsdk_env.sh
cd ~/path/to/snake_game
emcmake cmake -S . -B build-em && cmake --build build-em
```

Typical link options (verify on https://emscripten.org): `-sUSE_SDL=2` for the SDL2 route, `--preload-file assets@/assets` for game files,
`-sALLOW_MEMORY_GROWTH=1`, and `-sASYNCIFY` only if you keep a blocking main loop.
Output: `snake.html`, `snake.js`, `snake.wasm` (and `snake.data` if files are preloaded). Copy to `public/games/snake/`.

### B2. Browser details
- The canvas needs keyboard focus; the page wrapper should focus it on Play and show the controls as text.
- Phones have no keyboard: the HTML wrapper (not the game code) can add on-screen arrow buttons that send key events to the canvas.
- Audio starts only after a click, which the Play button already provides.
- If the game does not exit cleanly or restarts oddly in the browser, ask the assistant before changing game rules. Do not change your game rules.

## 6. Part C: site integration (both games)

Files the assistant will create or change (it will ask you to `cat` the ones it has not seen):
- `data/projects.ts`: add `playUrl?: string` to the `Project` type; set it for `chess-game` and `snake-game` (e.g. `/play/chess`).
- `app/projects/[slug]/page.tsx`: show a primary "Play in browser" button when `playUrl` exists (internal Link, `buttonVariants`, no asChild).
- `app/play/page.tsx`: index with two cards. `app/play/snake/page.tsx` and `app/play/chess/page.tsx`: title, short controls text, the honest label (section 3), GitHub link, the game frame.
- `components/games/wasm-game-frame.tsx`: a client component. It shows a poster and a Play button; on click it inserts an iframe pointing at `/games/<game>/<app>.html`,
  with a title, a fixed aspect-ratio box, an "Open in a new tab" link and a Fullscreen button. Nothing from the game loads before the click.
- `public/games/chess/` and `public/games/snake/`: the compiled files.
- `next.config.ts`: only if a build needs special headers (cross-origin isolation), and only for `/games/*`.
- `app/sitemap.ts`: add the `/play` routes. Optional: a "Play" link in the header (ask the owner first).

Quality bar for every game page:
- Works at 360px and 1440px, light and dark theme.
- Keyboard works and focus is visible; do not trap focus (provide an Escape or "Back to page" way out); show controls as text.
- Touch works (Chess: tap to select and move; Snake: on-screen arrows from the wrapper).
- Lighthouse on the game page is still 90+ (the download happens only after Play).
- No console errors on the site pages, `npx tsc --noEmit` and `npm run lint` clean.

## 7. Part D: link to the Lost & Found app

The project page already shows a "Live site" button when `liveUrl` is set in `data/projects.ts`. So adding the link is one line,
but the app has to exist at a public URL first.

### Case 1: it is already deployed
1. Open the URL in a private window. Check HTTPS, that it loads on a phone, and that the demo accounts on the login screen work.
2. Add `liveUrl: "https://..."` to the `lost-and-found-system` entry in `data/projects.ts`. Done.
3. Because free hosts sleep, consider the button text "Live demo (may take a moment to wake up)". Ask the assistant to adjust the label if needed.

### Case 2: it only runs on your laptop
Typical free setup (check current limits before you commit; free tiers change):
- Frontend (React, built to static files): Vercel or Netlify, free.
- Backend (FastAPI): Render free web service. It sleeps after about 15 minutes idle, so the first request can take 30 to 60 seconds.
- PostgreSQL: Neon (permanent free tier, about 0.5 GB, scales to zero) or Supabase (free, pauses after a week idle).
  Do not use Render's free PostgreSQL: it is deleted after 30 days.
Sources checked: https://publicapis.dev/blog/free-api-hosting , https://swyftstack.com/blog/free-postgresql-hosting

Steps:
1. In the app repo, find hard-coded `localhost` API URLs in the frontend and move them to an environment variable (the Axios base URL).
2. Backend: read `DATABASE_URL`, the allowed frontend origin (CORS) and any secret key from environment variables. Never commit them.
3. Export your 9-table schema (structure only) and load it into the hosted database; add demo rows. Keep real student data out.
4. Deploy backend, then frontend, then set `liveUrl` in the portfolio.
5. Security for a public demo (important): your resume says passwords use SHA-256. For a public demo use only dummy accounts and data,
   do not let visitors register real credentials, rate-limit the API, keep the demo accounts' passwords separate from any real ones,
   and consider a nightly reset of demo data.

Commands to run in the Lost & Found repo to prepare (paste output to the assistant, but remove any secrets first):

```bash
ls
cat package.json
cat requirements.txt
grep -rn "localhost\|127.0.0.1" --include=*.js --include=*.jsx --include=*.ts --include=*.tsx --include=*.py . | grep -v node_modules | head -30
grep -rn "CORS\|allow_origins" --include=*.py . | head
```

## 8. Definition of done for this step

- Chess and Snake are playable from the site on desktop and phone, built from your existing C++ with honest labels and links to the C++ repos.
- `/projects/chess-game` and `/projects/snake-game` show "Play in browser".
- The Lost & Found project page shows a working live link (or a clear "coming soon" if hosting is not ready).
- Lighthouse re-run on `/`, `/projects`, `/play`, a game page: all four scores 90+.
- PROGRESS.md updated (F3 and F4 ticked, decisions and problems recorded), then committed and pushed.

## 9. Handoff: what to attach to the new chat

Always: `PORTFOLIO_BUILD_BRIEF.md`, `SESSION_STARTER.md`, `PROGRESS.md`, this file, `next-context.txt`, `file-list.txt`
(make the last two with `bash scripts/make-context.sh`).
For the games, also generate a bundle from each C++ repo (see the script usage) so the assistant sees the real code:
chess: `CMakeLists.txt` or `*.pro`, `main.cpp`, the main window and board class headers and sources, the `.qrc` file;
snake: `main.cpp` and the game class files.
For Lost & Found (Case 2): `package.json`, the Axios setup file, the FastAPI `main.py`, `requirements.txt`, and the schema file. No `.env` files.

## 10. Risks, in plain words

- Qt WebAssembly can eat time because of version matching. Time-box it and report exact errors.
- Snake needs the graphics and input layer replaced or shimmed; this is a port, not a one-click build. The game logic stays.
- A big .wasm file can make the first load slow on mobile data. Measure it before deciding.
- A public database-backed demo is an attack surface. Keep it dummy-data only.
- Free hosts change their limits. Re-check before relying on them.
