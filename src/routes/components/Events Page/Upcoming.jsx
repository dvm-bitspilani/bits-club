import React from 'react';
import Marquee from "react-fast-marquee";
import "./EventsPage.css";

export default function Upcoming({ title, onClick }) {
    const gap = "⠀⠀⠀⠀⠀";

    return (
        <div onClick={onClick}>
            <Marquee className="events-upcoming-card" pauseOnHover={true} speed={100} autoFill={true}>
                <h3 className="events-upcoming-card-text">{title}</h3>
                <h3 className="events-upcoming-card-text">{gap}</h3>
            </Marquee>
        </div>
    );
}
