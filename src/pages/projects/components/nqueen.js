import React, {useState} from "react";
import FadeIn from "react-fade-in";
import '../styling/queen.scss'
import ReactBootstrapSlider from "react-bootstrap-slider/dist/react-bootstrap-slider";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"

export default function NQueens() {

    const [n, setN] = useState(4);
    let useOptimizationOne = useState(true);

    // initialize board
    const clearBoard = ( N) => {
        const array = []
        for (let i=0; i <N; i++) {
            const row = [];
            for (let j=0; j <N; j++) {
                row.push(0);
            }
            array.push(row);
        }
        return array
    }

    const [board, setBoard] = useState(    clearBoard(n));

    // initialize variables
    const queens = []
    for (let i=0; i<n; i++) {
        queens.push(i);
    }


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

    // Initialize board rendering

    // Board component
    const yellow = '#ffaf00';
    const brown = '#5f4203';
    let boardComponent = board.map(
        (row, rowIndex) => {
            return <div>
                {
                    row.map((cell, cellIndex) => {
                        let tileSize = `${400/n}px`
                        const img = <img src='/assets/queen.png' />
                        if ( (rowIndex + cellIndex) %2 === 0) {
                            return <span
                                className='tile'
                                style={{backgroundColor: yellow, height: tileSize, width: tileSize}}
                                key={`cell: ${rowIndex.toString() + cellIndex.toString()}`}>
                                &nbsp;
                                { cell === -1 ? img : ''}
                            </span>
                        } else {
                            return <span
                                className='tile'
                                style={{backgroundColor: brown, height: tileSize, width: tileSize}}
                                key={`cell: ${rowIndex + cellIndex + ''}`}>
                                &nbsp;
                                { cell === -1 ? img : ''}
                            </span>
                        }
                    })
                }
            </div>
        }
    )

    // change N
    const onChange = (e) => {
        setBoard(clearBoard(e.target.value));
        setN(e.target.value);
    }


    return (
        <FadeIn>
            <div className='project'>
                <div className='description'>
                    <h1> N-Queens Visualizer </h1>
                    <ul>
                        <li>The N Queen is the problem of placing N chess queens on an
                            N×N chessboard so that no two queens attack each other </li>
                        <li>CSP optimizations to reduce backtracking search tree</li>
                        <li>Built with React JS</li>
                    </ul>
                    <h3>Include visualizations for: </h3>
                    <ul>
                        <li>Recursive Backtracking</li>
                        <li>Optimized Recursive Backtracking</li>
                        <li>Random Permutations</li>
                    </ul>
                </div>
                <div className='chess'>
                    <div className='board'>
                        { boardComponent}
                    </div>
                    <p>Recursive Calls: {recursiveCalls}</p>
                    <div className='controls'>
                        <p>N: </p>
                        <ReactBootstrapSlider
                            className='slider'
                            change={onChange}
                            orientation="horizontal"
                            value={n}
                            step={1}
                            max={16}
                            min={4}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}