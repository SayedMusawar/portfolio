import Link from "next/link";
import type { CSSProperties } from "react";
import { buttonVariants } from "@/components/ui/button";
import { PathGraphic } from "@/components/pathfinder/path-graphic";
import { profile } from "@/data/profile";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
    return (
        <section className="container-page pb-16 pt-12 md:pb-24 md:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
                <div>
                    <h1 className="hero-in text-display" style={stagger(0)}>
                        {profile.name}
                    </h1>
                    <p
                        className="hero-in mt-6 max-w-[55ch] text-lg text-muted-foreground"
                        style={stagger(1)}
                    >
                        {profile.role}
                    </p>
                    <div className="hero-in mt-8 flex flex-wrap gap-3" style={stagger(2)}>
                        <Link href="/projects" className={buttonVariants({ size: "lg" })}>
                            View projects
                        </Link>
                        <Link
                            href="/blog"
                            className={buttonVariants({ variant: "outline", size: "lg" })}
                        >
                            Read the blog
                        </Link>
                    </div>
                    <p
                        className="hero-in mt-8 text-sm text-muted-foreground"
                        style={stagger(3)}
                    >
                        {profile.location} · {profile.degree}, FAST-NUCES
                    </p>
                </div>

                <div className="hero-in" style={stagger(4)}>
                    <PathGraphic />
                </div>
            </div>
        </section>
    );
}