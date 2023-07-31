import React from 'react';
import eventCSS from "../../Club Page/components/ClubPreviousEventSlide/event.module.css";
import "../EventsPage.css";

export default function EventSlider({ image, description, onClick }) {

  return (
    <div className="event-container" onClick={onClick}>
      <div className={eventCSS.eventImageContainer}>
        <img
          src={image}
          alt="Event"
          className={eventCSS.eventImage}
          onError={(e) => (e.target.src = "/assets/thumbnail3.png")}
        />
      </div>
      <div className="event-description">
        <span>{description}</span>
      </div>
    </div>
  );
}
