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

function distanceMap(graph) {



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
