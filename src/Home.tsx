import React from 'react';
import './Home.scss';

import { spotifyData } from './spotify';
// import { recommends } from './recommends';

const spotifyStyle = {
    fontSize: 48 + 'px',
    color: '#1DB954',
    textDecoration: 'underline',
}

const oktaStyle = {
    fontSize: 18 + 'px',
    color: '#007DC1',
    textDecoration: 'underline',
};

var spotify =<a style={spotifyStyle} target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/1247031860">Spotify</a>;
var okta =<a style={oktaStyle} target="_blank" rel="noopener noreferrer" href="https://okta.com">Okta</a>;


const Home = function Home(props: { start: Function }) {
    return <div id="home">
        <header>
            <section id="info">
                <h1>Hey, I'm Sam</h1>
                <p>I graduated from Cornell University in December 2019 with a double major in computer science and economics.
                    Currently, I'm employed as a remote software engineer at {okta}. I listen to hip hop, ski, snowboard, and referee soccer.
                </p>
                <ul>
                    <li><a target="_blank" rel="noopener noreferrer" href="/Sam-Hu-Resume.pdf">Resume</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sam-hu">LinkedIn</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_samhu_/">Instagram</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/samhuuu">Facebook</a></li>
                </ul>
            </section>
            <aside>
                <img src="/Sam-Hu.png" id="profilePic" alt="Sam Hu" />
            </aside>
        </header>
        <div id="spotify">
            <div className="spotifyHeader">
                <h2>Find Me On {spotify}</h2>
                {/* <p>Or just check out what I’ve been listening to lately</p> */}
            </div>
            <ul>
                {spotifyData.items.map((artist, i) => {
                    if (document.body.clientWidth > 550 || i < 12) {
                        return (<li className="artist" key={artist.id}>
                            <a target="_blank" rel="noopener noreferrer" href={artist.uri}>
                                <img src={artist.images[1].url} alt="" />
                            {artist.name}</a>
                        </li>)
                    }
                })}
            </ul>
        </div>
        {/* <div id="recommends">
            <h2>Ryan <br />Recommends</h2>
            <ul>
                {recommends.map(r =>
                    <li key={r.href}>
                        <span className="title">
                            <a target="_blank" rel="noopener noreferrer" href={r.href}> {r.title} </a>
                        </span>
                        <span className="source">{r.source}</span>
                    </li>
                )}
            </ul>
        </div>
        <footer>Ryan Slama © 2019</footer>
        <div className={"startButton"} onClick={() => props.start()}> <span className="spinner">❖</span> Start </div> */}
        <footer>Sam Hu © 2020</footer>
    </div>;
}

export default Home;
