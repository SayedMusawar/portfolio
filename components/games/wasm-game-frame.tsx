"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Gamepad2, Maximize, Play, Square, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = {
    title: string;
    src: string;
    width: number;
    height: number;
    // "fill": the game page fits itself to the frame (Snake).
    // "scale": the game page has a fixed size, so the frame is scaled down to fit (Chess).
    fit?: "fill" | "scale";
};

export function WasmGameFrame({ title, src, width, height, fit = "fill" }: Props) {
    const [started, setStarted] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [box, setBox] = useState<{ w: number; h: number } | null>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const label = title.charAt(0).toUpperCase() + title.slice(1);

    // Measure the area the game gets, so a fixed-size game can be scaled to fit it.
    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        const observer = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setBox({ w: rect.width, h: rect.height });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [overlay]);

    // Stop the page behind the full-screen view from scrolling.
    useEffect(() => {
        if (!overlay) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [overlay]);

    function start() {
        const full = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
        setOverlay(full);
        setStarted(true);
        if (full) document.documentElement.requestFullscreen?.()?.catch(() => { });
    }

    function stop() {
        setStarted(false);
        setOverlay(false);
        if (document.fullscreenElement) document.exitFullscreen?.()?.catch(() => { });
    }

    function goFullscreen() {
        boxRef.current?.requestFullscreen?.()?.catch(() => { });
    }

    const scale = fit === "scale" && box && box.w > 0 && box.h > 0 ? Math.min(1, box.w / width, box.h / height) : 1;

    const game = started ? (
        fit === "scale" ? (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative overflow-hidden" style={{ width: width * scale, height: height * scale }}>
                    <iframe src={src} title={title} onLoad={(e) => e.currentTarget.focus()} allow="fullscreen" className="absolute left-0 top-0 border-0" style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }} />
                </div>
            </div>
        ) : (
            <iframe src={src} title={title} onLoad={(e) => e.currentTarget.focus()} allow="fullscreen" className="absolute inset-0 h-full w-full border-0" />
        )
    ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <Gamepad2 aria-hidden className="size-12 text-muted-foreground" />
            <p className="max-w-[40ch] text-muted-foreground">Nothing is downloaded until you press play.</p>
            <p className="max-w-[40ch] text-sm text-muted-foreground md:hidden">On a phone, the game opens in full screen. Use Close to leave.</p>
            <Button size="lg" onClick={start}>
                <Play aria-hidden />
                Play {title}
            </Button>
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            {started && overlay ? (
                <div role="dialog" aria-modal="true" aria-label={"Play " + title} className="fixed inset-0 z-[100] flex h-dvh flex-col bg-background">
                    <div className="flex items-center justify-between gap-3 border-b px-4 py-2">
                        <p className="font-heading text-lg font-semibold">{label}</p>
                        <Button variant="outline" size="sm" onClick={stop}>
                            <X aria-hidden />
                            Close
                        </Button>
                    </div>
                    <div ref={boxRef} className="relative min-h-0 flex-1 overflow-hidden bg-surface">
                        {game}
                    </div>
                </div>
            ) : (
                <div ref={boxRef} className="relative w-full overflow-hidden rounded-xl border bg-surface" style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}>
                    {game}
                </div>
            )}
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
                        <Button variant="outline" onClick={stop}>
                            <Square aria-hidden />
                            Stop game
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}