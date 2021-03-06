// class
import {generateBoard as generateBoardOld, copyBoard, unVisit} from "./search";

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
        while (q.length > 0) {
            let node = q.shift();
            let neighbors = graph.getIndices(node);
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

    const numCats = Math.ceil(1 + Math.random()* 2);

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

function renderBoard(board, graph, distanceMap, algorithm, iq) {

    const newBoard = copyBoard(board);
    let status = '';

    const cats = getTile(newBoard, Cat);
    const mouse = getTile(newBoard, Mouse)[0];


    // move mouse
    if (algorithm === 'a-star') {
        const path = AStarSearch(newBoard, graph, heuristic, distanceMap);
        if (path.length > 1) {
            let [i, j] = mouse;
            newBoard[i][j] /=Mouse;

            [i, j] = path[1];
            newBoard[i][j] *= Mouse;

            // check if death
            if (newBoard[i][j] % Cat === 0) {
                status = 'Lose';
                return [newBoard, status];
            }

            // check win condition
            if (newBoard[i][j] % Cheese === 0) {
                newBoard[i][j] /= Cheese;
                if (countCheese(newBoard) === 0) {
                    status = 'Win';
                }
            }
        }
    }


    // move cats
    for (let i=0; i < cats.length; i++) {
       let path = BFS(copyBoard(board),graph, cats[i]);
       if (path.length > 1) {
           let [x, y]= cats[i]

           if (Math.random() <= (iq - 90)/ (137 - 90)) { //cat makes correct move
               newBoard[x][y] /= Cat;

               [x, y] = path[1];
               newBoard[x][y] *= Cat;
           } else { // cat moves randomly or not at all
               const moves = graph.get([x, y]);
                const moveNumber = Math.floor(Math.random() * 4);
                if (moveNumber >= moves.length ) {
                    break;
                }

                const [i, j] = moves[moveNumber];
                if (i === path[1][0] && moves[0][1] === j) {
                    break;
                } else {
                    newBoard[x][y] /= Cat;
                    newBoard[i][j] *= Cat;
                }
           }

           // check for mouse
           if (newBoard[x][y] % Mouse === 0) {
               newBoard[x][y] /= Mouse;
               status = 'Lose'
           }
       }
    }


    return [newBoard, status];

}

function AStarSearch(board, graph, h, distanceMap) {

    let mouse =  getTile(board, Mouse)[0];
    let parent = {};
    let q = [[graph.hash(mouse), 0]];
    let distance = {};
    let path = [];
    let safety = {}
    distance[graph.hash(mouse)] = 0;
    safety[graph.hash(mouse)] = 0


    // function to mark back path
    const markPath = (node) => {
        let [n, m] = node;
        board[n][m] *= Path;
        if (parent[graph.hash(node)] !== undefined) {
            markPath(graph.unHash(parent[graph.hash(node)]));
        }
    }


    // function to calculate path safety
    const computeSafety = (neighborList) => {
        if (neighborList.length === 1) {
            return 40;
        } else if( neighborList.length === 2 ) {
            return 5;
        } else if (neighborList.length === 3) {
            return 1;
        } else {
            return 0;
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
            path = getPath(parent, graph.hash([i, j]), graph);
            markPath([i, j]);
            break;
        }

        const neighbors = graph.get([i, j])
        for (const neighbor of neighbors) {
            let [x, y] = neighbor;
            if (board[x][y] % Visited !== 0 && !q.map(node => node[0]).includes(graph.hash([x, y]))) {
                parent[graph.hash(neighbor)] = graph.hash([i, j]);
                distance[graph.hash(neighbor)] = distance[graph.hash([i, j])] + 1
                safety[graph.hash(neighbor)] = safety[graph.hash([i, j])] + computeSafety(graph.get(neighbor));
                q.push(
                    [graph.hash(neighbor), h(neighbor, board, graph, distanceMap, safety, [i, j]) +
                    distance[graph.hash(neighbor)]]
                );
            }
        }
    }

    return path;
}

function heuristic(node, board, graph, distanceMap, safetyMap, currentNode) {


    // exponential distance of cat
    const cats = getTile(board, Cat);
    const cheeses = getTile(board, Cheese);
    const nodeIndex = graph.hash(node);
    const currentNodeIndex = graph.hash(node);
    let cost = 0;
    let danger = 0;
    let cheeseWeight = 2.5;

    // cost of cat
    // exponential as you get closer to the cat
    for (const cat of cats) {
        let catIndex = graph.hash(cat);
        cost += 80 * Math.pow(0.75, distanceMap[catIndex][nodeIndex]);
        danger += 80 *  Math.pow(0.75, distanceMap[catIndex][currentNodeIndex]);
    }

    //evoke survival mode
    if (danger > 19) {
        cheeseWeight = 1;
        cost += 0.5 * safetyMap[nodeIndex];
    }

    // add cost of getting to cheese (linear)
    cost  += cheeses.reduce( (acc, cheese) => {
            const cheeseIndex = graph.hash(cheese);
            return Math.min( cheeseWeight * distanceMap[nodeIndex][cheeseIndex], acc)
        }, cheeseWeight * graph.n
    )

    return cost;
}

function countCheese(board) {
    let count = 0;
    for (let i=0; i < board.length; i++) {
        for (let j=0; j < board.length; j++) {
            if (board[i][j] % Cheese === 0) {
                count ++;
            }
        }
    }
    return count;
}

function cleanBoard(board) {
    board = copyBoard(board);
    unVisit(board);
    for (let i=0; i < board.length; i++) {
        for (let j=0; j < board.length; j++) {
            if (board[i][j] % Path === 0) {
                board[i][j] /= Path;
            }
        }
    }
    return board;
}

export {Mouse, Cheese, Visited, Path, Cat, generateBoard, renderBoard, getDistanceMap, cleanBoard}
