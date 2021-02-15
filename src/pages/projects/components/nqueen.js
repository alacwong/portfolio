import React, {useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import '../styling/queen.scss'
import ReactBootstrapSlider from "react-bootstrap-slider/dist/react-bootstrap-slider";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import {NQueenSolver} from '../scripts/queen-script'
import {Dropdown} from "react-bootstrap";

export default function NQueens() {

    const [n, setN] = useState(8);
    const [disableSlider, setDisableSlider] = useState('');
    const [delay, setDelay] = useState(250);
    const [algorithm, setAlgorithm] = useState('backtracking');

    // change N
    const onChange = (e) => {
        setState({board: clearBoard(e.target.value), recursiveCalls: 0});
        setN(e.target.value);
    }

    const onDelayChange = (e) => {
        setDelay(e.target.value);
    }

    // initialize empty board
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

    const [state, setState] = useState({
        board: clearBoard(n),
        recursiveCalls: 0
    });

    // Render Board
    const yellow = '#ffaf00';
    const brown = '#5f4203';
    let boardComponent = state.board.map(
        (row, rowIndex) => {
            return (
                <div key={`Row: ${rowIndex}`}>
                    {
                        row.map((cell, cellIndex) => {
                            let tileSize = `${400/n}px`
                            const img = <img src='/assets/queen.png' />
                            return <span
                                className='tile'
                                style={{
                                    backgroundColor: ((rowIndex + cellIndex) % 2 === 0) ? yellow: brown,
                                    height: tileSize,
                                    width: tileSize}}
                                key={`cell: ${rowIndex.toString() + cellIndex.toString()}`}>
                                &nbsp;
                                { cell === -1 ? img : ''}
                            </span>
                        })
                    }
                </div>
            )
        }
    )

    const runWrapper = {
        backtracking: () => {
            run('backtracking');
        },

        optimization: () => {
            run('optimization')
        }
    }

    const run = (algorithm) => {
        const variables = []
        for (let i=0; i< n; i++) {
            variables.push(i);
        }
        const solver = new NQueenSolver(n, algorithm);
        setDisableSlider('disabled');
        const animationStack = solver.solve(variables, clearBoard(n));
        let index = 0;
        const timer = setInterval( () => {
            if (index < animationStack.length) {
                setState({board: animationStack[index], recursiveCalls: index});
                index++;
            } else {
                clearInterval(timer);
                setDisableSlider('');
            }
        }, delay);
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
                        <li>Random Permutations (coming soon)</li>
                    </ul>
                </div>
                <div className='chess'>
                    <div className='board'>
                        { boardComponent}
                    </div>
                    <p>Recursive Calls: {state.recursiveCalls}</p>
                    <div className='controls'>
                        <p>Board Size: </p>
                        <span className='slider'>
                            <ReactBootstrapSlider
                                change={onChange}
                                orientation="horizontal"
                                value={n}
                                step={1}
                                max={16}
                                min={4}
                                disabled={disableSlider}
                            />
                        </span>
                        <p>Animation Speed: </p>
                        <span className='slider'>
                            <ReactBootstrapSlider
                                change={onDelayChange}
                                orientation="horizontal"
                                value={delay}
                                step={1}
                                max={500}
                                min={1}
                                disabled={disableSlider}
                            />
                        </span>
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                style={{
                                    backgroundColor: yellow,
                                    marginTop: '10px',
                                    '&:focus': {
                                        outline: 0
                                    },
                                    padding: '2% 12%',
                                }}

                            >
                                Run
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={runWrapper.backtracking}>Backtracking</Dropdown.Item>
                                <Dropdown.Item  onClick={runWrapper.optimization}>Optimized Backtracking</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}