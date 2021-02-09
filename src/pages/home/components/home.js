import React, { Component } from "react";
import "../css/home.scss"
import FadeIn from 'react-fade-in';
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
import {FaLinkedin} from "@react-icons/all-files/fa/FaLinkedin";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import { Link } from 'react-router-dom';

export default class Home extends Component {

    render() {
        return (
            <FadeIn className="intro">
                <h1>Alac Wong</h1>
                <h2>Software Engineer | 3rd Year CS & Statistics @ UofT</h2>
                <span className="social">
                    <a href="https://github.com/alacwong"><FaGithub className="icon" /></a>
                    <FaLinkedin className="icon"/>
                    <FiMail className="icon" />
                </span>
            </FadeIn>
        )
    }
}

