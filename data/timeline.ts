export type TimelineItem = {
    id: string;
    title: string;
    organization: string;
    period: string;
    description?: string;
};

export const education: TimelineItem[] = [
    {
        id: "fast-nuces",
        title: "BS Computer Science",
        organization: "FAST-NUCES (Karachi campus)",
        period: "2024 to present",
        description: "Started at the Peshawar campus, now at the Karachi campus.",
    },
    // TODO (owner to confirm): SSC and HSSC institutions and dates
];

export const leadership: TimelineItem[] = [
    {
        id: "mlsa",
        title: "Microsoft Learn Student Ambassador",
        organization: "Microsoft",
        period: "2025 to 2026",
        description:
            "Selected for Microsoft's global student leadership program. Organizes and takes part in technical workshops and peer-learning sessions on campus.",
    },
    {
        id: "ieee",
        title: "IEEE Student Member",
        organization: "IEEE",
        period: "2024 to present",
        description: "Technical events and workshops.",
    },
];

export const certifications: TimelineItem[] = [
    {
        id: "digiskills",
        title: "Video Editing, Animation and Vlogging",
        organization: "DigiSkills DSTP 3.0 (Batch-01)",
        period: "Aug to Nov 2025",
    },
];

export const coursework: string[] = [
    "OOP",
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Artificial Intelligence",
    "Software Design and Analysis",
    "Operating Systems",
    "Computer Organization and Assembly Language",
    "Theory of Automata",
    "Discrete Structures",
    "Linear Algebra",
    "Probability and Statistics",
];