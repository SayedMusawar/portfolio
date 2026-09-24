import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PostMeta } from "@/lib/posts";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });
}

export function PostCard({ post }: { post: PostMeta }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-3 rounded-xl border bg-surface p-5 transition-shadow duration-150 hover:shadow-sm"
        >
            <p className="text-sm text-muted-foreground">
                {formatDate(post.date)} · {post.readingTime}
            </p>
            <h3 className="font-heading text-lg font-semibold">{post.title}</h3>
            <p className="text-muted-foreground">{post.summary}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                    <li key={tag}>
                        <Badge variant="outline">{tag}</Badge>
                    </li>
                ))}
            </ul>
        </Link>
    );
}