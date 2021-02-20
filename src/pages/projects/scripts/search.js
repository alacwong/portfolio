// Searching algorithms


const Mouse = 1;
const Cheese = -1;

// Generate maze
function generateMaze(n) {

    const graphData = {};

    // generate full graph with edge weights
    for (let i=0; i <n; i++) {
        for (let j=0; j <n; j++) {
            // add include edge weight
            graphData[getIndex(n, [i, j])] = validSquares(n, [i, j]).map(
                square => [square, Math.random()]
            );
        }
    }

    const newGraph = {};
    let graphSize = 0;

    // Initialize with 0 node's neighbors
    // shape: [u, v, <u,v> weight]
    let q = [...[...graphData[0]].map(node => [0, ...node])];

    while (graphSize < n*n - 1) {

        // get minimum edge
        let [minEdge, minIndex] = q.reduce( (acc, curr, index) => {
            let [lowestEdge, ] = acc;
            if (curr[2] < lowestEdge[2]) {
                return [curr, index];
            } else {
                return acc
            }
        }, [q[0], 0]);

        q.splice(minIndex, 1);
        const [u, v,] = minEdge;

        if (newGraph[v] !== undefined) {
            //accept edge by probability
            if (Math.random() < 0.05) {
                addEdge(u,v, newGraph);
                addEdge(v, u, newGraph);
            }
        } else {
            addEdge(u,v, newGraph);
            addEdge(v, u, newGraph);
            graphSize += 1;

            // add all edges u-v st u v not in G
            q.push(...graphData[v].filter(node => newGraph[node] === undefined).map(node => [v, ...node]));
        }
    }

    return new Graph(newGraph, n, graphData);
}

function addEdge(u, v, graph) {
    if (graph[u] === undefined) {
        graph[u] = [v];
    } else {
        graph[u].push(v);
    }
}

function validSquares(n, coords) {
    const [x, y] = coords;
    const validNeighbors = [];

    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    for (let direction of directions) {
        const [i, j] = direction;
        if (validSquare(x + i, y + j, n)) {
            validNeighbors.push(getIndex(n, [x + i, y + j]));
        }
    }

    return validNeighbors;
}

function validSquare(i, j, n) {
    return i >= 0 && j >= 0 && i < n && j < n;
}

function getIndex(n, coords) {
    const [x, y] = coords;
    return x*n  + y;
}

function getCoords(n, index) {
    return [Math.floor(index / n), index % n];
}

class Graph {

    constructor(graph, n, fullGraph) {
        this.n = n;
        this.graph = graph;
        this.fullGraph = fullGraph
    }

    get(coords) {
        const index = getIndex(this.n, coords)
        return this.graph[index].map(node => getCoords(this.n, node));
    }

    getWalls(coords) {
        const styleMap = {
            '0,-1': 'borderLeft',
            '-1,0': 'borderTop',
            '1,0': 'borderBottom',
            '0,1': 'borderRight'
        };
        const fullSet = new Set(this.fullGraph[getIndex(this.n, coords)].map(node => node[0]));
        const gSet = new Set(this.graph[getIndex(this.n, coords)]);
        return [...fullSet].filter(node => !gSet.has(node)).map(node => {
            const [x, y] = getCoords(this.n, node);
            const [i, j] = coords;
            return styleMap[[x -i, y - j].toString()]
        }).reduce( (acc, curr) => {
                acc[curr] = '1px solid black'
                return acc;
            }, {}
        );
    }
}

function generateBoard(n) {
    // Generate board with
    const board = [];
    for(let i=0; i < n; i++) {
        const row = []
        for(let j=0; j < n; j++) {
            row.push(0);
        }
        board.push(row);
    }

    let [x, y] = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]

    board[x][y] = Mouse;

    const numCheese = Math.ceil(4 + Math.random()* 6);

    for (let i=0; i < numCheese; i++) {
        [x, y] = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]
        if (board[x][y] !== Mouse) {
            board[x][y] = Cheese;
        }
    }
    return board;
}

export {generateMaze, generateBoard, Mouse, Cheese}