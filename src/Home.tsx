import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import spotifyData from './Spotify/spotify';
import MyTimeline from './Timeline/timeline';
import './Home.scss';
import './Spotify/spotify.scss';

const title = 'Sam Hu';
const favicon = '/favicon.ico';
const found = <a style={{ color: '#1662DD', fontSize: '18px', fontWeight: 'bold' }} className="link" target="_blank" rel="noopener noreferrer" href="https://found.com">Found</a>;
const okta = <a style={{ color: '#1662DD', fontSize: '18px', fontWeight: 'bold' }} className="link" target="_blank" rel="noopener noreferrer" href="https://okta.com">Okta</a>;
const spotify = <a style={{ color: '#1DB954' }} className="spotifyText link" target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/1247031860">Spotify</a>;

function Home() {
  useEffect(() => {
    document.title = title;
    const faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    faviconLink.type = 'image/x-icon';
    faviconLink.href = favicon;
  }, []);

  return (
    <>
      <Helmet>
        <title>Sam Hu</title>
        <meta property="og:title" content={title} />
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <div id="home">
        <div id="topCurve" />
        <header>
          <div id="info">
            <h1>Hey, I'm Sam.</h1>
            <p>
              I'm currently at&nbsp;
              {found}
              &nbsp;
              building banking for the self-employed.
              Previously, I was a software engineer at&nbsp;
              {okta}
              .
              Before that, I studied computer science and economics at Cornell University.
              In my free time I like to ski, snowboard, listen to hip hop, and watch soccer.
            </p>
            <ul>
              <li><a target="_blank" rel="noopener noreferrer" href="/Sam-Hu-Resume.pdf">Resume</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sam-hu">LinkedIn</a></li>
              <li><a href="/connections">Play a game</a></li>
            </ul>
          </div>
          <div id="aside">
            <img src="/Sam-Hu.png" id="profilePic" alt="Sam Hu" />
          </div>
        </header>
        <div id="spotify">
          <div className="spotifyHeader">
            <h2>
              Here's what I listen to on&nbsp;
              {spotify}
            </h2>
          </div>
          <div id="musicContainer">
            <div className="artistContainer">
              <ul className="artistClass">
                {spotifyData.items.filter((_, i) => document.body.clientWidth > 550 || i < 12).map((artist) => (
                  <li className="artist" key={artist.id}>
                    <a target="_blank" rel="noopener noreferrer" href={artist.uri}>
                      <img src={artist.images[1].url} alt="" />
                      {artist.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <iframe
              title="my playlist"
              className="playlist"
              src="https://open.spotify.com/embed/playlist/7dSBjc6YMggxd0IlgvCV9j"
              width="380"
              height="650"
              allow="encrypted-media"
            />
          </div>
        </div>
        <div id="timeline">
          <h2>My timeline</h2>
          <MyTimeline />
        </div>
        <footer>Sam Hu © 2023</footer>
      </div>
    </>
  );
}

export default Home;
