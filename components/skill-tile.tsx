import type { SkillGroup } from "@/data/skills";

const span: Record<SkillGroup["size"], string> = {
    large: "md:col-span-2 lg:col-span-4 lg:row-span-2",
    medium: "lg:col-span-2",
    small: "lg:col-span-2",
};

const pill =
    "rounded-full border border-[color:var(--border)] bg-[var(--bg)] px-3 py-1 text-sm transition-colors duration-150 hover:border-[color:var(--muted)] motion-reduce:transition-none";

export function SkillTile({ group }: { group: SkillGroup }) {
    const large = group.size === "large";
    return (
        <li
            className={`flex flex-col rounded-[12px] border border-[color:var(--border)] bg-[var(--surface)] p-6 ${span[group.size]}`}
        >
            <h2
                className={`font-semibold tracking-tight ${large ? "text-2xl" : "text-lg"}`}
            >
                {group.title}
            </h2>
            {group.note ? (
                <p className="mt-2 text-sm text-[color:var(--muted)]">{group.note}</p>
            ) : null}
            <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                    <li key={skill} className={pill}>
                        {skill}
                    </li>
                ))}
            </ul>
        </li>
    );
}
