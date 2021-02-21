// Searching algorithms


const Mouse = 2;
const Cheese = 3;
const Visited  = 5;
const Path = 7;

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
            row.push(1);
        }
        board.push(row);
    }

    let [x, y] = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]

    board[x][y] = Mouse;

    const numCheese = Math.ceil(4 + Math.random()* 6);

    for (let i=0; i < numCheese; i++) {
        [x, y] = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]
        if (board[x][y]% Mouse !== 0) {
            board[x][y] *= Cheese;
        }
    }
    return board;
}

function DFS(board, graph) {
    // Run Depth First Search
    let cheeses = numCheese(board);

    const dfsHelper = (mouse) => {
        const [i, j] = mouse;
        board[i][j] *= Visited;

        if (board[i][j] % Cheese === 0) {
            cheeses --;
            board[i][j] *= Path;
            return [i, j];
        }

        const neighbors = graph.get(mouse);
        for (const neighbor of neighbors) {
            let [x, y] = neighbor;
            if (board[x][y] % Visited !== 0) {
                const cheese = dfsHelper(neighbor);
                if (cheese.length > 0) {
                    board[x][y] *= Path;
                    return cheese;
                }
            }
        }

        // backtrack from this path
        return [];
    }

    let mouse = getMouse(board)
    console.log(dfsHelper(mouse));
    //console.log(traversePath(board, mouse, graph, []), 't')
    return board;
}

function copyBoard (board) {
    const temp = []

    for (let i=0; i < board.length; i++) {
        const row = []
        for (let j=0; j < board[i].length; j++) {
            row.push(board[i][j]);
        }
        temp.push(row);
    }

    return temp;
}

function unVisit(board) {
    for (let i=0; i < board.length; i++) {
        for (let j=0; j < board.length; j++) {
            board[i][j]/=Visited;
        }
    }
}

function numCheese(board) {

    let cheese = 0;

    for (let i=0; i <board.length; i++ ){
        for (let j=0; j < board.length; j++) {
            if (board[i][j] % Cheese === 0) {
                cheese++;
            }
        }
    }
    return cheese;
}

function getMouse(board) {
    for (let i=0; i <board.length; i++ ){
        for (let j=0; j < board.length; j++) {
            if (board[i][j] % Mouse === 0) {
                return [i, j]
            }
        }
    }
}

class PathFinder {
    // wrapper class to run different path finding algorithms

    dfs(board, graph){
        return DFS(board, graph);
    }

}

function traversePath(board, mouse, graph, frames) {

    const neighbors = graph.get(mouse);
    const [x, y] = mouse;
    if (board[x][y] % Mouse !== 0) {
        board[x][y] *= Mouse;
    }

    if (board[x][y] % Path === 0) {
        board[x][y] /= Path;
    }

    frames.push(copyBoard(board));

    for (const neighbor of neighbors) {
        let [i, j] = neighbor;
        if (board[i][j] % Path === 0) {
            board[x][y] /= Mouse;
            traversePath(board, neighbor, graph, frames);
            break;
        }
    }

    return frames;
}


export {generateMaze, generateBoard, Mouse, Cheese, Visited, Path, PathFinder}