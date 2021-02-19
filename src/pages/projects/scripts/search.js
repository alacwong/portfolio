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

    const newGraph = {};
    let graphSize = 0;

    // Initialize with 0 node's neighbors
    // shape: [u, v, <u,v> weight]
    const q = [[...graphData[0]].map(node => [0, ...node])];

    //
    while (graphSize < n - 1) {

        // get minimum edge
        let [minEdge, minIndex] = q.reduce( (acc, curr, index) => {
            let [lowestEdge, ] = acc;
            if (curr[2] < lowestEdge[2]) {
                return [curr, index];
            } else {
                return acc
            }
        });

        q.splice(minIndex, 1);
        const [u, v] = minEdge;

        // ? add edge
        if (newGraph[v]) {
            // accept edge by probability
            if (Math.random() < 0.25) {
                newGraph[u].push(v);
            }
        } else {
            newGraph[u].push(v);
            graphSize += 1;
            q.concat([...graphData[v].map( node => [v, ...node])]);
        }
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

}