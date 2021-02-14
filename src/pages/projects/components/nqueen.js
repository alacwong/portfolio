import React, {useState} from "react";
import FadeIn from "react-fade-in";
import '../styling/queen.scss'
import ReactBootstrapSlider from "react-bootstrap-slider/dist/react-bootstrap-slider";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import {NQueenSolver} from '../scripts/queen-script'

export default function NQueens() {

    const [n, setN] = useState(4);
    const [recursiveCalls, setRecursiveCalls] = useState(0);

    // initialize board
    const clearBoard = (N) => {
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

    let algorithm = 'backtrack';

    const run = () => {
        if (algorithm === 'backtrack') {
            const variables = []
            for (let i=0; i< n; i++) {
                variables.push(i);
            }
           const solver = new NQueenSolver(n, 'backtrack');
           solver.solve(variables, clearBoard(n));
        }
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
                    <button onClick={run}>Backtrack</button>
                </div>
            </div>
        </FadeIn>
    )
}