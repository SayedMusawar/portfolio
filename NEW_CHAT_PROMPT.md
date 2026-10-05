# First message for the new chat (copy everything below this line)

I'm building my portfolio website with you, step by step, and I'm continuing from an earlier chat. Please read ALL attached files before answering, in this order:
PORTFOLIO_BUILD_BRIEF.md, SESSION_STARTER.md, PROGRESS.md, F3_SNAKE_STATE.md, NEXT_STEP_GAMES_AND_LOST_FOUND.md, then next-context.txt and file-list.txt (current code of my website and of my Snake game).
Do not redo research that is already written in those files. If one of these files is missing, tell me which one before doing anything else. If file-list.txt does not list public/games/chess, components/games and app/play, the bundle is stale: tell me and stop.

**Where I am:** Steps 0 to 9 of the website are done (Next.js 16, Tailwind v4, shadcn, MDX). Feature phase. My C++ Chess game is playable on the site (C++ and Qt compiled to WebAssembly) and pushed (commit 94ccfc5). Now I'm on Snake.

**My goal for this chat (F3, Snake):** let visitors play my existing Snake game (C++ and SFML 2.x) on my website, the same way Chess works. Then confirm the Lost & Found link (F4).

**Hard decisions (do not argue them):**
- I do NOT want my games rewritten in TypeScript or any other language. Compile my existing C++ to WebAssembly with Emscripten and embed it in the site. If something blocks that, tell me the exact blocker and let me decide.
- Be honest on the site about what visitors play ("C++ compiled to WebAssembly", and name any layer that was adapted for the browser).
- Website rules: no gradients, flat colors, accent #1F4DFF light and #4D7CFF dark, Space Grotesk, Inter and JetBrains Mono (code only), two radii only, sentence case, no asChild, every JSX opening tag on ONE line, tsc and lint clean before commits.
- Never give me line-number sed edits on files you have not just seen. Give whole files.

**Where the work stands (details in F3_SNAKE_STATE.md):**
- Chess: done. Look at how it is integrated (public/games/chess, components/games/wasm-game-frame.tsx, app/play pages, playUrl in data/projects.ts, sitemap) in next-context.txt and tell me in a few lines what you found. Reuse it for Snake. Do not guess: if something is missing, give me the exact `cat` command.
- Snake: main.cpp is in next-context.txt. Read it fully. The expected route is a thin SDL2 compatibility header under #ifdef __EMSCRIPTEN__, so the same main.cpp still builds with real SFML on my PC.
- I have NOT answered these four decisions yet. Ask them in one short numbered list, each with your recommendation and the trade-off; "go with your recommendations" from me counts as approval:
  1. SDL2 shim route: yes or no.
  2. Loop handling: -sASYNCIFY (main.cpp can stay unchanged, bigger .wasm) or move the loop to emscripten_set_main_loop (small edit, smaller .wasm).
  3. High score: persists in the visitor's browser, or resets each visit.
  4. May the Snake repo get a web/ folder, the bundled DejaVu font with its license text, and a build script? (clone to ~/snake_game_repo first)
- Emscripten 4.0.7 is in ~/emsdk (load with: source ~/emsdk/emsdk_env.sh). The Snake build folder will be ~/snake-wasm-build.
- Lost & Found: the Chess commit message says the live link was added. Ask me for the URL check (private window, dummy demo accounts only), then follow Part D of NEXT_STEP_GAMES_AND_LOST_FOUND.md only if something is missing.

**How I want the answers:**
- Complete files, ready to paste, with the exact file path above every code block. Say clearly whether each block is a file to paste or a terminal command to run.
- Real paths (~/portfolio, ~/snake_game, ~/snake_game_repo, ~/emsdk, ~/snake-wasm-build, ~/Chess-Game-repo). Never ~/path/to/...
- Terminal commands in order, and a short checklist at the end.
- If you need a file you do not have, give me the exact `cat` command. If a build fails, I will paste the first error line.
- For long downloads or builds, tell me to use a second terminal.
- Never ask me to paste secrets (.env.local, tokens, database URLs with passwords).
- Open questions to ask me later (do not guess): the correct year of the Lost & Found and IT Reporting projects (screenshots say 2026, my data says 2025), whether to mention my co-developer, a "Play" link in the header, Download buttons (GitHub Releases), and the Chess leftovers (fool's-mate result, wasm transfer size, phone layout).

Start by confirming in a few lines what you understood (current state, how Chess is integrated, next action). Then read main.cpp, ask the four decisions, and do not write code until I answer.
