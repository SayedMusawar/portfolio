import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WasmGameFrame } from "@/components/games/wasm-game-frame";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
    title: "Play snake",
    description: "Play my snake game in your browser. The original C++ game, compiled to WebAssembly with a browser graphics layer.",
};

const backLink = "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground";
const primaryLink = buttonVariants({ size: "lg" });
const outlineLink = buttonVariants({ variant: "outline", size: "lg" });

export default function PlaySnakePage() {
    const project = getProject("snake-game");

    return (
        <article className="container-page section-space">
            <Link href="/play" className={backLink}>
                <ArrowLeft aria-hidden className="size-4" />
                All games
            </Link>

            <header className="mt-8 max-w-3xl">
                <h1 className="text-4xl font-semibold leading-[1.1] md:text-5xl">Snake</h1>
                <p className="mt-4 text-lg text-muted-foreground">Playable in your browser. This is my C++ game compiled to WebAssembly. The graphics and input layer was adapted for the browser (an SDL2 compatibility layer), and the game rules are unchanged.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                    {project?.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={primaryLink}>
                            View the C++ code on GitHub
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    )}
                    <Link href="/projects/snake-game" className={outlineLink}>
                        About this project
                    </Link>
                </div>
            </header>

            <section aria-labelledby="game-heading" className="mt-12">
                <h2 id="game-heading" className="sr-only">
                    Game
                </h2>
                <WasmGameFrame title="snake" src="/games/snake/snake.html" width={768} height={760} />
            </section>

            <section aria-labelledby="how-heading" className="mt-12 max-w-[65ch]">
                <h2 id="how-heading" className="text-2xl font-semibold">
                    How to play
                </h2>
                <p className="mt-4">Press an arrow key or W, A, S, D to start moving, and eat the red food to grow. Gold food is worth 5 points but disappears after a few seconds. Hitting a wall or yourself ends the game. P pauses, and Enter restarts after game over. On a phone, use the buttons under the board.</p>
                <p className="mt-4 text-muted-foreground">Your high score is saved in this browser only. The font is DejaVu Sans Bold, which is freely licensed, and its license text is in the GitHub repository.</p>
            </section>
        </article>
    );
}