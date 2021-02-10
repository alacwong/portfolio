import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import '../css/home.scss'

export default class Quote extends Component{

    constructor(props){
        super(props);
        this.state = {
            quotes: [
                '"Some inspirational quote"',
                '"Another inspirational quote"',
                '"Yet another inspirational quote"',
                '"And one"'
            ],
            index: 0
        };
    }

    componentDidMount() {
        setInterval(() => this.setState(
            {index: (this.state.index +  1) % this.state.quotes.length}), 5000);
    }


    // do this shit tmr
    // https://github.com/reactjs/react-transition-group/blob/master/Migration.md
    render() {

        return (
            <CSSTransition
                classNames="animation"
                timeout={{ enter: 500, exit: 300 }}
            >
                {this.state.quotes[this.state.index]}
            </CSSTransition>
        )
    }
}
