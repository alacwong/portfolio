import React, {Component, useState} from "react";
import FadeIn from "react-fade-in";
import {Cheese, generateBoard, generateMaze, Mouse, Path, Visited} from "../scripts/search";


export default class Ai extends Component{

    constructor(props) {
        super(props);
        this.state = {
            graph: generateMaze(20),
            board: generateBoard(20),
        }

    }


    render () {

        const board = []
        const n = 20;
        for (let i=0; i < n; i++) {
            let row = [];
            for (let j=0; j <n; j++) {
                const style = this.state.graph.getWalls([i, j]);

                if (this.state.board[i][j] % Visited === 0 ){
                    style.backgroundColor = '#c48d14';
                }

                row.push(
                    <span key={`tile: ${i}, ${j}`} className='board-tile' style={style}> &nbsp; </span>
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
                    <h1>Cat vs Mouse Ai</h1>
                    <div className='search-board'>
                        {board}
                    </div>
                    <div className='search-description'>
                        {/*<p>Watching a cat eat cheese uncontested isn't that interesting, let's add a few cats to this!</p>*/}
                        <ul>
                            <li> Random maze generation using Prim's algorithm and random loops</li>
                            <li>Depth first search visualization</li>
                            <li>Breadth first search visualization</li>
                            <li>A * star search visualization (Manhattan Distance to closest cheese)</li>
                        </ul>
                    </div>
                </div>
            </FadeIn>
        )
    }
}