import React from 'react';
import './Home.scss';
import { spotifyData } from './spotify';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import { recommends } from './recommends';
import {ReactComponent as BirthLogo} from "./birth.svg"

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
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    // contentStyle={{ width: '400px', marginLeft: '80px'}}
                    // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date="1998"
                    iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
                    icon={<BirthLogo viewBox="0 0 150 150" />}
                >
                    <h3 className="vertical-timeline-element-title">Born in Hefei, China</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2001"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    // icon={<WorkIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Moved to the United States</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2004"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<BirthLogo viewBox="0 0 150 150" />}
                >
                    <h3 className="vertical-timeline-element-title">Settled down in Potomac, Maryland</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2006"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    // icon={React.createElement(img)}
                >
                    <h3 className="vertical-timeline-element-title">Started learning how to play piano</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2009"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from elementary school</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="Circa 2010"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Forgot how to play piano</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2012"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from middle school</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2012"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">First certification as a USSF soccer referee</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2015"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Took my first coding class (shoutout to AP Comp Sci)</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2016"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from high school</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2019"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Graduated from Cornell University</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2020"
                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    // icon={<SchoolIcon />}
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
