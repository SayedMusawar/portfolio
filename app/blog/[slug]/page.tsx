import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostSlugsForParams, getPostContent, getAdjacentPosts } from "@/lib/posts";
import { blogMdxComponents } from "@/components/blog-mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareLinks } from "@/components/share-links";
import { JsonLd } from "@/components/jsonld";
import { getSiteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugsForParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostContent(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      siteName: profile.name,
      url: `/blog/${slug}`,
      title: post.meta.title,
      description: post.meta.summary,
      publishedTime: post.meta.date,
      tags: [...post.meta.tags],
      authors: [profile.name],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPostContent(slug);
  if (!post) notFound();

  const { meta, headings, MDXContent } = post;
  const { prev, next } = getAdjacentPosts(slug);
  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    url: postUrl,
    mainEntityOfPage: postUrl,
    keywords: meta.tags.join(", "),
    author: { "@type": "Person", name: profile.name, url: siteUrl },
  };

  return (
    <article className="container-page section-space">
      <JsonLd data={articleSchema} />
      <header className="mb-8 max-w-[70ch]">
        <p className="text-sm text-muted-foreground">
          <time dateTime={meta.date}>
            {new Date(meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
          </time>
          {" · "}
          {meta.readingTime}
        </p>
        <h1 className="text-title mt-2">{meta.title}</h1>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
          {meta.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/blog/tag/${tag}`} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <div className="max-w-[70ch]">
          <MDXContent components={blogMdxComponents} />

          <div className="mt-10 border-t border-border pt-6">
            <ShareLinks url={postUrl} title={meta.title} />
          </div>

          <nav aria-label="More posts" className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="text-sm">
                <span className="block text-muted-foreground">Previous</span>
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="text-right text-sm sm:ml-auto">
                <span className="block text-muted-foreground">Next</span>
                {next.title}
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>
    </article>
  );
}