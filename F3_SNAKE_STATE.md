# F3 state: Snake (C++ and SFML 2.x) in the browser

Updated 2026-10-05 (end of the Chess chat). Chess is playable on the portfolio and pushed (commit 94ccfc5). This file is about Snake only.
OWNER DECISION: no rewrite in TypeScript or any other language. The existing C++ is compiled to WebAssembly (Emscripten) and embedded in the site.
Read together with PROGRESS.md and NEXT_STEP_GAMES_AND_LOST_FOUND.md (Part B and Part C).

## 1. Machine and paths (real paths, never placeholders)

- Ubuntu 24.04 (Python 3.12.3), Node via nvm, VS Code, npm. Ubuntu's pip refuses system-wide installs: use a venv.
- Portfolio: ~/portfolio (GitHub: SayedMusawar/portfolio)
- Snake repo: ~/snake_game (single main.cpp, no build files, highscore.txt, a compiled binary named snake)
- Chess repo: ~/Chess-Game-repo (clean clone of github.com/SayedMusawar/Chess-Game, in sync with origin; ~/Chess-Game is the older folder). Chess browser build was made in ~/chess-wasm-build.
- Emscripten SDK: ~/emsdk (4.0.7 installed and active, matches Qt 6.11.x). Snake can use this same version.
  Load it in every new terminal: source ~/emsdk/emsdk_env.sh
- Qt kits in ~/Qt/6.11.1 are for Chess only. Not needed for Snake.
- Output folder planned for the Snake build: ~/snake-wasm-build
- Planned clean clone for Snake commits (same pattern as Chess): git clone https://github.com/SayedMusawar/snake_game.git ~/snake_game_repo (only after the owner approves)
- GitHub: gh is not installed, no SSH key; HTTPS push with the saved credential helper worked. Never paste tokens.

## 2. Snake facts already collected (from the earlier chat)

- SFML version: 2.x (the code uses sf::Uint8). The exact version has not been checked.
- SFML names used (counts): Color 13, Keyboard 10, Vertex 6, Vector2f 5, Uint8 3, Text 3, Event 3, Lines 2, Clock 2, CircleShape 2, VideoMode 1, RenderWindow 1, RectangleShape 1, Font 1.
  NOT used: audio, textures, sprites.
- Main loop at main.cpp line 163: `while (window.isOpen())`, with `while (window.pollEvent(event))` at line 165. A browser needs emscripten_set_main_loop or -sASYNCIFY.
- Font: main.cpp line 142 `font.loadFromFile("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")` (absolute system path).
  It must be bundled (Emscripten --preload-file) and the path made relative under a browser-only #ifdef. DejaVu fonts are freely redistributable (include the license text).
- highscore.txt is read and written by the game (details unknown until main.cpp is read in full).
  In the browser the virtual file system is temporary; keeping the score between visits needs IDBFS or similar. Ask the owner whether that matters.
- Official SFML has no Emscripten target (SFML forum topic 19075, old). Options that exist: SMK (github.com/ArthurSonzogni/smk), VRSFML (github.com/vittorioromeo/VRSFML),
  SDL2 (ships with Emscripten via -sUSE_SDL=2, text via -sUSE_SDL_TTF=2).

## 3. Decisions still open (the owner has NOT answered yet; answering "go with your recommendations" counts as approval)

1. Route: thin SDL2 compatibility header (sfml_web.hpp) used only under #ifdef __EMSCRIPTEN__. Recommended. Fallbacks: SMK or VRSFML (more edits, different API).
2. Loop handling. Two options, both keep the game rules untouched:
   - A. -sASYNCIFY: main.cpp's blocking while (window.isOpen()) loop can stay as is (the shim yields to the browser in display()). Larger and slower .wasm. Recommended by the Chess-chat assistant because main.cpp can stay unchanged.
   - B. Move the loop body into a function and use emscripten_set_main_loop under #ifdef __EMSCRIPTEN__. Smaller and faster, but a small edit to main.cpp.
   The assistant should say which it recommends after checking the code and the measured .wasm size, and the owner decides.
3. High score: persist in the visitor's browser (IDBFS or localStorage bridge, recommended) or reset on every visit (simplest).
4. May the Snake repo get a web/ folder (HTML shell), the bundled DejaVu font with its license text, and a build script?
   Needs a clean clone first. Check the font files: ls -l /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf and ls /usr/share/doc | grep -i dejavu
Other open questions: section 7.

## 4a. Plan (the owner must approve the route before code is written)

1. The assistant reads the WHOLE main.cpp and highscore.txt (they are in next-context.txt) and checks every SFML call against section 2.
2. The assistant proposes the route with reasons and what changes in main.cpp. Expected route: a thin compatibility header implementing only the SFML classes Snake uses on top of SDL2,
   with `#ifdef __EMSCRIPTEN__`, so the same main.cpp still builds with real SFML on the desktop. Alternatives if the shim gets messy: SMK or VRSFML (more edits, different API).
3. After approval: the header, the updated main.cpp (game rules unchanged), the emcc command, then a local test:
   source ~/emsdk/emsdk_env.sh, build in ~/snake-wasm-build, then `python3 -m http.server 8080` in that folder.
4. Copy the output into ~/portfolio/public/games/snake/ (check `du -h`).
5. Site: reuse the game frame component and page layout that Chess already uses (find them in next-context.txt; do not recreate them).
   Add app/play/snake/page.tsx, a playUrl for snake-game in data/projects.ts, the sitemap entry, and the /play index card if the index exists.
6. Phones have no keyboard: the HTML wrapper (not the game code) can add on-screen arrow buttons that send key events to the canvas.
7. Honest label for Snake: "Playable in your browser. My C++ game compiled to WebAssembly. The graphics and input layer was adapted for the browser (SDL2 compatibility layer)."
   Change the bracket if another route is chosen. Always keep the GitHub link next to Play.
8. Update PROGRESS.md (tick Snake in F3), run tsc and lint, commit, push.

Fallback command if main.cpp is not in the bundle (run in terminal, paste the output):
cd ~/snake_game && cat main.cpp && cat highscore.txt && (pkg-config --modversion sfml-all || dpkg -l | grep -i sfml | head) && ls -la && git remote -v

## 4. Lessons from the Chess build that also apply to Snake

- Qt's WebAssembly page and Emscripten's default HTML page are not responsive: the site needs its own wrapper or a custom shell so the canvas scales.
- Only a few fonts exist in the browser. System fonts (Arial and others) are not available, so bundle every font the game needs.
- Blocking calls (dialogs, while loops) need Asyncify or a rewrite to non-blocking. Prefer non-blocking.
- Nothing from the game may load before the Play click (keeps Lighthouse scores).
- Chess integration that already exists on the site (reuse it, do not recreate): components/games/wasm-game-frame.tsx, app/play/page.tsx, app/play/chess/page.tsx,
  public/games/chess/, playUrl in data/projects.ts, the Play button in app/projects/[slug]/page.tsx, the sitemap entries, and "public/games/**" in eslint.config.mjs.
  The Chess page frame is 640 by 740; check how Snake's canvas size fits it. Read the real code in the fresh next-context.txt.
- The Chess page says "Built with Qt for WebAssembly ... GPLv3" and links the source. Snake needs its own honest label (section 3 of the plan below).
- Do not give blind line-number sed edits: they broke app/play/chess/page.tsx twice. Whole files only.

## 5. Things the assistant must confirm from the FRESH next-context.txt (not guessed here)

The bundle must have been regenerated after Chess was added (it should list public/games/chess, components/games, app/play in file-list.txt). If not, stop and ask for:
bash scripts/make-context.sh ~/snake_game
Then confirm: the Chess build folder in public/games/, the game frame component name and props, which app/play pages exist, the playUrl field in data/projects.ts, and the label text Chess shows.

## 6. Chess leftovers (small, ask the owner)

1. Push the pending portfolio work (see 00_START_HERE.md section 1): local commits e852590 and 8cf7595 plus the fixed app/play/chess/page.tsx.
2. Confirm on GitHub that github.com/SayedMusawar/Chess-Game shows the four screenshots and a License section (GPLv3 note for Qt for WebAssembly; not legal advice).
3. Did the fool's-mate test pass (f2-f3, e7-e5, g2-g4, Qd8-h4 shows "Checkmate! Black wins!" and the box closes)? Also in the browser build?
4. Check the real transfer size of ChessGameProject.wasm (DevTools Network, about 14.3 MB on disk) and the phone layout of the Chess frame.

## 7. Open questions for the owner (do not guess, ask)

1. Correct year for lost-and-found-system and it-problem-reporting (data says 2025; the app screenshots say Spring 2026).
2. Mention the co-developer (Muhammad Ahmed Asim) in the Lost & Found project text?
3. F4: the Chess commit message says the Lost & Found live link was added. Does the URL open the working app in a private window, with dummy demo accounts only?
4. Add Download buttons (GitHub Releases builds) next to Play?
5. Add a "Play" link in the site header?
6. Should Snake's high score persist between visits in the browser? (also decision 3 above)

## 8. Mistakes already made (so the next assistant avoids them)

- The owner ran commands containing "~/path/to/..." literally. Use real paths.
- Downloading all Qt modules stalled for half an hour. Use --archives qtbase.
- Claimed LGPL for WebAssembly; the Qt docs say GPLv3 or commercial.
- Ubuntu's pip refuses system-wide installs: use a venv.
- A chat once started without PROGRESS.md and next-context.txt attached. Check the attachments before starting.
- Blind line-number sed edits on app/play/chess/page.tsx (twice) left a duplicate </section> and broke tsc. Give whole files.
- A context bundle made before Chess was integrated made the next chat think the Chess files did not exist. Regenerate next-context.txt and file-list.txt before every new chat.
- Never share secrets; context bundles must not include .env files (scripts/make-context.sh skips them and anything that looks like a token).
