export type CellPos = { row: number; col: number };
export type AlgorithmId = "bfs" | "dfs" | "astar";
export type RunResult = { visitedInOrder: CellPos[]; path: CellPos[] };

type Walls = boolean[][];

function key(p: CellPos) {
    return `${p.row},${p.col}`;
}

function neighbors(p: CellPos, rows: number, cols: number): CellPos[] {
    const deltas = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
    ];
    const out: CellPos[] = [];
    for (const d of deltas) {
        const r = p.row + d.row;
        const c = p.col + d.col;
        if (r >= 0 && r < rows && c >= 0 && c < cols) out.push({ row: r, col: c });
    }
    return out;
}

function reconstructPath(cameFrom: Map<string, CellPos>, end: CellPos): CellPos[] {
    const path: CellPos[] = [];
    let current: CellPos | undefined = end;
    while (current) {
        path.unshift(current);
        current = cameFrom.get(key(current));
    }
    return path;
}

export function bfs(walls: Walls, start: CellPos, end: CellPos): RunResult {
    const rows = walls.length;
    const cols = walls[0].length;
    const visited = new Set<string>([key(start)]);
    const visitedInOrder: CellPos[] = [];
    const cameFrom = new Map<string, CellPos>();
    const queue: CellPos[] = [start];

    while (queue.length > 0) {
        const current = queue.shift()!;
        visitedInOrder.push(current);
        if (current.row === end.row && current.col === end.col) {
            return { visitedInOrder, path: reconstructPath(cameFrom, end) };
        }
        for (const n of neighbors(current, rows, cols)) {
            if (walls[n.row][n.col] || visited.has(key(n))) continue;
            visited.add(key(n));
            cameFrom.set(key(n), current);
            queue.push(n);
        }
    }
    return { visitedInOrder, path: [] };
}

export function dfs(walls: Walls, start: CellPos, end: CellPos): RunResult {
    const rows = walls.length;
    const cols = walls[0].length;
    const visited = new Set<string>();
    const visitedInOrder: CellPos[] = [];
    const cameFrom = new Map<string, CellPos>();
    const stack: CellPos[] = [start];

    while (stack.length > 0) {
        const current = stack.pop()!;
        const k = key(current);
        if (visited.has(k)) continue;
        visited.add(k);
        visitedInOrder.push(current);
        if (current.row === end.row && current.col === end.col) {
            return { visitedInOrder, path: reconstructPath(cameFrom, end) };
        }
        for (const n of neighbors(current, rows, cols)) {
            if (walls[n.row][n.col] || visited.has(key(n))) continue;
            if (!cameFrom.has(key(n))) cameFrom.set(key(n), current);
            stack.push(n);
        }
    }
    return { visitedInOrder, path: [] };
}

function heuristic(a: CellPos, b: CellPos): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(walls: Walls, start: CellPos, end: CellPos): RunResult {
    const rows = walls.length;
    const cols = walls[0].length;
    const visitedInOrder: CellPos[] = [];
    const cameFrom = new Map<string, CellPos>();
    const gScore = new Map<string, number>([[key(start), 0]]);
    const fScore = new Map<string, number>([[key(start), heuristic(start, end)]]);
    const open = new Map<string, CellPos>([[key(start), start]]);
    const closed = new Set<string>();

    while (open.size > 0) {
        let currentKey = "";
        let currentF = Infinity;
        for (const [k, pos] of open) {
            const f = fScore.get(k) ?? Infinity;
            if (f < currentF) {
                currentF = f;
                currentKey = k;
            }
            void pos;
        }
        const current = open.get(currentKey)!;
        open.delete(currentKey);
        closed.add(currentKey);
        visitedInOrder.push(current);

        if (current.row === end.row && current.col === end.col) {
            return { visitedInOrder, path: reconstructPath(cameFrom, end) };
        }

        for (const n of neighbors(current, rows, cols)) {
            const nk = key(n);
            if (walls[n.row][n.col] || closed.has(nk)) continue;
            const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1;
            if (tentativeG < (gScore.get(nk) ?? Infinity)) {
                cameFrom.set(nk, current);
                gScore.set(nk, tentativeG);
                fScore.set(nk, tentativeG + heuristic(n, end));
                if (!open.has(nk)) open.set(nk, n);
            }
        }
    }
    return { visitedInOrder, path: [] };
}

export function runAlgorithm(id: AlgorithmId, walls: Walls, start: CellPos, end: CellPos): RunResult {
    if (id === "bfs") return bfs(walls, start, end);
    if (id === "dfs") return dfs(walls, start, end);
    return astar(walls, start, end);
}