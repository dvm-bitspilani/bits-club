import React, { useState, useEffect } from 'react';
import "./EventsPage.css"
import Upcoming from "./Upcoming.jsx"
import Slider1 from "./Slider/Slider1.jsx"
import Slider2 from './Slider/Slider2.jsx'
import axios from 'axios';

export default function EventsPage() {

    // const [events, setEvents] = useState([]);
    // const [upcomingEvents, setUpcomingEvents] = useState([])
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData1 = async () => {
    //         try {
    //             const response = await fetch('https://bits-clubs.onrender.com/api/v1/events/');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             const jsonData = JSON.stringify(data);
    //             setEvents(data.events);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData1();
    // }, []);

    // useEffect(() => {
    //     const fetchData2 = async () => {
    //         try {
    //             const response = await fetch('https://bits-clubs.onrender.com/api/v1/events/upcoming/');
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             const jsonData2 = JSON.stringify(data);
    //             setUpcomingEvents(data.upcomingEvents);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData2();
    // }, []);


    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        // Function to fetch the data from the first API using Axios
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://bits-clubs.onrender.com/api/v1/events/');
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching data from https://bits-clubs.onrender.com/api/v1/events/:', error);
            }
        };

        // Function to fetch the data from the second API using Axios
        const fetchUpcomingEvents = async () => {
            try {
                const response = await axios.get('https://bits-clubs.onrender.com/api/v1/events/upcoming/');
                setUpcomingEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching data from https://bits-clubs.onrender.com/api/v1/events/upcoming/:', error);
            }

        };

        // Call both fetch functions when the component mounts
        fetchEvents();
        fetchUpcomingEvents();
    }, []);

    console.log(events)
    console.log(upcomingEvents)


    let upcomingEventsList = upcomingEvents.map((event, index) => {

        for(let i=0 ;i<3; i++){
            return (
                <Upcoming 
                key= {index}
                title = {event.event_title}
                />)}
    })

    let highlightEvent = upcomingEvents.map((event, index) => {

        for(let i=0 ;i<1; i++){
            return (
                <h3>{event.event_title}</h3>
            )}
    })



    return (
        <div className="events page">
            <h1 className="events-title">Events</h1>
            <div className="events-top-container">
                <div className="img-container-2">
                    <img src="../public/assets/NAB.png" alt="" />
                </div>
                <div className="events-bottomtext">
                    <h3 className="events-bottomtext-heading">{highlightEvent}</h3>
                    <p className="events-bottomtext-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris </p>
                </div>
            </div>
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