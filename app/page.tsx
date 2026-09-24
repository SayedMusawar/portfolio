import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";

const swatches = [
  { name: "bg", cls: "bg-background" },
  { name: "surface", cls: "bg-surface" },
  { name: "border", cls: "bg-border" },
  { name: "text", cls: "bg-foreground" },
  { name: "muted", cls: "bg-muted-foreground" },
  { name: "accent", cls: "bg-brand" },
];

export default function Home() {
  return (
    <div className="container-page section-space">
      <h1 className="text-display">{profile.name}</h1>
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
        {profile.role}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className={buttonVariants()}>
          View projects
        </Link>
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          Read the blog
        </Link>
      </div>

      <section className="mt-16 rounded-xl border bg-surface p-6">
        <h2 className="text-title">Design system check</h2>
        <p className="mt-2 text-muted-foreground">
          Flat colors, 1px borders, two radii. Toggle the theme in the header.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {swatches.map((s) => (
            <div key={s.name}>
              <div className={`h-14 rounded-xl border ${s.cls}`} />
              <p className="mt-1 text-sm text-muted-foreground">{s.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>Next.js</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="secondary">Tailwind</Badge>
        </div>
        <pre className="mt-6 overflow-x-auto rounded-xl border bg-background p-4 font-mono text-sm">
          {"npm run dev"}
        </pre>
      </section>
    </div>
  );
}