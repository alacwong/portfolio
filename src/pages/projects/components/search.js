import React, {Component} from 'react'
import FadeIn from "react-fade-in";
import {generateMaze, generateBoard, Mouse, Cheese, PathFinder, Visited, Path} from "../scripts/search";

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: generateMaze(20),
            board: generateBoard(20)
        }

        this.setState({board: new PathFinder().dfs(this.state.board, this.state.graph)});
    }

    componentDidMount() {
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
                            <li>A * star search visualization</li>
                        </ul>
                    </div>
                </div>
            </FadeIn>
        )
    }
}