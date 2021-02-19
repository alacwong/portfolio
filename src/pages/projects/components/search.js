import React, {Component} from 'react'
import FadeIn from "react-fade-in";
import {generateMaze} from "../scripts/search";

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: generateMaze(16)
        }
    }

    componentDidMount() {

    }


    render() {

        const n = 16
        const board = []
        for (let i=0; i < n; i++) {
            let row = [];
            for (let j=0; j <n; j++) {
                const style = this.state.graph.getWalls([i, j]);
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
                <div className='project'>
                    <div className='search-description'>
                        <h1>Search</h1>
                    </div>
                    <div className='search-board'>
                        { board}
                    </div>
                </div>
            </FadeIn>
        )
    }
}