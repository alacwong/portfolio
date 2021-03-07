// class
import {generateBoard as generateBoardOld, copyBoard} from "./search";

const Mouse = 2;
const Cheese = 3;
const Visited  = 5;
const Path = 7;
const Cat = 11;

function BFS(board, graph, cat) {

    let parent = {};
    let q = [graph.hash(cat)]
    let mouse;
    let path = [];

        // function to mark back path

    while (q.length > 0) {
        let [i, j] = graph.unHash(q.shift())
        board[i][j] *= Visited;

        if (board[i][j] % Mouse === 0) {
            mouse =[i, j];
            path = getPath(parent, graph.hash([i, j]), graph);
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

    return path;
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

    path.push(graph.unHash(node));

    while (parent[node] !== undefined ){
        node = parent[node];
        path.push(graph.unHash(node));
    }

    return path.reverse();
}

function generateBoard(n) {

    // generate board with cats
    const board = generateBoardOld(n);

    const numCats = Math.ceil(1 + Math.random()* 3);

    for (let i=0; i < numCats; i++) {
       let [x, y] = [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]
        if (board[x][y]% Mouse !== 0) {
            board[x][y] *= Cat;
        }
    }
    return board;
}

function getTile(board, type) {
    const tiles = [];
    for (let i=0; i < board.length; i++) {
        for (let j=0; j < board.length; j++) {
            if (board[i][j] % type === 0) {
                tiles.push([i, j])
            }
        }
    }
    return tiles;
}

function renderBoard(board, graph) {

    board = copyBoard(board);

    const cats = getTile(board, Cat);
    const mouse = getTile(board, Mouse)[0];
    for (let i=0; i < cats.length; i++) {
       let path = BFS(copyBoard(board),graph, cats[i]);
       if (path.length > 1) {
           let [x, y]= cats[i]
           board[x][y] /= Cat;

           [x, y] = path[1];
           board[x][y] *= Cat;

           // check for mouse
           if (board[x][y] % Mouse === 0) {
               board[x][y] /= Mouse;
           }
       }
    }

    let state = '';

    // eaten
    if (board[mouse[0]][mouse[1]] % Mouse !== 0 ){
        state = 'Lose'
    } else {
        state = 'Continue'
    }

    return [board, state];

}

function AStarSearch(board, graph, h) {

    let mouse =  getTile(board, Mouse)[0];
    let parent = {};
    let q = [[graph.hash(mouse), 0]];
    let distance = {};
    distance[graph.hash(mouse)] = 0;


    // function to mark back path
    const markPath = (node) => {
        let [n, m] = node;
        board[n][m] *= Path;
        if (parent[graph.hash(node)] !== undefined) {
            markPath(graph.unHash(parent[graph.hash(node)]));
        }
    }

    while (q.length > 0) {

        const [node, ,index] = q.reduce(
            (acc, curr, index) => {
                let [ ,weight, ] = acc;
                let [coord2, weight2] = curr;
                if (weight2 < weight) {
                    return [coord2, weight, index];
                    } else {
                        return acc;
                    }
                }, [...q[0], 0]
            );


        let [i, j] = graph.unHash(node);
        q.splice(index, 1);
        board[i][j] *= Visited;

        if (board[i][j] % Cheese === 0) {
            markPath([i, j]);
            break;
        }

        const neighbors = graph.get([i, j])
        for (const neighbor of neighbors) {
            let [x, y] = neighbor;
            if (board[x][y] % Visited !== 0 && !q.map(node => node[0]).includes(graph.hash([x, y]))) {
                parent[graph.hash(neighbor)] = graph.hash([i, j]);
                distance[graph.hash(neighbor)] = distance[graph.hash([i, j])] + 1
                q.push([graph.hash(neighbor), h(neighbor, board) + distance[graph.hash(neighbor)]]);
            }
        }
    }
}

function heuristic(board, mouse, graph, distanceMap) {
    // exponential distance of cat
    const cats = getTile(board, Cat);
    const mouseIndex = graph.hash(mouse);
    let cost = 0;

    for (const cat of cats) {
        let catIndex = graph.hash(cat);
        cost += 60 * Math.pow(0.6, distanceMap[catIndex][mouseIndex]);
    }
    return cost;
}

export {Mouse, Cheese, Visited, Path, Cat, generateBoard, renderBoard}
