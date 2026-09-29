"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { runAlgorithm, type AlgorithmId, type CellPos } from "./algorithms";

const ROWS = 12;
const COLS = 20;
const DEFAULT_START: CellPos = { row: 6, col: 2 };
const DEFAULT_END: CellPos = { row: 6, col: 17 };

type Tool = "wall" | "start" | "end";
type RunResult = ReturnType<typeof runAlgorithm>;

function emptyWalls(): boolean[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
}

function sameCell(a: CellPos, b: CellPos) {
    return a.row === b.row && a.col === b.col;
}

function cellKey(cell: CellPos) {
    return `${cell.row},${cell.col}`;
}

const algorithmLabels: Record<AlgorithmId, string> = {
    bfs: "BFS",
    dfs: "DFS",
    astar: "A*",
};

function subscribeReducedMotion(onChange: () => void) {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion() {
    return false;
}

export function Pathfinder() {
    const [walls, setWalls] = useState<boolean[][]>(emptyWalls);
    const [start, setStart] = useState<CellPos>(DEFAULT_START);
    const [end, setEnd] = useState<CellPos>(DEFAULT_END);
    const [tool, setTool] = useState<Tool>("wall");
    const [algorithm, setAlgorithm] = useState<AlgorithmId>("bfs");
    const [delay, setDelay] = useState(50);
    const [run, setRun] = useState<RunResult | null>(null);
    const [tick, setTick] = useState(0);
    const [drawing, setDrawing] = useState<boolean | null>(null);

    const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);

    useEffect(() => {
        const onUp = () => setDrawing(null);
        window.addEventListener("mouseup", onUp);
        return () => window.removeEventListener("mouseup", onUp);
    }, []);

    useEffect(() => {
        if (!run) return;
        const visitedTotal = run.visitedInOrder.length;
        const total = visitedTotal + run.path.length;
        if (tick >= total) return;
        const wait = tick === 0 ? 0 : tick < visitedTotal ? delay : Math.max(delay / 2, 10);
        const id = window.setTimeout(() => setTick((t) => t + 1), wait);
        return () => window.clearTimeout(id);
    }, [run, tick, delay]);

    const visitedTotal = run ? run.visitedInOrder.length : 0;
    const pathTotal = run ? run.path.length : 0;
    const visitedCount = Math.min(tick, visitedTotal);
    const pathLength = Math.min(Math.max(tick - visitedTotal, 0), pathTotal);
    const status = !run ? "idle" : tick >= visitedTotal + pathTotal ? "done" : "running";
    const noPath = status === "done" && pathTotal === 0;

    const visitedSet = new Set<string>();
    const pathSet = new Set<string>();
    if (run) {
        run.visitedInOrder.slice(0, visitedCount).forEach((cell) => visitedSet.add(cellKey(cell)));
        run.path.slice(0, pathLength).forEach((cell) => pathSet.add(cellKey(cell)));
    }

    const resetRun = () => {
        setRun(null);
        setTick(0);
    };

    const setWallAt = (r: number, c: number, value: boolean) => {
        if (sameCell({ row: r, col: c }, start) || sameCell({ row: r, col: c }, end)) return;
        setWalls((prev) => {
            const next = prev.map((row) => row.slice());
            next[r][c] = value;
            return next;
        });
        resetRun();
    };

    const handleCellDown = (r: number, c: number) => {
        if (status === "running") return;
        if (tool === "start") {
            if (!sameCell({ row: r, col: c }, end)) {
                setStart({ row: r, col: c });
                resetRun();
            }
            return;
        }
        if (tool === "end") {
            if (!sameCell({ row: r, col: c }, start)) {
                setEnd({ row: r, col: c });
                resetRun();
            }
            return;
        }
        const nextValue = !walls[r][c];
        setDrawing(nextValue);
        setWallAt(r, c, nextValue);
    };

    const handleCellEnter = (r: number, c: number) => {
        if (tool !== "wall" || drawing === null || status === "running") return;
        setWallAt(r, c, drawing);
    };

    const clearWalls = () => {
        if (status === "running") return;
        setWalls(emptyWalls());
        resetRun();
    };

    const visualize = () => {
        if (status === "running") return;
        const result = runAlgorithm(algorithm, walls, start, end);
        setRun(result);
        setTick(reducedMotion ? result.visitedInOrder.length + result.path.length : 0);
    };

    const cellState = (r: number, c: number) => {
        const pos = { row: r, col: c };
        if (sameCell(pos, start)) return "start";
        if (sameCell(pos, end)) return "end";
        if (walls[r][c]) return "wall";
        if (pathSet.has(cellKey(pos))) return "path";
        if (visitedSet.has(cellKey(pos))) return "visited";
        return "empty";
    };

    const cellClass: Record<string, string> = {
        start: "bg-brand",
        end: "bg-brand",
        wall: "bg-foreground",
        path: "bg-brand",
        visited: "bg-brand/25",
        empty: "bg-surface",
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-1 rounded-full border border-[color:var(--border)] bg-surface p-1">
                    {(["bfs", "dfs", "astar"] as AlgorithmId[]).map((id) => (
                        <button key={id} type="button" onClick={() => setAlgorithm(id)} className={cn("rounded-full px-3 py-1.5 text-sm font-mono transition-colors", algorithm === id ? "bg-brand text-brand-fg" : "text-muted-foreground hover:text-foreground")}>
                            {algorithmLabels[id]}
                        </button>
                    ))}
                </div>

                <div className="flex gap-1 rounded-full border border-[color:var(--border)] bg-surface p-1">
                    {(["wall", "start", "end"] as Tool[]).map((t) => (
                        <button key={t} type="button" onClick={() => setTool(t)} className={cn("rounded-full px-3 py-1.5 text-sm transition-colors", tool === t ? "bg-brand text-brand-fg" : "text-muted-foreground hover:text-foreground")}>
                            {t === "wall" ? "Draw walls" : t === "start" ? "Set start" : "Set end"}
                        </button>
                    ))}
                </div>

                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    Speed
                    <input type="range" min={5} max={150} step={5} value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
                    <span className="font-mono text-xs">{delay}ms/step</span>
                </label>

                <button type="button" onClick={visualize} disabled={status === "running"} className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-brand-fg disabled:opacity-50">
                    Visualize
                </button>

                <button type="button" onClick={resetRun} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-sm font-medium hover:bg-surface">
                    Reset
                </button>

                <button type="button" onClick={clearWalls} className="rounded-full border border-[color:var(--border)] px-4 py-1.5 text-sm font-medium hover:bg-surface">
                    Clear walls
                </button>
            </div>

            <div role="group" aria-label="Pathfinding grid, 12 rows by 20 columns" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, touchAction: "none" }} className="grid gap-px overflow-hidden rounded-xl border border-[color:var(--border)] bg-border select-none">
                {Array.from({ length: ROWS }).map((_, r) =>
                    Array.from({ length: COLS }).map((_, c) => {
                        const state = cellState(r, c);
                        return (
                            <button key={`${r}-${c}`} type="button" disabled={status === "running"} onMouseDown={() => handleCellDown(r, c)} onMouseEnter={() => handleCellEnter(r, c)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCellDown(r, c); } }} aria-label={`Row ${r + 1}, column ${c + 1}, ${state}`} className={cn("relative aspect-square border-0 p-0 disabled:cursor-not-allowed", cellClass[state])}>
                                {state === "start" && <span className="absolute inset-0 grid place-items-center font-mono text-[10px] text-brand-fg">S</span>}
                                {state === "end" && <span className="absolute inset-0 grid place-items-center font-mono text-[10px] text-brand-fg">E</span>}
                            </button>
                        );
                    })
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <span className="size-3 rounded-sm bg-brand" /> start / end / path
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="size-3 rounded-sm bg-brand/25" /> visited
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="size-3 rounded-sm bg-foreground" /> wall
                </span>
            </div>

            <div className="font-mono text-sm text-muted-foreground">
                {status === "idle" && "Ready. Draw walls, then press Visualize."}
                {status === "running" && `Searching... ${visitedCount} cells visited`}
                {status === "done" && noPath && `No path found. ${visitedCount} cells visited.`}
                {status === "done" && !noPath && `Visited ${visitedCount} cells, path length ${pathLength}.`}
            </div>
        </div>
    );
}