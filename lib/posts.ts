export type PostMeta = {
    slug: string;
    title: string;
    date: string; // ISO date, e.g. "2026-01-15"
    summary: string;
    tags: string[];
    readingTime: string;
};

// TODO (Step 7): read MDX files from content/posts
export function getLatestPosts(count = 3): PostMeta[] {
    const posts: PostMeta[] = [];
    return posts.slice(0, count);
}