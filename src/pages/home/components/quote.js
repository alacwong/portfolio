import React, {Component, useEffect, useState} from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import '../css/home.scss'
import {Transition} from "react-transition-group";


export default class Quote extends Component{

    constructor(props) {
        super(props);

        this.state = {
            quotes: [
                '"Some inspirational quote"',
                '"Another inspirational quote"',
                '"Yet another inspirational quote"',
                '"And one"'
            ],
            index: 0,
            animate: false
        }
    }

    componentDidMount() {
        setInterval(() => {
            const newIndex = (this.state.index + 1) % this.state.quotes.length;
            this.setState({index: newIndex, animate: true});
        }, 6000);
    }

    render(){
        // Shuffle array
        const quotes = [ this.state.quotes]
        for (let i = quotes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = quotes[i];
            quotes[i] = quotes[j];
            quotes[j] = temp;
        }

        const exitAnimation = () => {
            this.setState({ animate: false});
        }

        return (
            <div>
                <Transition>
                    <CSSTransition
                        classNames="fade"
                        in={this.state.animate}
                        timeout={{ enter: 1000, exit: 500 }}
                        onEntered={exitAnimation}
                    >
                        <h1 className='quote'>{this.state.quotes[this.state.index]}</h1>
                    </CSSTransition>
                </Transition>
            </div>
        )
    }
}
