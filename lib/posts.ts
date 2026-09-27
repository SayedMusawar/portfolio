import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
    slug: string;
    title: string;
    date: string; // ISO date, e.g. "2026-01-15"
    summary: string;
    tags: string[];
    readingTime: string;
    draft: boolean;
};

export type Heading = { id: string; text: string; level: number };

function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}

function readRaw(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    return fs.readFileSync(fullPath, "utf8");
}

function toMeta(slug: string, raw: string): PostMeta {
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        summary: data.summary ?? "",
        tags: data.tags ?? [],
        readingTime: stats.text,
        draft: data.draft ?? false,
    };
}

export function getAllPosts(): PostMeta[] {
    const isProd = process.env.NODE_ENV === "production";
    return getPostSlugs()
        .map((slug) => {
            const raw = readRaw(slug);
            return raw ? toMeta(slug, raw) : null;
        })
        .filter((post): post is PostMeta => post !== null && (!post.draft || !isProd))
        .sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1));
}

export function getLatestPosts(count = 3): PostMeta[] {
    return getAllPosts().slice(0, count);
}

export function getPostSlugsForParams(): string[] {
    return getAllPosts().map((p) => p.slug);
}

export function getAllTags(): string[] {
    const tags = new Set<string>();
    getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
    return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
    const posts = getAllPosts();
    const index = posts.findIndex((p) => p.slug === slug);
    if (index === -1) return { prev: null, next: null };
    return {
        prev: index < posts.length - 1 ? posts[index + 1] : null,
        next: index > 0 ? posts[index - 1] : null,
    };
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

// Approximates rehype-slug's ids (github-slugger) closely enough for h2/h3.
// If a heading id doesn't scroll to the right place, compare against the
// actual rendered id in devtools and adjust this function.
function extractHeadings(markdown: string): Heading[] {
    const lines = markdown.split("\n");
    const headings: Heading[] = [];
    const seen = new Map<string, number>();
    let inCodeFence = false;

    for (const line of lines) {
        if (line.trim().startsWith("```")) {
            inCodeFence = !inCodeFence;
            continue;
        }
        if (inCodeFence) continue;

        const match = /^(#{2,3})\s+(.*)$/.exec(line);
        if (!match) continue;

        const level = match[1].length;
        const text = match[2].replace(/[*_`]/g, "").trim();
        let id = slugify(text);
        const count = seen.get(id) ?? 0;
        seen.set(id, count + 1);
        if (count > 0) id = `${id}-${count}`;

        headings.push({ id, text, level });
    }

    return headings;
}

export async function getPostContent(slug: string) {
    const raw = readRaw(slug);
    if (!raw) return null;

    const { content } = matter(raw);
    const meta = toMeta(slug, raw);
    const headings = extractHeadings(content);

    const { default: MDXContent } = await evaluate(content, {
        ...runtime,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            [
                rehypePrettyCode,
                {
                    theme: { light: "github-light", dark: "github-dark" },
                    keepBackground: false,
                },
            ],
        ],
    });

    return { meta, headings, MDXContent };
}