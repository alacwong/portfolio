export class NQueenSolver{

    constructor(n, algorithm) {
        this.n = n;
        if (algorithm === 'optimization') {
            this.useOptimizationOne = true;
        } else {
            this.useOptimizationOne = false;
        }
    }
    optimizationOne(variables, chessBoard) {
        let minRow = 0;
        let minRowValue = this.n + 1;
        for (let i=0; i < variables.length; i++) {
            const rowValue = chessBoard[variables[i]].reduce((acc, curr) => {
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

    validSquare (i, j) {
        return 0 <= i && i < this.n && 0 <= j && j < this.n;
    }

    place(left, right, val, chessBoard) {
        // row
        for (let j=0; j < this.n; j++) {
            if (j !== right) {
                chessBoard[left][j] += val;
            }
        }

        // column
        for (let j=0; j < this.n; j++) {
            if (j !== left) {
                chessBoard[j][right] += val;
            }
        }

        // Diagonals
        const directions = [[1,1], [1, -1], [-1, 1], [-1, -1]];
        for (let j=0; j< directions.length; j++) {
            let [x, y] = [left + directions[j][0], right + directions[j][1]];
            while (this.validSquare(x, y)) {
                chessBoard[x][y] += val;
                [x, y] = [x + directions[j][0], y + directions[j][1]];
            }
        }
    }


    backtrack(variables, chessBoard) {
        if (variables.length === 0){
            return true;
        }

        let queen;
        if (this.useOptimizationOne) {
            queen = this.optimizationOne(variables, chessBoard);
            variables.splice(variables.indexOf(queen), 1);
        } else {
            queen = variables.shift();
        }

        let solved = false;
        for (let i=0; i < this.n; i++) {
            if (chessBoard[queen][i] === 0) {
                chessBoard[queen][i] = -1;
                this.place(queen, i,1, chessBoard);
                solved = this.backtrack([...variables], chessBoard);
                if (!solved) {
                    // reverse effects
                    this.place(queen, i,-1, chessBoard);
                    chessBoard[queen][i] = 0;
                } else {
                    return solved
                }
            }
        }
        return solved;
    }

    solve(variables, board) {
        this.backtrack(variables, board);
        console.log(board);
    }

    copy(array) {
        const temp = []
        for (let i=0; i < this.n; i++) {
            temp.push([...array[i]]);
        }
        return temp;
    }
}