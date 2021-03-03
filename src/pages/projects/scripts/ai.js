// class
import {copyBoard} from "./search";

const Mouse = 2;
const Cheese = 3;
const Visited  = 5;
const Path = 7;
const Cat = 11;

function BFS(board, graph, cat) {

    let parent = {};
    let q = [graph.hash(cat)]
    let mouse = []

        // function to mark back path

    while (q.length > 0) {
        let [i, j] = graph.unHash(q.shift())
        board[i][j] *= Visited;

        if (board[i][j] % Mouse === 0) {
            mouse =[i, j];
            parent[graph.hash(mouse)] = graph.hash([i, j])
            break;
        }

        const neighbors = graph.get([i, j])
        for (const neighbor of neighbors) {
            let [x, y] = neighbor;
            if (board[x][y] % Visited !== 0 && !q.includes(graph.hash([x, y]))) {
                parent[graph.hash(neighbor)] = graph.hash([i, j]);
                q.push(graph.hash(neighbor));
            }
        }
    }
}

function getDistanceMap(graph) {

    const distanceMap = [];

    // generate distance map
    for (let i=0; i < graph.n * graph.n; i++) {
        let row = []
        for (let j=0; j < graph.n * graph.n; j++) {
            row.push(-1);
        }
        distanceMap.push(row);
    }

    // run bfs multiple times
    for (let i=0; i < graph.n * graph.n; i++) {
        let q = [i];
        distanceMap[i][i] = 0;
        while (q.length) {
            let node = q.unshift();
            let neighbors = graph.getIndices();

            for (let neighbor of neighbors) {
                if (distanceMap[i][neighbor] === -1) {
                    distanceMap[i][neighbor] = distanceMap[i][node] + 1;
                    q.push(neighbor);
                }
            }
        }
    }

    return distanceMap;
}

function getPath(parent, node, graph) {
    // get path from parent
    const path = [];

    path.push(node);

    while (parent[graph.hash(node)] !== undefined ){
        node = parent[node];
        path.push(graph.hash(node));
    }

    return path;
}
