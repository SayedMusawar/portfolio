# Session starter (paste this at the top of every new chat)

I'm building my portfolio website with you, step by step. The full plan is in the attached `PORTFOLIO_BUILD_BRIEF.md`. Please read these attached files first, in this order:

1. `PORTFOLIO_BUILD_BRIEF.md` (the spec and design rules)
2. `PROGRESS.md` (what is done, decisions, problems already solved, feature phase list)
3. `NEXT_STEP_GAMES_AND_LOST_FOUND.md` (the plan for the work in this chat)
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

**Where I am now:** Steps 0 to 9 are done. I am in the feature phase listed in PROGRESS.md. Lighthouse has not been run yet.

**Today's task:** __ (for example: "F3, make my existing C++ Chess and Snake playable on the site" or "F4, Lost & Found live link" or "F2, print-friendly resume")

**How I want the answer:**
- Complete files, ready to copy and paste, with the exact file path written above every code block
- Say clearly whether each block is a file to paste or a terminal command to run
- Terminal commands in order
- A short checklist at the end so I can verify it works
- If you need to see a file you don't have, tell me the exact `cat` command to run
