"use client";

import { useRef, useState } from "react";
import { ExternalLink, Gamepad2, Maximize, Play, Square } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = {
    title: string;
    src: string;
    width: number;
    height: number;
};

export function WasmGameFrame({ title, src, width, height }: Props) {
    const [started, setStarted] = useState(false);
    const frameRef = useRef<HTMLIFrameElement>(null);

    function goFullscreen() {
        frameRef.current?.requestFullscreen?.();
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-full overflow-hidden rounded-xl border bg-surface" style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}>
                {started ? (
                    <iframe ref={frameRef} src={src} title={title} onLoad={() => frameRef.current?.focus()} allow="fullscreen" className="absolute inset-0 h-full w-full border-0" />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                        <Gamepad2 aria-hidden className="size-12 text-muted-foreground" />
                        <p className="max-w-[40ch] text-muted-foreground">Nothing is downloaded until you press play.</p>
                        <Button size="lg" onClick={() => setStarted(true)}>
                            <Play aria-hidden />
                            Play {title}
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                <a href={src} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
                    Open in a new tab
                    <ExternalLink aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                </a>
                {started && (
                    <>
                        <Button variant="outline" onClick={goFullscreen}>
                            <Maximize aria-hidden />
                            Fullscreen
                        </Button>
                        <Button variant="outline" onClick={() => setStarted(false)}>
                            <Square aria-hidden />
                            Stop game
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}