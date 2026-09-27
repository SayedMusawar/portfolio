import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostSlugsForParams, getPostContent, getAdjacentPosts } from "@/lib/posts";
import { blogMdxComponents } from "@/components/blog-mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareLinks } from "@/components/share-links";

export function generateStaticParams() {
  return getPostSlugsForParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostContent(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary,
    openGraph: {
      title: post.meta.title,
      description: post.meta.summary,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostContent(slug);
  if (!post) notFound();

  const { meta, headings, MDXContent } = post;
  const { prev, next } = getAdjacentPosts(slug);
  // TODO: set NEXT_PUBLIC_SITE_URL to the real domain after Step 10 (deploy)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <article className="container-page section-space">
      <header className="mb-8 max-w-[70ch]">
        <p className="text-sm text-muted-foreground">
          {new Date(meta.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
          {" · "}
          {meta.readingTime}
        </p>
        <h1 className="text-title mt-2">{meta.title}</h1>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
          {meta.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tag/${tag}`}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
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

          <nav className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
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