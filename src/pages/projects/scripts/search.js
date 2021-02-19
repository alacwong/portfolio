// Searching algorithms


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

    // console.log(graphData);

    const newGraph = {};
    let graphSize = 0;

    // Initialize with 0 node's neighbors
    // shape: [u, v, <u,v> weight]
    let q = [...[...graphData[0]].map(node => [0, ...node])];

    //
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

        // ? add edge
        if (newGraph[v]) {
            // accept edge by probability
            // if (Math.random() < 0.5) {
            //     if (newGraph[u] !== undefined) {
            //         newGraph[u].push(v);
            //     } else {
            //         newGraph[u] = [v];
            //     }
            // }
        } else {
            if (newGraph[u] !== undefined) {
                newGraph[u].push(v);
            } else {
                newGraph[u] = [v];
            }
            graphSize += 1;

            // add all edges u-v st u v not in G
            q.push(...graphData[v].filter(node => newGraph[node] === undefined).map(node => [v, ...node]))
        }
    }

    return new Graph(newGraph, n, graphData);
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
            '0,1': 'borderTop',
            '-1,0': 'borderLeft',
            '1,0': 'borderRight',
            '0,-1': 'borderBottom'
        };

        const fullSet = new Set(this.fullGraph[getIndex(this.n, coords)].map(node => node[0]));
        const gSet = new Set(this.graph[getIndex(this.n, coords)]);
        return [...fullSet].filter(node => !gSet.has(node)).map(node => {
            const [x, y] = getCoords(this.n, node);
            const [i, j] = coords;
            return styleMap[[x -i, y - j].toString()]
        }).reduce( (acc, curr) => {
                acc[curr] = '2px solid black'
                return acc;
            }, {}
        );
    }

}

export {generateMaze}