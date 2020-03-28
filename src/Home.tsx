import React from 'react';
import { spotifyData } from './spotify';
import MyTimeline from "./timeline";
import './Home.scss';
import './spotify.scss';

const okta =<a style={{fontSize:"18px", color:"#007DC1", fontWeight:"bold", textDecoration:"underline"}} target="_blank" rel="noopener noreferrer" href="https://okta.com">Okta</a>;
const spotify =<a style={{color:"#1DB954", textDecoration:"underline"}} className="spotifyText" target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/1247031860">Spotify</a>;

const Home = function Home(props: { start: Function }) {
    return <div id="home">
        <div id="topCurve"></div>
            <header>
                <div id="info">
                    <h1>Hey, I'm Sam.</h1>
                    <p>I graduated from Cornell University in December 2019 with a double major in computer science and economics.
                        Currently, I'm a remote software engineer at {okta}. I like to ski, snowboard, listen to hip hop, and referee soccer.
                    </p>
                    <ul>
                        <li><a target="_blank" rel="noopener noreferrer" href="/Sam-Hu-Resume.pdf">Resume</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sam-hu">LinkedIn</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/samhuuu">Facebook</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_samhu_/">Instagram</a></li>
                    </ul>
                </div>
                <div id="aside">
                    <img src="/Sam-Hu.png" id="profilePic" alt="Sam Hu" />
                </div>
            </header>
        <div id="spotify">
            <div className="spotifyHeader">
                <h2>Here's what I listen to on {spotify}</h2>
            </div>
            <div className="artistContainer">
                <ul className="artistClass">
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
            <iframe src="https://open.spotify.com/embed/playlist/7dSBjc6YMggxd0IlgvCV9j" className="playlist" width="380" height="650" allow="encrypted-media"></iframe>
        </div>
        <div id="timeline">
            <h2>My timeline</h2>
            <MyTimeline></MyTimeline>
        </div>
        <footer>Sam Hu © 2020</footer>
    </div>;
}

export default Home;
