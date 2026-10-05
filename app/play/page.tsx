import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Play",
    description: "Games I wrote in C++, playable in your browser.",
};

const linkCard = "flex flex-col gap-2 rounded-xl border bg-surface p-5 transition-shadow duration-150 hover:shadow-sm";

export default function PlayPage() {
    return (
        <section className="container-page section-space">
            <h1 className="text-4xl font-semibold leading-[1.1] md:text-5xl">Play</h1>
            <p className="mt-4 max-w-[65ch] text-lg text-muted-foreground">Games I wrote in C++. They run in your browser as WebAssembly.</p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                <li>
                    <Link href="/play/chess" className={linkCard}>
                        <Gamepad2 aria-hidden className="size-8 text-muted-foreground" />
                        <span className="font-heading text-lg font-semibold">Chess</span>
                        <span className="text-muted-foreground">C++ and Qt, full rules, two players.</span>
                    </Link>
                </li>
                <li>
                    <Link href="/play/snake" className={linkCard}>
                        <Gamepad2 aria-hidden className="size-8 text-muted-foreground" />
                        <span className="font-heading text-lg font-semibold">Snake</span>
                        <span className="text-muted-foreground">C++ and SFML, with a browser graphics layer.</span>
                    </Link>
                </li>
            </ul>
        </section>
    );
}