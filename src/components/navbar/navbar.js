import React from "react";

export default function NavBar () {

    const navBar = [
        { link: '/', content: 'Home', key: '1'},
        { link: '/projects', content: 'Projects', key: '2'},
        { link: '/', content: 'About', key: '3'},
        { link: '/', content: 'Contact', key: '4'},
    ].map(
        data =>
            <span className="nav-element">
                <a href={data.link} key={data.key}>{data.content}</a>
            </span>
    )

    return (
        <nav className="nav">
            {navBar}
        </nav>
    )
}