import React from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { ReactComponent as BirthIcon } from "./assets/birth.svg"
import { ReactComponent as PlaneIcon } from "./assets/plane.svg";
import { ReactComponent as HouseIcon } from "./assets/house.svg";
import { ReactComponent as PianoIcon } from "./assets/piano.svg";
import { ReactComponent as GradIcon } from "./assets/graduation.svg";
import { ReactComponent as NoPianoIcon } from "./assets/nopiano.svg";
import { ReactComponent as WhistleIcon } from "./assets/whistle.svg";
import { ReactComponent as VballIcon } from "./assets/vball.svg";
import { ReactComponent as CodeIcon } from "./assets/code.svg";
import { ReactComponent as SFIcon } from "./assets/sf.svg";
import { ReactComponent as CornellIcon } from "./assets/cornell.svg";
import { ReactComponent as DevIcon } from "./assets/react-white.svg";
import './style.min.css';

class MyTimeline extends React.Component {
    render() { return (
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="1998"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<BirthIcon viewBox="0 0 150 150" />}
            >
                <h3 className="vertical-timeline-element-title">Born in Hefei, China</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2001"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<PlaneIcon />}
            >
                <h3 className="vertical-timeline-element-title">Moved to the United States</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2004"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<HouseIcon />}
            >
                <h3 className="vertical-timeline-element-title">Settled down in Potomac, Maryland</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2006"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<PianoIcon />}
            >
                <h3 className="vertical-timeline-element-title">Started learning how to play piano</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2009"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<GradIcon />}
            >
                <h3 className="vertical-timeline-element-title">Graduated from elementary school</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="Circa 2010"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<NoPianoIcon />}
            >
                <h3 className="vertical-timeline-element-title">Forgot how to play piano</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2012"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<GradIcon />}
            >
                <h3 className="vertical-timeline-element-title">Graduated from middle school</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2012"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<WhistleIcon />}
            >
                <h3 className="vertical-timeline-element-title">Certified as a USSF soccer referee</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2014"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<VballIcon />}
            >
                <h3 className="vertical-timeline-element-title">Joined a varsity volleyball team</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2015"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<CodeIcon />}
            >
                <h3 className="vertical-timeline-element-title">Took my first coding class</h3>
                <p>Shoutout to AP Comp Sci</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2016"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<GradIcon />}
            >
                <h3 className="vertical-timeline-element-title">Graduated from high school</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2019"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#003c66' }}
                icon={<SFIcon />}
            >
                <h3 className="vertical-timeline-element-title">Discovered San Francisco</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2019"
                iconStyle={{ background: 'rgb(250, 250, 250)', color: '#fff' }}
                icon={<CornellIcon />}
            >
                <h3 className="vertical-timeline-element-title">Graduated from Cornell University</h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element"
                contentArrowStyle={{ borderRight: '10px solid  rgb(255, 255, 255)' }}
                date="2020"
                iconStyle={{ background: 'rgb(98, 218, 251)', color: '#fff' }}
                icon={<DevIcon />}
            >
                <h3 className="vertical-timeline-element-title">Made my first website (in React)</h3>
                <p>Congrats on making it to the end</p>
            </VerticalTimelineElement>
        </VerticalTimeline>
    );}
}

export default MyTimeline;
