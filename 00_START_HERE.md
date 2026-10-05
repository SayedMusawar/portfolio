# Start here: finish Chess, push, and resume in a new chat (Snake phase)

Updated 2026-10-05.

## 1. Check and push the pending portfolio work (run in terminal)

Last chat ended with two local commits (e852590, 8cf7595) and a markup fix in app/play/chess/page.tsx not pushed yet.

```bash
cd ~/portfolio
git status -sb
sed -n '45,62p' app/play/chess/page.tsx
```

The `sed -n` only prints lines. You should see ONE `</section>` before `</article>`. If you see two, run `sed -i '57d' app/play/chess/page.tsx` once, and print again.
If it still looks wrong, run `cat app/play/chess/page.tsx` and paste it into the chat for a whole-file fix.

```bash
npx tsc --noEmit
npm run lint
grep -rniE "gradient" app components data lib
```

tsc and lint must print no errors. The gradient search may match only "Gradient Descent" in skill names (false positive).

```bash
git add app/play/chess/page.tsx
git commit -m "Fix chess page markup and add Qt license note"
git push origin HEAD
```

If Git asks for a password, use a personal access token (never paste it in chat). Or install the GitHub CLI: `sudo apt install -y gh`, then `gh auth login` and `gh auth setup-git`.

## 2. Copy this pack into the project and commit it (run in terminal)

Download all files of this pack into ~/Downloads, then:

```bash
cd ~/portfolio
cp ~/Downloads/PROGRESS.md ~/Downloads/SESSION_STARTER.md ~/Downloads/NEXT_STEP_GAMES_AND_LOST_FOUND.md ~/Downloads/F3_SNAKE_STATE.md ~/Downloads/00_START_HERE.md ~/Downloads/NEW_CHAT_PROMPT.md .
git status -sb
```

Optional: keep the generated context bundle out of git (it holds a copy of your source code):

```bash
grep -qxF "next-context.txt" .gitignore || echo "next-context.txt" >> .gitignore
```

## 3. Rebuild the context files (this updates the project structure)

```bash
cd ~/portfolio
bash scripts/make-context.sh ~/snake_game
grep -n "games\|play" file-list.txt
```

The `grep` must list public/games/chess, components/games and app/play. If it prints nothing, stop: the bundle is stale. Open next-context.txt and skim it for secrets before attaching it.

```bash
git add PROGRESS.md SESSION_STARTER.md NEXT_STEP_GAMES_AND_LOST_FOUND.md F3_SNAKE_STATE.md 00_START_HERE.md NEW_CHAT_PROMPT.md scripts/make-context.sh file-list.txt .gitignore
git commit -m "Update handoff pack: Chess done, Snake next"
git push origin HEAD
git status -sb
```

`git status -sb` should show no "ahead". If `.gitignore` was not changed, git add just skips it.

## 4. Attach these 8 files to the new chat (check that every one shows up before you send)

1. PORTFOLIO_BUILD_BRIEF.md
2. SESSION_STARTER.md
3. PROGRESS.md
4. F3_SNAKE_STATE.md
5. NEXT_STEP_GAMES_AND_LOST_FOUND.md
6. next-context.txt (made in step 3, AFTER Chess)
7. file-list.txt (made in step 3)
8. 00_START_HERE.md

## 5. Paste the first message

Open NEW_CHAT_PROMPT.md, copy everything below its first line, and paste it as your first message with the files attached.

## 6. Quick checks you still owe (not blocking Snake)

- github.com/SayedMusawar/Chess-Game shows the four screenshots and a License section.
- Chess fool's-mate test: f2-f3, e7-e5, g2-g4, Qd8-h4 shows a checkmate box that closes.
- /play/chess: real transfer size of ChessGameProject.wasm (DevTools, Network tab) and the phone layout.
- The Lost & Found live link opens the working app in a private window, with dummy demo accounts only.

## 7. Your tools today

- ~/emsdk (Emscripten 4.0.7, load with: source ~/emsdk/emsdk_env.sh), ~/aqt-venv, ~/Qt/6.11.1 (Chess only)
- ~/portfolio, ~/Chess-Game-repo (clean clone, Chess done), ~/chess-wasm-build, ~/snake_game (next), ~/snake-wasm-build (planned)
