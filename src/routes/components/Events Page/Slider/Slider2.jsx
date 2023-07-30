import React from "react"
import "./Slider.css"
import EventSlider from "./EventsSlider"
import "../../Club Page/ClubPage.css"

export default function Slider1(props) {


let eventsList = props.eventsArray.map((event, index) => {

    if(event.isSeminar){
        return (
            <EventSlider
            key= {index}
            id = {event._id}
            title = {event.event_title}
            description = {event.event_description}
            isSeminar = {event.isSeminar}
            start = {event.event_start}
            end = {event.event_end}
            image = {event.event_images}
            />)
    }
})

    return (
        <div className="slider">
            <div className="club-previous-work-container">
                {eventsList}
            </div>
        </div>
    )
}