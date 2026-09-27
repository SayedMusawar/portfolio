"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import type { PostMeta } from "@/lib/posts";

export function BlogList({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((post) => {
            const matchesTag = !activeTag || post.tags.includes(activeTag);
            const matchesQuery =
                !q ||
                post.title.toLowerCase().includes(q) ||
                post.summary.toLowerCase().includes(q) ||
                post.tags.some((t) => t.toLowerCase().includes(q));
            return matchesTag && matchesQuery;
        });
    }, [posts, query, activeTag]);

    return (
        <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts"
                    aria-label="Search posts"
                    className="w-full rounded-full border border-border bg-surface px-4 py-2 text-sm sm:max-w-xs"
                />
                <ul className="flex flex-wrap gap-2" aria-label="Filter by tag">
                    <li>
                        <button
                            type="button"
                            onClick={() => setActiveTag(null)}
                            className={`rounded-full border px-3 py-1 text-sm ${activeTag === null ? "border-brand bg-brand text-brand-fg" : "border-border text-muted-foreground"
                                }`}
                        >
                            All
                        </button>
                    </li>
                    {tags.map((tag) => (
                        <li key={tag}>
                            <button
                                type="button"
                                onClick={() => setActiveTag(tag)}
                                className={`rounded-full border px-3 py-1 text-sm ${activeTag === tag ? "border-brand bg-brand text-brand-fg" : "border-border text-muted-foreground"
                                    }`}
                            >
                                {tag}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {filtered.length === 0 ? (
                <p className="text-muted-foreground">No posts match your search yet.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                    {filtered.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}