import { cn } from "@/lib/utils";

// S start, E end, p path, v visited, # wall, . empty
const rows = [
    "Sppppv#..",
    "vvvvpv#..",
    ".v.#pppp.",
    "...####p.",
    ".......pE",
    ".........",
];

const fills: Record<string, string> = {
    "#": "bg-foreground",
    v: "bg-brand/25",
    p: "bg-brand",
    S: "bg-brand",
    E: "bg-brand",
};

export function PathGraphic({ className }: { className?: string }) {
    return (
        <div
            role="img"
            aria-label="A grid showing a search algorithm finding a path around walls"
            className={cn(
                "grid grid-cols-9 gap-px overflow-hidden rounded-xl border bg-border",
                className
            )}
        >
            {rows.flatMap((row, r) =>
                [...row].map((ch, c) => (
                    <div key={`${r}-${c}`} className="relative aspect-square bg-surface">
                        {fills[ch] && (
                            <span className={cn("absolute inset-0", fills[ch])} />
                        )}
                        {(ch === "S" || ch === "E") && (
                            <span className="absolute inset-0 m-auto size-1/3 rounded-full bg-brand-fg" />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}