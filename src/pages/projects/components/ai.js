import React, {Component, useState} from "react";
import FadeIn from "react-fade-in";
import {generateMaze, copyBoard} from "../scripts/search";
import {Cat, Mouse, Path, Visited, Cheese, generateBoard, renderBoard, getDistanceMap, cleanBoard} from "../scripts/ai";
import ReactBootstrapSlider from "react-bootstrap-slider";


export default class Ai extends Component{

    constructor(props) {
        super(props);

        const [graph, board, catIQ] = [generateMaze(20), generateBoard(20), 125];
        const [distanceMap, memoBoard ]= [getDistanceMap(graph), copyBoard(board)] ;
        this.state = { graph, board, distanceMap, memoBoard, catIQ};
        this.animateBoard = this.animateBoard.bind(this);
        this.updateIQ = this.updateIQ.bind(this);
    }

    updateIQ(e) {
        this.setState({catIQ: Number(e.target.value)});
    }

    animateBoard() {

        let animator = setInterval(() => {

            const [board, state] = renderBoard(
                cleanBoard(this.state.board),
                this.state.graph,
                this.state.distanceMap,
                'a-star',
                this.state.catIQ
            );
            this.setState({board: board},
                () => {
                    if (state === 'Lose') {
                        clearInterval(animator);
                        window.alert('Toast!');
                        this.setState({board: this.state.memoBoard});
                    } else if (state === 'Win') {
                        clearInterval(animator);
                        window.alert('Mouse wins!');
                        this.setState({board: this.state.memoBoard});
                    }
                });
        } ,150);

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

                let img;

                if (this.state.board[i][j] % Cat === 0) {
                    img = <img src={'assets/cat.png'}/>
                } else if (this.state.board[i][j] % Mouse === 0) {
                    img = <img src={'assets/mouse.png'}/>
                } else if (this.state.board[i][j] % Cheese === 0) {
                    img = <img src={'assets/cheese.jpg'}/>
                }else if (this.state.board[i][j] % Path === 0){
                    img = <img src={'assets/path.jpg'}/>
                } else {
                    img = ''
                }

                row.push(
                    <span key={`tile: ${i}, ${j}`} className='board-tile' style={style}> &nbsp;{img} </span>
                );
            }
            board.push(
                <div key={`row: ${i}`} className='board-row'>
                    {row}
                </div>
            );
        }

        return (
            <FadeIn>
                <div className='search-project'>
                    <h1>Cat vs Mouse Ai</h1>
                    <div className='search-board'>
                        {board}
                    </div>
                    <div className='ai-description'>
                        <p>Watching a Mouse eat cheeses uncontested isn't that interesting,
                            let's add a few cats to this!</p>
                        <p>Visualizations for different Path-finding Ai's that try to collect all the cheese
                        without getting caught by cats! (More coming soon)</p>
                        <button onClick={this.animateBoard}> Run</button>
                        <span className='slider'>
                           <label>Cat IQ</label>
                            <ReactBootstrapSlider
                                change={this.updateIQ}
                                orientation="horizontal"
                                value={this.state.catIQ}
                                step={1}
                                max={137}
                                min={90}
                            />
                        </span>
                    </div>
                </div>
            </FadeIn>
        )
    }
}