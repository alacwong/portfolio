import React, {Component} from 'react'
import FadeIn from "react-fade-in";
import {generateMaze} from "../scripts/search";

export default class Search extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let g = generateMaze(32);
        console.log(g.get([0, 0]));
    }


    render() {

        return (
            <FadeIn>
                <div>
                    Search
                </div>
            </FadeIn>
        )
    }
}