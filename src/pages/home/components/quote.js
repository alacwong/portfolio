import React, {Component, useEffect, useState} from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import '../css/home.scss'

export default function Quote() {


    const quotes = [
        '"Some inspirational quote"',
        '"Another inspirational quote"',
        '"Yet another inspirational quote"',
        '"And one"'
    ]
    const [index, setIndex] = useState(0);

    // Shuffle array
    for (let i = quotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = quotes[i];
        quotes[i] = quotes[j];
        quotes[j] = temp;
    }

    // Change quote
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((index + 1)% quotes.length);
            clearInterval(timer);
        }, 1000);
    })

    return (
        <TransitionGroup>
            <CSSTransition
                classNames="fade"
                timeout={{ enter: 500, exit: 300 }}
            >
                <h1 className='fade'>{quotes[index]}</h1>
            </CSSTransition>
        </TransitionGroup>
    )
}
