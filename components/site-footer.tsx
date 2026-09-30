import { profile } from "@/data/profile";

const linkClass = "inline-flex min-h-10 items-center text-muted-foreground transition-colors duration-150 hover:text-brand";

const links = [
    { href: profile.github, label: "GitHub", external: true },
    { href: profile.linkedin, label: "LinkedIn", external: true },
    { href: `mailto:${profile.email}`, label: "Email", external: false },
];

export function SiteFooter() {
    return (
        <footer className="border-t">
            <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-heading font-semibold">{profile.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {profile.university}, {profile.location}
                    </p>
                </div>

                <nav aria-label="Contact links" className="flex flex-wrap gap-x-5 text-sm">
                    {links.map((link) =>
                        link.external ? (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                {link.label}
                                <span className="sr-only">(opens in a new tab)</span>
                            </a>
                        ) : (
                            <a key={link.label} href={link.href} className={linkClass}>
                                {link.label}
                            </a>
                        )
                    )}
                </nav>
            </div>
            <div className="container-page pb-8 text-sm text-muted-foreground">
                © {new Date().getFullYear()} {profile.name}
            </div>
        </footer>
    );
}