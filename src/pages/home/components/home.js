import React, { Component } from "react";
import Particles from "react-particles-js";
import '../css/home.css'

export default class Home extends Component {

    render() {
        return (
            <div className="background">
                <h1>Welcome to my Home Page</h1>
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} />
            </div>
        )
    }
}

