# Start here: resume in a new chat (F2, print-friendly resume)

Updated 2026-10-05. Chess and Snake are playable on the site and pushed. Lost & Found live link checked. Next feature: F2.

## 1. Copy this pack into the project (run in terminal)

Download the files of this pack into ~/Downloads, then:

```bash
cd ~/portfolio
cp ~/Downloads/00_START_HERE.md ~/Downloads/SESSION_STARTER.md ~/Downloads/NEW_CHAT_PROMPT.md ~/Downloads/F2_RESUME_PRINT_STATE.md .
git rm -f --ignore-unmatch F3_SNAKE_STATE.md NEXT_STEP_GAMES_AND_LOST_FOUND.md
git status -sb
```

The two old files describe Snake as "next", so they are removed. Their content is summed up in PROGRESS.md.

## 2. Rebuild the context files (run in terminal)

```bash
cd ~/portfolio
bash scripts/make-context.sh
grep -n "snake\|games\|play" file-list.txt
```

The grep must list public/games/snake, public/games/chess, app/play/snake and components/games. If it prints nothing, stop: the bundle is stale.
Skim next-context.txt for secrets before attaching it.

## 3. Check and commit (run in terminal)

```bash
cd ~/portfolio
git add 00_START_HERE.md SESSION_STARTER.md NEW_CHAT_PROMPT.md F2_RESUME_PRINT_STATE.md file-list.txt
git commit -m "Update handoff pack: Snake done, F2 next"
git push origin HEAD
git status -sb
```

`git status -sb` should show no "ahead".

## 4. Attach these 7 files to the new chat (check that every one shows up before you send)

1. PORTFOLIO_BUILD_BRIEF.md
2. SESSION_STARTER.md
3. PROGRESS.md
4. F2_RESUME_PRINT_STATE.md
5. next-context.txt
6. file-list.txt
7. 00_START_HERE.md

## 5. Paste the first message

Open NEW_CHAT_PROMPT.md, copy everything below its first line, and paste it as your first message with the files attached.

## 6. Quick checks you still owe (not blocking F2)

- Snake page at phone width (360px): on-screen buttons show under the board and work.
- Snake screenshot for the project page (public/images/projects/snake-game/ and data/projects.ts).
- Chess: fool's-mate test (f2-f3, e7-e5, g2-g4, Qd8-h4 shows a checkmate box that closes), real transfer size of ChessGameProject.wasm (DevTools, Network tab), phone layout.
- github.com/SayedMusawar/Chess-Game shows the four screenshots and a License section.
- Lighthouse baseline on a production build (npm run build, npm start).

## 7. Your tools today

- ~/emsdk (Emscripten 4.0.7, load with: source ~/emsdk/emsdk_env.sh), ~/Qt/6.11.1 (Chess only)
- ~/portfolio, ~/Chess-Game-repo (Chess, in sync), ~/snake_game_repo (Snake, in sync with GitHub), ~/chess-wasm-build, ~/snake-wasm-build
- ~/snake_game is the old plain folder (not a git repo). Use ~/snake_game_repo for Snake commits.
