import { getAllPosts, getAllTags } from "@/lib/posts";
import { BlogList } from "@/components/blog-list";

export const metadata = {
  title: "Blog",
  description: "Writing on software, algorithms, and things I'm building.",
};

export default function Page() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container-page section-space">
      <h1 className="text-title mb-6">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">First posts are on the way.</p>
      ) : (
        <BlogList posts={posts} tags={tags} />
      )}
    </div>
  );
}