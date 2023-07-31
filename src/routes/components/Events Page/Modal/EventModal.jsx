import React from 'react';
import { format } from 'date-fns';

const EventModal = ({event, isOpen, onClose}) => {
  if (!isOpen) return null;
  const startDate = new Date(event.event_start);
  const endDate = new Date(event.event_end);

  // Format the dates as per your requirements (e.g., "MMM dd, yyyy - HH:mm")
  const formattedStartDate = format(startDate, "dd MMM , yyyy - HH:mm a");
  const formattedEndDate = format(endDate, "dd MMM , yyyy - HH:mm a");
  console.log(event)

  let organizers = "";
  event.organizing_clubs.length == 1 ? (
    organizers = event.organizing_clubs[0].replace(/-/g, " ")
   ) : (
    organizers = event.organizing_clubs.map((club) => {
          return(
            <p>{club.replace(/-/g, " ")}</p>
          )}))

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        <div className='event-close-button-container'>
        <h2>{event.event_title}</h2>
        <p className="event-close-button" onClick={onClose}>
        ✖
        </p></div>
        <div className="event-modal-table text">
          <p>Description: </p><p>{event.event_description}</p>
          <p>Start Date: </p><p>{formattedStartDate}</p>
          <p>End Date: </p><p>{formattedEndDate}</p>
          <p>Organised by: </p>{organizers}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
