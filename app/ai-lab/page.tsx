import type { Metadata } from "next";
import { Pathfinder } from "@/components/pathfinder/pathfinder";

export const metadata: Metadata = {
  title: "AI lab",
  description: "An interactive BFS, DFS, and A* pathfinding visualizer, plus AI and ML topics from coursework.",
};

const algorithmNotes = [
  {
    id: "BFS",
    text: "Explores every cell at the current distance from the start before moving further out. On an unweighted grid, this guarantees the shortest path.",
  },
  {
    id: "DFS",
    text: "Follows one path as far as it can before backtracking. It will find a path if one exists, but not necessarily the shortest one.",
  },
  {
    id: "A*",
    text: "Works like BFS but uses a heuristic (grid distance to the goal) to explore promising cells first, usually visiting far fewer cells while still finding the shortest path.",
  },
];

const coursework = [
  "BFS", "DFS", "UCS", "A*", "Iterative deepening", "Bidirectional search",
  "Hill climbing", "Simulated annealing", "Minimax", "Alpha-beta pruning",
  "CSP (N-Queens)", "Linear and logistic regression", "Gradient descent",
  "Naive Bayes", "K-Means", "K-NN", "Neural networks",
];

export default function Page() {
  return (
    <div className="container-page section-space space-y-16">
      <div className="space-y-3">
        <h1 className="text-display">AI lab</h1>
        <p className="max-w-2xl text-muted-foreground">
          A small pathfinding grid that shows how search algorithms from my Artificial Intelligence
          coursework actually behave. Draw walls, place the start and end points, pick an algorithm,
          and press Visualize.
        </p>
      </div>

      <Pathfinder />

      <div className="grid gap-8 md:grid-cols-3">
        {algorithmNotes.map((a) => (
          <div key={a.id} className="space-y-2 rounded-xl border border-[color:var(--border)] bg-surface p-5">
            <h2 className="font-mono text-sm text-brand">{a.id}</h2>
            <p className="text-sm text-muted-foreground">{a.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-title">AI and ML topics from coursework</h2>
        <div className="flex flex-wrap gap-2">
          {coursework.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-[color:var(--border)] bg-surface px-3 py-1 text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}