"use client";

import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
    const [copied, setCopied] = useState(false);
    const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    async function handleCopy() {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted-foreground">Share:</span>
            <a href={twitterHref} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1 hover:bg-surface">X</a>
            <a href={linkedinHref} target="_blank" rel="noreferrer" className="rounded-full border border-border px-3 py-1 hover:bg-surface">LinkedIn</a>
            <button type="button" onClick={handleCopy} className="rounded-full border border-border px-3 py-1 hover:bg-surface">
                {copied ? "Link copied" : "Copy link"}
            </button>
        </div>
    );
}