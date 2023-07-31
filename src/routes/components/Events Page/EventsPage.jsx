import React, { useState, useEffect } from 'react';
import "./EventsPage.css"
import Upcoming from "./Upcoming.jsx"
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import EventModal from "./Modal/EventModal.jsx"
import EventSlider from './Slider/EventsSlider';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleOpenModal = (event) => {
        setIsModalOpen(true);
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('https://bits-clubs.onrender.com/api/v1/events/');
                setEvents(response1.data.events);

                const response2 = await axios.get('https://bits-clubs.onrender.com/api/v1/events/upcoming/');
                setUpcomingEvents(response2.data.events);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className='page'>
                <div className="club-page-loading">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    let upcomingEventsList = upcomingEvents.slice(0, 3).map((event, index) => (
        <Upcoming
            key={index}
            title={event.event_title}
            onClick={() => handleOpenModal(event)}
        />
    ));

    let highlightEvent = upcomingEvents.slice(0, 1).map((event, index) => (
        <div className="events-top-container" key={index} onClick={() => handleOpenModal(event)}>
            <div className="img-container-2">
                <img src={event.event_images} alt=""
                    onError={(e) => (e.target.src = "/assets/NAB.png")} />
            </div>

            <div className="events-bottomtext">
                <h3 className="events-bottomtext-heading">{event.event_title}</h3>
                <p className="events-bottomtext-info">{event.event_description}</p>
            </div>
        </div>
    ));

    let allEvents = events.map((event, index) => {
        if (!event.isSeminar) {
            return (
                <EventSlider
                    key={event._id}
                    title={event.event_title}
                    description={event.event_description}
                    isSeminar={event.isSeminar}
                    start={event.event_start}
                    end={event.event_end}
                    image={event.event_images}
                    onClick={() => handleOpenModal(event)}
                />
            );
        }
    });

    let allSeminars = events.map((event, index) => {
        if (event.isSeminar) {
            return (
                <EventSlider
                    key={event._id}
                    title={event.event_title}
                    description={event.event_description}
                    isSeminar={event.isSeminar}
                    start={event.event_start}
                    end={event.event_end}
                    image={event.event_images}
                    onClick={() => handleOpenModal(event)}
                />
            );
        }
    });

    return (
        <div className="events page">
            <h1 className="events-title">Events</h1>
            {highlightEvent}
            <EventModal isOpen={isModalOpen} onClose={handleCloseModal} event={selectedEvent} />
            <div className="events-upcoming">
                <div className="events-upcoming-top">
                    <h1 className="events-title">Upcoming</h1>
                    <p className="events-seeall">see all</p>
                </div>
                {upcomingEventsList}
            </div>
            <div className="events-recommended">
                <div className="events-title">All Events</div>
                <div className="slider-container">{allEvents}</div>
            </div>

            <div className="events-seminar">
                <div className="events-title">Seminar/Talks/Workshops</div>
                <div className='slider-container'>{allSeminars}</div>
            </div>
        </div>
    );
}
