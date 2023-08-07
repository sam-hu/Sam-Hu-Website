import { spotifyData } from './spotify';
import MyTimeline from './timeline';
import './Home.scss';
import './spotify.scss';
// import { WordsContainer } from './Connections';

const found = <a style={{ color: "#1662DD", fontSize: "18px", fontWeight: "bold" }} className="link" target="_blank" rel="noopener noreferrer" href="https://found.com">Found</a>;
const okta = <a style={{ color: "#1662DD", fontSize: "18px", fontWeight: "bold" }} className="link" target="_blank" rel="noopener noreferrer" href="https://okta.com">Okta</a>;
const spotify = <a style={{ color: "#1DB954" }} className="spotifyText link" target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/1247031860">Spotify</a>;

const Home = function Home() {
    return <div id="home">
        <div id="topCurve"></div>
        <header>
            <div id="info">
                <h1>Hey, I'm Sam.</h1>
                <p>
                    I'm currently at {found} improving banking for the self-employed.
                    Previously, I was a software engineer at {okta}.
                    Before that, I studied computer science and economics at Cornell University.
                    In my free time I like to ski, snowboard, listen to hip hop, and referee soccer.
                </p>
                <ul>
                    <li><a target="_blank" rel="noopener noreferrer" href="/Sam-Hu-Resume.pdf">Resume</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sam-hu">LinkedIn</a></li>
                    {/* <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/samhuuu">Facebook</a></li> */}
                    {/* <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_samhu_/">Instagram</a></li> */}
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
            <div id="musicContainer">
                <div className="artistContainer">
                    <ul className="artistClass">
                        {spotifyData.items.filter((_, i) => document.body.clientWidth > 550 || i < 12).map((artist, _) => {
                            return (<li className="artist" key={artist.id}>
                                <a target="_blank" rel="noopener noreferrer" href={artist.uri}>
                                    <img src={artist.images[1].url} alt="" />
                                    {artist.name}
                                </a>
                            </li>)
                        })}
                    </ul>
                </div>
                <iframe title="my playlist"
                    className="playlist"
                    src="https://open.spotify.com/embed/playlist/7dSBjc6YMggxd0IlgvCV9j"
                    width="380" height="650" allow="encrypted-media"
                />
            </div>
        </div>
        <div id="timeline">
            <h2>My timeline</h2>
            <MyTimeline />
        </div>

        {/* <WordsContainer connections={[
            {
                description: "test1",
                id: 1,
                words: ["test1", "test2", "test3", "test4"]
            },
            {
                description: "test2",
                id: 2,
                words: ["test5", "test6", "test7", "test8"]
            },
            {
                description: "test3",
                id: 3,
                words: ["test9", "test10", "test11", "test12"]
            },
            {
                description: "test4",
                id: 4,
                words: ["test13", "test14", "test15", "test16"]
            }
        ]} /> */}
        <footer>Sam Hu © 2023</footer>
    </div>;
}

export default Home;
