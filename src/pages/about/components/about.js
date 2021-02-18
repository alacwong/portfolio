import React from "react";
import '../styling/about.scss'
import FadeIn from "react-fade-in";

export default function About () {

    return (
        <FadeIn>
            <div className='flex-container'>
                <div className='container'>
                    <h1>About Me</h1>
                    <p> Hi I'm Alac! Currently a software engineering student studying at the
                        University of Toronto Scarborough. I'm an aspiring software developer
                        with an interest in applied Artificial Intelligence, I plan on show casing
                        more AI projects on this website in the future! During my free time I enjoy
                        playing basketball and swimming.
                    </p>
                </div>
                <img src='assets/ball.jpg'/>
            </div>
        </FadeIn>
    )
}