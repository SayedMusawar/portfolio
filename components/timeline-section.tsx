import type { TimelineItem } from "@/data/timeline";

export function TimelineSection({ title, items }: { title: string; items: TimelineItem[] }) {
    return (
        <section className="mt-16 md:mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <ol className="mt-6 border-l border-[color:var(--border)]">
                {items.map((item) => (
                    <li key={item.id} className="relative pb-8 pl-6 last:pb-0">
                        <span aria-hidden="true" className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-[color:var(--muted)]" />
                        <p className="text-sm text-[color:var(--muted)]">{item.period}</p>
                        <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                        <p className="text-[color:var(--muted)]">{item.organization}</p>
                        {item.description ? <p className="mt-2 max-w-[65ch]">{item.description}</p> : null}
                    </li>
                ))}
            </ol>
        </section>
    );
}