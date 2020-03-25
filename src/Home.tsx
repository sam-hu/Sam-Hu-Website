import React from 'react';
import './Home.scss';
import { spotifyData } from './spotify';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import './style.min.css';
// import { recommends } from './recommends';
import {ReactComponent as BirthIcon} from "./assets/birth.svg"
import {ReactComponent as PlaneIcon} from "./assets/plane.svg";
import {ReactComponent as HouseIcon} from "./assets/house.svg";
import {ReactComponent as PianoIcon} from "./assets/piano.svg";
import {ReactComponent as GradIcon} from "./assets/graduation.svg";
import {ReactComponent as NoPianoIcon} from "./assets/nopiano.svg";
import {ReactComponent as WhistleIcon} from "./assets/whistle.svg";
import {ReactComponent as VballIcon} from "./assets/vball.svg";
import {ReactComponent as CodeIcon} from "./assets/code.svg";
import {ReactComponent as SFIcon} from "./assets/sf.svg";
import {ReactComponent as CornellIcon} from "./assets/cornell.svg";
import {ReactComponent as DevIcon} from "./assets/react-white.svg";

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
        <div id="tv"></div>
        <header>
            <section id="info">
                <h1>Hey, I'm Sam.</h1>
                <p>I graduated from Cornell University in December 2019 with a double major in computer science and economics.
                    Currently, I'm employed as a remote software engineer at {okta}. I listen to hip hop, ski, snowboard, and referee soccer.
                </p>
                <ul>
                    <li><a target="_blank" rel="noopener noreferrer" href="/Sam-Hu-Resume.pdf">Resume</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sam-hu">LinkedIn</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/samhuuu">Facebook</a></li>
                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/_samhu_/">Instagram</a></li>
                </ul>
            </section>
            <aside>
                <img src="/Sam-Hu.png" id="profilePic" alt="Sam Hu" />
            </aside>
        </header>
        <div id="spotify">
            <div className="spotifyHeader">
                <h2>Here's what I listen to on {spotify}</h2>
                {/* <p>It's where I spend all my time</p> */}
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
        <div id="timeline">
            <h2>My timeline</h2>
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    // contentStyle={{ width: '400px', marginLeft: '80px'}}
                    // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="1998"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<BirthIcon viewBox="0 0 150 150" />}
                >
                    <h3 className="vertical-timeline-element-title">Born in Hefei, China</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2001"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<PlaneIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Moved to the United States</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2004"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<HouseIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Settled down in Potomac, Maryland</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2006"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<PianoIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Started learning how to play piano</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2009"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<GradIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from elementary school</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="Circa 2010"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<NoPianoIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Forgot how to play piano</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2012"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<GradIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from middle school</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2012"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<WhistleIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Certified as a USSF soccer referee</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2014"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<VballIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Joined a varsity volleyball team</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2015"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<CodeIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Took my first coding class (shoutout to AP Comp Sci)</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2016"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<GradIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from high school</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2016"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#003c66' }}
                    icon={<SFIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Discovered how much I like San Francisco</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2019"
                    iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                    icon={<CornellIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from Cornell University</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element"
                    date="2020"
                    iconStyle={{ background: 'rgb(98, 218, 251)', color: '#fff' }}
                    icon={<DevIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Made my first website</h3>
                    <p>Congrats on making it to the end!</p>
                </VerticalTimelineElement>
            </VerticalTimeline>
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
