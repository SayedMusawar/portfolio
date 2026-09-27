import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return { title: `Posts tagged "${tag}"` };
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="container-page section-space">
      <p className="mb-2 text-sm text-muted-foreground">
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>{" "}
        / {tag}
      </p>
      <h1 className="text-title mb-6">Posts tagged &quot;{tag}&quot;</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}