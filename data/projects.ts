export type ProjectCategory = "Web" | "Desktop" | "Games" | "AI" | "Misc";

export type Project = {
    slug: string;
    title: string;
    summary: string;
    description: string[];
    category: ProjectCategory;
    year: number;
    stack: string[];
    highlights: string[];
    githubUrl: string; // Repo URL. Empty string hides the button.
    liveUrl?: string;
    images: string[]; // TODO: add files in /public/images/projects/
    featured: boolean;
};

export const projectCategories: ("All" | ProjectCategory)[] = [
    "All",
    "Web",
    "Desktop",
    "Games",
    "AI",
    "Misc",
];

export const projects: Project[] = [
    {
        slug: "lost-and-found-system",
        title: "Lost & Found Intelligence System",
        summary:
            "A web platform for registering, searching, and claiming lost items on campus.",
        description: [
            "This system replaces a manual, register-based lost-and-found process at the university with a web application backed by a relational database.",
            "It supports item registration and search, claim submission and review, digital receipts, and in-app notifications, with separate access levels for Admin, Staff, Student, and Faculty users.",
        ],
        category: "Web",
        year: 2025,
        stack: ["React", "FastAPI", "PostgreSQL", "Axios"],
        highlights: [
            "Replaced a manual register-based process at the university",
            "9-table PostgreSQL schema with custom ENUMs, cascade deletes, and audit logging",
            "Role-based access for Admin, Staff, Student, and Faculty",
            "SHA-256 password hashing and parameterized queries",
        ],
        githubUrl: "https://github.com/SayedMusawar/Lost-FoundIntelligence",
        images: [],
        featured: true,
    },
    {
        slug: "it-problem-reporting",
        title: "IT Components Problem Reporting System",
        summary:
            "A Java desktop app for reporting and tracking IT problems across user roles.",
        description: [
            "A desktop application where Students, Faculty, IT Staff, and Admins each get their own workflow for handling IT component problems.",
            "Users submit complaints, staff assign priority and update status, and the system produces reports. The code follows a layered architecture and uses enum-driven state machines.",
        ],
        category: "Desktop",
        year: 2025,
        stack: ["Java", "Swing", "OOP"],
        highlights: [
            "Role-based workflows for Students, Faculty, IT Staff, and Admins",
            "Complaint submission, priority assignment, status tracking, and reports",
            "Layered architecture: model, repository, service, UI",
            "Enum-driven state machines",
        ],
        githubUrl:
            "https://github.com/SayedMusawar/IT-Components-Problem-Reporting-SysteM",
        images: [],
        featured: true,
    },
    {
        slug: "chess-game",
        title: "Chess Game",
        summary:
            "A two-player chess game with full rules and a Qt graphical interface.",
        description: [
            "A desktop chess game written in C++ with an interactive Qt interface. It implements the full rules and piece movement, with turn-based play.",
            "The design leans on object-oriented programming, with a class hierarchy for the pieces.",
        ],
        category: "Games",
        year: 2024,
        stack: ["C++", "Qt"],
        highlights: [
            "Full chess rules and piece movement",
            "Turn-based gameplay",
            "OOP class design and inheritance",
            "Interactive Qt GUI",
        ],
        githubUrl: "https://github.com/SayedMusawar/Chess-Game",
        images: [],
        featured: true,
    },
    {
        slug: "snake-game",
        title: "Snake Game",
        summary: "A classic snake game with a real-time loop, built in C++ with SFML.",
        description: [
            "A real-time snake game with keyboard controls and collision detection, built with C++ and SFML.",
        ],
        category: "Games",
        year: 2024,
        stack: ["C++", "SFML"],
        highlights: [
            "Real-time game loop",
            "Keyboard controls",
            "Collision detection",
            "Built with SFML",
        ],
        githubUrl: "https://github.com/SayedMusawar/snake_game",
        images: [],
        featured: false,
    },
    {
        slug: "weather-app",
        title: "Weather Application",
        summary: "A weather app that fetches live data from a REST API.",
        description: [
            // TODO: owner to add details (which API, features, what you learned)
            "A web application written in JavaScript that gets weather data from a REST API.",
        ],
        category: "Web",
        year: 2024,
        stack: ["JavaScript", "REST API"],
        highlights: [], // TODO
        githubUrl: "https://github.com/SayedMusawar/Whether_APP",
        images: [],
        featured: false,
    },
    {
        slug: "todo-app",
        title: "To-Do List Application",
        summary: "A desktop to-do list built with C++ and Qt.",
        description: [
            // TODO: owner to add details (features, what you learned)
            "A desktop task list application written in C++ with a Qt interface.",
        ],
        category: "Desktop",
        year: 2024,
        stack: ["C++", "Qt"],
        highlights: [], // TODO
        githubUrl: "", // No repo yet
        images: [],
        featured: false,
    },
    {
        slug: "youtube-clone",
        title: "YouTube Clone (static front end)",
        summary: "A static front-end recreation of the YouTube layout.",
        description: [
            "A front-end-only clone of the YouTube interface, built with HTML and CSS to practice layout.",
        ],
        category: "Web",
        year: 2024,
        stack: ["HTML", "CSS"],
        highlights: [], // TODO
        githubUrl: "https://github.com/SayedMusawar/Youtube_clone",
        images: [],
        featured: false,
    },
    {
        slug: "spotify-clone",
        title: "Spotify Clone (interface)",
        summary: "A static recreation of the Spotify interface.",
        description: [
            "A front-end-only clone of the Spotify interface, built with HTML and CSS.",
        ],
        category: "Web",
        year: 2024,
        stack: ["HTML", "CSS"],
        highlights: [], // TODO
        githubUrl: "", // No repo yet
        images: [],
        featured: false,
    },
    {
        slug: "small-projects",
        title: "Small projects",
        summary:
            "Calculator, countdown timer, number guessing, and rock paper scissors.",
        description: [
            "A group of small practice projects: a calculator, a countdown timer, a number guessing game, and rock paper scissors. Some are built with HTML and CSS, others with Python.",
            // TODO: owner to say which project uses which language
        ],
        category: "Misc",
        year: 2024,
        stack: ["HTML/CSS", "Python"],
        highlights: [], // TODO
        githubUrl: "", // Only the calculator has a repo; the group has no single repo
        images: [],
        featured: false,
    },
];

export function getProject(slug: string) {
    return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
    return projects.filter((p) => p.featured);
}

/** Previous and next project for the detail page (wraps around). */
export function getAdjacentProjects(slug: string) {
    const i = projects.findIndex((p) => p.slug === slug);
    if (i === -1) return { prev: undefined, next: undefined };
    return {
        prev: projects[(i - 1 + projects.length) % projects.length],
        next: projects[(i + 1) % projects.length],
    };
}