import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/code-block";

export const blogMdxComponents: MDXComponents = {
    h2: (props) => <h2 className="mb-4 mt-10 scroll-mt-24 text-xl font-semibold" {...props} />,
    h3: (props) => <h3 className="mb-3 mt-8 scroll-mt-24 text-lg font-semibold" {...props} />,
    p: (props) => <p className="mb-4 leading-7 text-foreground" {...props} />,
    a: (props) => {
        const href = props.href ?? "";
        if (href.startsWith("/")) {
            return <Link href={href} className="text-brand underline underline-offset-4" {...props} />;
        }
        return <a target="_blank" rel="noreferrer" className="text-brand underline underline-offset-4" {...props} />;
    },
    ul: (props) => <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />,
    ol: (props) => <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />,
    blockquote: (props) => <blockquote className="mb-4 border-l-2 border-border pl-4 text-muted-foreground" {...props} />,
    table: (props) => (
        <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm" {...props} />
        </div>
    ),
    th: (props) => <th className="border-b border-border px-3 py-2 text-left font-semibold" {...props} />,
    td: (props) => <td className="border-b border-border px-3 py-2" {...props} />,
    pre: (props) => <CodeBlock {...props} />,
    code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />,
};