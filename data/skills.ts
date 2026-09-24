export type SkillGroup = {
    id: string;
    title: string;
    skills: string[];
    note?: string;
    size: "large" | "medium" | "small";
};

export const skillGroups: SkillGroup[] = [
    {
        id: "ai-ml",
        title: "AI and ML (coursework level)",
        skills: [
            "BFS",
            "DFS",
            "UCS",
            "A*",
            "Iterative Deepening",
            "Bidirectional Search",
            "Hill Climbing",
            "Simulated Annealing",
            "Minimax",
            "Alpha-Beta Pruning",
            "CSP (N-Queens)",
            "Linear and Logistic Regression",
            "Gradient Descent",
            "Naive Bayes",
            "K-Means",
            "K-NN",
            "Neural Networks",
        ],
        size: "large",
    },
    {
        id: "languages",
        title: "Languages",
        skills: ["Python", "C++", "C", "Java", "JavaScript (basic)"],
        size: "medium",
    },
    {
        id: "web",
        title: "Web",
        skills: ["React", "FastAPI", "HTML5", "CSS3", "REST APIs", "Axios"],
        size: "medium",
    },
    {
        id: "databases",
        title: "Databases",
        skills: ["PostgreSQL", "MySQL", "SQLite"],
        size: "small",
    },
    {
        id: "desktop-games",
        title: "Desktop and games",
        skills: ["Qt", "SFML", "Java Swing"],
        size: "small",
    },
    {
        id: "python-libs",
        title: "Python libraries",
        skills: ["NumPy", "Pandas", "Matplotlib", "NetworkX", "Scikit-learn"],
        size: "medium",
    },
    {
        id: "familiar",
        title: "Familiar with (not expert)",
        skills: ["TensorFlow", "PyTorch", "OpenAI APIs"],
        note: "Used for learning and small experiments, not at expert level.",
        size: "small",
    },
    {
        id: "tools",
        title: "Tools",
        skills: [
            "Git and GitHub",
            "Linux (Ubuntu, Arch)",
            "VS Code",
            "IntelliJ IDEA",
            "Eclipse",
        ],
        size: "medium",
    },
    {
        id: "concepts",
        title: "Concepts",
        skills: [
            "OOP",
            "Data Structures",
            "Algorithms",
            "SDLC",
            "Software Design and Analysis",
        ],
        size: "medium",
    },
];