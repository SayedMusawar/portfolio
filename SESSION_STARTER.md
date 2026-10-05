# Session starter (paste this at the top of every new chat)

I'm building my portfolio website with you, step by step. The full plan is in the attached `PORTFOLIO_BUILD_BRIEF.md`. Please read these attached files first, in this order:

1. `PORTFOLIO_BUILD_BRIEF.md` (the spec and design rules)
2. `PROGRESS.md` (what is done, decisions, problems already solved, feature phase list)
3. `F3_SNAKE_STATE.md` (Snake facts, plan, open questions) and `NEXT_STEP_GAMES_AND_LOST_FOUND.md` (the plan)
4. `next-context.txt` and `file-list.txt` (current code and every file in the project)

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + shadcn/ui + MDX. No database in the portfolio itself.

**Non-negotiable rules:**
- No gradients of any kind in the portfolio. Flat colors only.
- Electric blue accent (`#1F4DFF` light, `#4D7CFF` dark) on a neutral base.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code only).
- Two border radii only (12px cards, 999px pills/buttons), borders instead of shadows.
- Sentence case, no all-caps labels, no motion on every section.
- Never invent facts about me. Use only the data in the brief and mark unknowns as TODO.
- Do NOT rewrite my C++ games in TypeScript or any other language. Connect my existing C++ code to the site (WebAssembly). If something blocks it, tell me the exact blocker and let me decide.
- Label honestly what visitors play (for example "C++ compiled to WebAssembly"), and name any layer that was adapted for the browser.
- No asChild (my shadcn version doesn't support it). Style links as buttons with buttonVariants() on Link/a.
- Write every JSX opening tag (element name + all its attributes) on ONE line, never split across lines. This has broken pasted code before.
- Before I commit, `npx tsc --noEmit` and `npm run lint` must both be clean.
- Never ask me to paste secrets (.env.local, API keys, tokens, database URLs with passwords).
- Use real paths in commands (~/portfolio, ~/Chess-Game-repo, ~/snake_game, ~/snake-wasm-build, ~/emsdk), never placeholders like ~/path/to/...
- Never give line-number sed edits on files you have not just seen (they broke a page twice). Give whole files, or a command that prints the lines first.
- Long downloads or builds: tell me to open a second terminal for other commands.
- Do not guess what exists in my code: if a file is not in next-context.txt, give me the exact `cat` command.

**Where I am now:** Steps 0 to 9 are done. Feature phase: Chess is playable on my site and pushed (commit 94ccfc5: /play, /play/chess, components/games/wasm-game-frame.tsx, public/games/chess). A small fix to app/play/chess/page.tsx and two local commits may still need pushing (check git status -sb). Snake (C++ and SFML 2.x) is next and not started in code. The Lost & Found live link was committed with Chess and still needs my check. Lighthouse has not been run yet.

**Today's task:** F3, Snake in the browser. Confirm from the fresh next-context.txt how Chess is integrated and reuse it. Get my four Snake decisions (F3_SNAKE_STATE.md section 3), then build. After Snake: confirm the Lost & Found link (F4).

**How I want the answer:**
- Complete files, ready to copy and paste, with the exact file path written above every code block
- Say clearly whether each block is a file to paste or a terminal command to run
- Terminal commands in order
- A short checklist at the end so I can verify it works
- If you need to see a file you don't have, tell me the exact `cat` command to run
