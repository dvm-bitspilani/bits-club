import React, { useState, useEffect } from 'react';
import "./EventsPage.css"
import Upcoming from "./Upcoming.jsx"
import Slider1 from "./Slider/Slider1.jsx"
import Slider2 from './Slider/Slider2.jsx'
import http from '../../../http-common.js';
import { CircularProgress } from '@mui/material';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await http.get('/events/');
                setEvents(response1.data.events);

                const response2 = await http.get('events/upcoming/');
                setUpcomingEvents(response2.data.events);

                setLoading(false)

            } catch (error) {
                setError(error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, []);

    console.log(events)
    console.log(upcomingEvents)

    // Render the loading screen while data is being fetched
    if (loading) {
        return(
        <div className='page'>
        <div className="club-page-loading">
          <CircularProgress />
        </div>
        </div>)
         // Show loading message while fetching data
    }

    let upcomingEventsList = upcomingEvents.slice(0, 3).map((event, index) => (
        <Upcoming
            key={index}
            title={event.event_title}
        />
    ));

    let highlightEvent = upcomingEvents.slice(0, 1).map((event, index) => (
        <div className="events-top-container" key={index}>
            <div className="img-container-2">
                <img src={event.event_images} alt="" 
                onError={(e) => (e.target.src = "/assets/NAB.png")}/>
            </div>
            <div className="events-bottomtext">
                <h3 className="events-bottomtext-heading">{event.event_title}</h3>
                <p className="events-bottomtext-info">{event.event_description}</p>
            </div>
        </div>
    ));

    return (
        <div className="events page">
            <h1 className="events-title">Events</h1>
            {highlightEvent}
            <div className="events-upcoming">
                <div className="events-upcoming-top">
                    <h1 className="events-title">Upcoming</h1>
                    <p className="events-seeall">see all</p>
                </div>
                {upcomingEventsList}
            </div>
            <div className="events-recommended">
                <div className="events-title">All Events</div>
                <Slider1 eventsArray={events} />
            </div>

            <div className="events-seminar">
                <div className="events-title">Seminar/Talks/Workshops</div>
                <Slider2 eventsArray={events} />
            </div>
        </div>
    )
}

