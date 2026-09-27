"use client";

import { useRef, useState } from "react";

export function CodeBlock(props: React.ComponentPropsWithoutRef<"pre">) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        const text = preRef.current?.textContent ?? "";
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="relative mb-4">
            <button
                type="button"
                onClick={handleCopy}
                className="absolute right-2 top-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
                {copied ? "Copied" : "Copy"}
            </button>
            <pre
                ref={preRef}
                {...props}
                className={`overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm ${props.className ?? ""}`}
            />
        </div>
    );
}