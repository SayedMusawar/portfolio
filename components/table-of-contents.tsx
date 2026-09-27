import type { Heading } from "@/lib/posts";

export function TableOfContents({ headings }: { headings: Heading[] }) {
    if (headings.length === 0) return null;

    return (
        <nav aria-label="Table of contents" className="rounded-xl border border-border bg-surface p-4 text-sm">
            <p className="mb-2 font-heading font-semibold">On this page</p>
            <ul className="space-y-2">
                {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                        <a href={`#${h.id}`} className="text-muted-foreground hover:text-foreground">
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}