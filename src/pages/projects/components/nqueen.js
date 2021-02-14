import React from "react";

export default function NQueens() {

    const n = 20;
    let board = [];

    // initialize board
    for (let i=0; i <n; i++) {
        const row = [];
        for (let j=0; j <n; j++) {
            row.push(0);
        }
        board.push(row);
    }

    // initialize variables
    const queens = []
    for (let i=0; i<n; i++) {
        queens.push(i);
    }

    let useOptimizationOne = true;
    // target rows with least amount of variables left
    const optimizationOne = (variables) => {
        let minRow = 0;
        let minRowValue = n + 1;
        for (let i=0; i < variables.length; i++) {
            const rowValue = board[variables[i]].reduce((acc, curr) => {
                if (curr === 0) {
                    acc ++;
                }
                return acc;
            }, 0);
            if (rowValue < minRowValue) {
                minRowValue = rowValue;
                minRow = variables[i];
            }
        }
        return minRow;
    }


    const debug = (x) => {
        console.log(x);
        const s = []
        for (let i=0; i < n; i++) {
            s.push([...board[i]]);
        }
        console.log(s);
    }

    const validSquare = (i, j) => {
        return 0 <= i && i < n && 0 <= j && j < n;
    }

    const place = (left, right, val) => {
        // row
        for (let j=0; j <n; j++) {
            if (j !== right) {
                board[left][j] += val;
            }
        }

        // column
        for (let j=0; j <n; j++) {
            if (j !== left) {
                board[j][right] += val;
            }
        }

        // Diagonals
        const directions = [[1,1], [1, -1], [-1, 1], [-1, -1]];
        for (let j=0; j< directions.length; j++) {
            let [x, y] = [left + directions[j][0], right + directions[j][1]];
            while (validSquare(x, y)) {
                board[x][y] += val;
                [x, y] = [x + directions[j][0], y + directions[j][1]];
            }
        }

    }

    let recursiveCalls = 0;
    const backtrack = (variables) => {
        recursiveCalls ++;
        if (variables.length === 0){
            return true;
        }

        let queen;
        if (useOptimizationOne) {
            queen = optimizationOne(variables);
            variables.splice(variables.indexOf(queen), 1);
        } else {
            queen = variables.shift();
        }

        let solved = false;
        for (let i=0; i < n; i++) {
            if (board[queen][i] === 0) {
                board[queen][i] = -1;
                place(queen, i,1);
                solved = backtrack([...variables]);
                if (!solved) {
                    // reverse effects
                    place(queen, i,-1);
                    board[queen][i] = 0;
                } else {
                    return solved
                }
            }
        }
        return solved;
    }

    console.log(backtrack(queens));
    for (let i=0; i<n; i++) {
        for (let j=0; j< n; j++) {
            if (board[i][j] === -1) {
                board[i][j] = 1;
            } else {
                board[i][j] = 0;
            }
        }
    }
    console.log(board);
    console.log(recursiveCalls);

    return (
        <h1>N-Queens</h1>
    )
}