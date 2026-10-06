import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WasmGameFrame } from "@/components/games/wasm-game-frame";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
    title: "Play chess",
    description: "Play my chess game in your browser. The original C++ and Qt code, compiled to WebAssembly.",
};

const backLink = "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground";
const primaryLink = buttonVariants({ size: "lg" });
const outlineLink = buttonVariants({ variant: "outline", size: "lg" });

export default function PlayChessPage() {
    const project = getProject("chess-game");

    return (
        <article className="container-page section-space">
            <Link href="/play" className={backLink}>
                <ArrowLeft aria-hidden className="size-4" />
                All games
            </Link>

            <header className="mt-8 max-w-3xl">
                <h1 className="text-4xl font-semibold leading-[1.1] md:text-5xl">Chess</h1>
                <p className="mt-4 text-lg text-muted-foreground">Playable in your browser. This is the original C++ and Qt code compiled to WebAssembly.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                    {project?.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={primaryLink}>
                            View the C++ code on GitHub
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    )}
                    <Link href="/projects/chess-game" className={outlineLink}>
                        About this project
                    </Link>
                </div>
            </header>

            <section aria-labelledby="game-heading" className="mt-12">
                <h2 id="game-heading" className="sr-only">
                    Game
                </h2>
                <WasmGameFrame title="chess" src="/games/chess/ChessGameProject.html" width={640} height={740} fit="scale" />
            </section>

            <section aria-labelledby="how-heading" className="mt-12 max-w-[65ch]">
                <h2 id="how-heading" className="text-2xl font-semibold">
                    How to play
                </h2>
                <p className="mt-4">Two players share one board and White moves first. Click or tap a piece to select it, then click or tap a green dot to move there. The status bar shows check, and a dialog announces checkmate.</p>
                <p className="mt-4 text-muted-foreground">Built with Qt for WebAssembly, which Qt offers under the GPLv3. The source code is on GitHub.</p>
            </section>
        </article>
    );
}