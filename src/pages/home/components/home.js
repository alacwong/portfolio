import React, { Component } from "react";
import "../css/home.scss"
import FadeIn from 'react-fade-in';
import {FaGithub} from "@react-icons/all-files/fa/FaGithub";
import {FaLinkedin} from "@react-icons/all-files/fa/FaLinkedin";
import {FiMail} from "@react-icons/all-files/fi/FiMail";
import Quote from "./quote";


export default function Home () {

    return (
        <FadeIn className="intro">
            <img src="assets/alacwong.jpg"/>
            <h1>Alac Wong</h1>
            <h2>Software Engineer | 3rd Year CS & Statistics @ UofT</h2>
            <span className="social">
                <a href="https://github.com/alacwong"><FaGithub className="icon" /></a>
                <a href="https://www.linkedin.com/in/alacwong/"><FaLinkedin className="icon"/></a>
                <a href="mailto:alac.wong@mail.utoronto.ca"><FiMail className="icon"/></a>
            </span>
            <Quote/>
        </FadeIn>
    )
}

