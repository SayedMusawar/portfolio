import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/posts";

const staticRoutes = ["", "/projects", "/play", "/play/chess", "/play/snake", "/skills", "/ai-lab", "/blog", "/about", "/resume", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = getSiteUrl();
    const posts = getAllPosts();
    const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

    return [
        ...staticRoutes.map((path) => ({ url: `${siteUrl}${path}`, priority: path === "" ? 1 : 0.7 })),
        ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, priority: 0.6 })),
        ...posts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: new Date(post.date), priority: 0.6 })),
        ...tags.map((tag) => ({ url: `${siteUrl}/blog/tag/${encodeURIComponent(tag)}`, priority: 0.3 })),
    ];
}