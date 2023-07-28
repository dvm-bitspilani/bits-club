import React, { useState } from "react"
import "./Slider.css"
import EventSlider from "./EventsSlider"
import "../../Club Page/ClubPage.css"
import EventModal from "../Modal/EventModal"

export default function Slider1(props) {

    const [isEventModalOpen, setIsEventModalOpen] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState(null)

    const handleEventSliderClick = (eventId) => {
        setSelectedEventId(eventId);
        setIsEventModalOpen(true);
    }
    let eventsList = props.eventsArray.map((event, index) => {

        if (!event.isSeminar) {
            return (
                <EventSlider
                    key={index}
                    id={event._id}
                    title={event.event_title}
                    description={event.event_description}
                    isSeminar={event.isSeminar}
                    start={event.event_start}
                    end={event.event_end}
                    image={event.event_images}
                    // onClose={() => setIsEventModalOpen(false)}
                />)
        }

    })

    console.log(isEventModalOpen)


    return (
        <>
            <div className="slider">
                <div className="club-previous-work-container">
                    {eventsList}
                </div>
            </div>
            {isEventModalOpen && (
                <EventModal
                    onClose={() => setIsEventModalOpen(false)}
                //   handleAddEvent={handleAddEvent}
                />
            )}
        </>
    )
}