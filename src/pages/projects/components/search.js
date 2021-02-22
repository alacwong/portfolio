import React, {Component} from 'react'
import FadeIn from "react-fade-in";
import {generateMaze, generateBoard, Mouse, Cheese, PathFinder, Visited, Path, copyBoard} from "../scripts/search";
import {Dropdown} from "react-bootstrap";

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: generateMaze(20),
            board: generateBoard(20),
        }

        this.animateBoard = this.animateBoard.bind(this);
        this.run = this.run.bind(this);
    }

    componentDidMount() {
        this.setState({mementoBoard: copyBoard(this.state.board, 20)});
    }

    animateBoard(frames) {
        let index = 0;
        let animator = setInterval(() => {
            if (index < frames.length) {
                this.setState({board: frames[index]});
                index++;
            } else {
                clearInterval(animator);
            }
        } ,80);
    }

    run(algorithm) {
        const finder = new PathFinder();
        const frames = finder.run(copyBoard(this.state.mementoBoard, 20), this.state.graph, algorithm);
        this.animateBoard(frames);
    }

    render() {

        const n = 20;
        const board = []
        for (let i=0; i < n; i++) {
            let row = [];
            for (let j=0; j <n; j++) {
                const style = this.state.graph.getWalls([i, j]);

                let img;
                if (this.state.board[i][j] % Mouse === 0) {
                    img = <img src={'assets/mouse.png'}/>
                } else if (this.state.board[i][j] % Cheese === 0) {
                    img = <img src={'assets/cheese.jpg'}/>
                }else if (this.state.board[i][j] % Path === 0){
                    img = <img src={'assets/path.jpg'}/>
                } else {
                    img = ''
                }

                if (this.state.board[i][j] % Visited === 0 ){
                    style.backgroundColor = '#c48d14';
                }

                row.push(
                    <span key={`tile: ${i}, ${j}`} className='board-tile' style={style}> &nbsp; {img} </span>
                );
            }
            board.push(
                <div key={`row: ${i}`} className='board-row'>
                    {row}
                </div>
            )
        }

        const algorithmWrapper = {
            bfs: () => {
                this.run('bfs')
            },

            dfs: () => {
                this.run('dfs')
            },

            astar: () => {
                this.run('astar')
            }
        }

        return (
            <FadeIn>
                <div className='search-project'>
                    <h1>Search Visualizations</h1>
                    <div className='search-board'>
                        { board}
                    </div>
                    <div className='search-description'>
                        <ul>
                            <li> Random maze generation using Prim's algorithm and random loops</li>
                            <li>Depth first search visualization</li>
                            <li>Breadth first search visualization</li>
                            <li>A * star search visualization (Manhattan Distance to closest cheese)</li>
                        </ul>
                        <Dropdown className={'run'}>
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                style={{
                                    backgroundColor: '#ffaf00',
                                    marginTop: '10px',
                                    '&:focus': {
                                        outline: 0
                                    },
                                    padding: '4% 24%',
                                }}

                            >
                                Run
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={algorithmWrapper.dfs}>Depth First Search</Dropdown.Item>
                                <Dropdown.Item onClick={algorithmWrapper.bfs}>Breadth First Search</Dropdown.Item>
                                <Dropdown.Item onClick={algorithmWrapper.astar}>A Star Search</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </FadeIn>
        )
    }
}