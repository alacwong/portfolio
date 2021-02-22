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
                <img src='assets/ball.JPG'/>
            </div>

            <div className='exp'>
                <h1> Work experience</h1>

                <h2>PickEasy Software Developer (Part-time)</h2>

                <ul>
                    <li>Developed OCR technology to convert menu images to our digital menu format using
                    google cloud vision and Open Cv</li>
                    <li>Engineered restaurant recommendation model to recommend restaurants based on
                    user's swipe history and restaurant content trained on indexed restaurants from Yelp Api</li>
                    <li> Mentored current co-op students by troubleshooting issues and providing feedback</li>
                </ul>

                <h2>PickEasy Software Developer(Co-op)</h2>

                <ul>
                    <li>Digitized menus into a Angular Web application with QR-code with Flask Api</li>
                    <li>Developed Secure Covid 19 contact tracing api in Flask with SHA-256 encryption</li>
                    <li>Developed Menu Editor platform for restaurant clients to upload images/change menu content</li>
                    <li>Developed sign-up platform with email verification or social media verification</li>
                </ul>

            </div>
        </FadeIn>
    )
}