# F2 state: print-friendly resume

Updated 2026-10-05. Chess and Snake are done and pushed (Snake commit bafe62d in the Snake repo, portfolio commit 7902889). This file is about F2 only.

## 1. Goal

Ctrl+P on /resume produces a clean, ATS-friendly resume (black text on white, no site chrome). The owner's own PDF in public/resume/Musawar_Ali_Shah_Resume.pdf stays and the Download PDF button stays on screen.

## 2. Facts the assistant must confirm from the fresh next-context.txt (not guessed here)

- app/resume/page.tsx builds the page from profile.ts, timeline.ts, getFeaturedProjects() and an inline skillGroups list. It has a Download PDF button, shown only if the PDF file exists.
- app/globals.css has NO print rules yet (look for @media print).
- The site header (components/site-header.tsx), footer (components/site-footer.tsx) and the skip link live in app/layout.tsx and would print. They need to be hidden when printing (for example with Tailwind's print: variant, or a print block in globals.css).
- The design rule "no gradients, flat colors" also holds for print. Dark theme must not leak into print: print should always be black on white, whatever theme the visitor uses.
- The page uses text-display for the name (72px max). Print needs smaller type sizes.

## 3. Open questions for the owner (the assistant asks them, in one numbered list, with recommendations)

1. Page count: aim for one page, or let it flow to two? Recommendation: one to two pages, with no entry split across a page break.
2. Show link addresses in print (the GitHub and LinkedIn URLs written out after the link text)? Recommendation: yes for GitHub, LinkedIn and email, since paper cannot be clicked.
3. Selected projects on the printed page: keep the three featured projects with highlights as they are? Recommendation: yes, but Snake and Chess get a play link only on screen.
4. Add a "Print" button next to Download PDF on screen? Recommendation: yes, a plain pill button using window.print() in a tiny client component.
5. Should the printed version carry the TODO items (year of study, SSC/HSSC)? Recommendation: no. Never print TODO comments. Ask the owner for the real values instead.
6. The page's content and the uploaded PDF should say the same things. Does the owner want the assistant to compare them? (Only possible if the owner pastes the PDF text.)

## 4. Plan (after the owner answers)

1. Print rules in app/globals.css: a @media print block (white background, black text, fixed margins with @page, smaller headings, link underline, avoid page breaks inside entries with break-inside: avoid, remove borders of cards, hide anything marked for screen only). No gradients, no shadows.
2. Mark the site header, footer and skip link as hidden in print (whole files for site-header.tsx and site-footer.tsx, or one print block, whichever is smaller and safer after reading them).
3. app/resume/page.tsx as a whole file: print-specific classes, the Print button, link addresses written out for print only.
4. Test in the browser's print preview, in light and dark theme: A4 and Letter, 360px window for the on-screen layout, and "save as PDF" output.
5. Checklist, tsc, lint, gradient grep, commit, push, PROGRESS.md update script (F2 ticked).

## 5. Leftovers owed (small, not blocking)

- Snake: phone-width check of /play/snake (on-screen buttons under the board), a Snake screenshot for the project page.
- Chess: fool's-mate test, real transfer size of ChessGameProject.wasm, phone layout, GitHub repo shows screenshots and a License section.
- Lighthouse baseline on a production build.
- Questions for later: correct year for lost-and-found-system and it-problem-reporting (code now says 2026 in data/projects.ts, check the resume PDF says the same), mention the co-developer (Muhammad Ahmed Asim) in the Lost & Found text, a "Play" link in the header, Download buttons (GitHub Releases).

## 6. Mistakes already made (so the next assistant avoids them)

- Running commands that contain "~/path/to/..." literally. Use real paths.
- Blind line-number sed edits on app/play/chess/page.tsx (twice) left a duplicate </section> and broke tsc. Give whole files.
- A context bundle made before a feature was integrated made the next chat think files did not exist. Regenerate next-context.txt and file-list.txt before every new chat.
- A line holding only "<a" or ">" in JSX gets dropped or breaks parsing when pasted. Keep every opening tag on one line.
- Terminal commands pasted into a .tsx file. Always say "run in terminal" or "paste into file".
- Snake lesson: the shell page read Module.IDBFS but the build exported only FS. When an Emscripten page needs a runtime object, export it in the build command.
- Never share secrets. Context bundles must not include .env files.
