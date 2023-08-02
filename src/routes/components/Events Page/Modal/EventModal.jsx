import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';

const EventModal = ({ event, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      prevScrollY.current = window.scrollY;
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${prevScrollY.current}px`;
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, prevScrollY.current);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const startDate = new Date(event.event_start);
  const endDate = new Date(event.event_end);

  const formattedStartDate = format(startDate, 'dd MMM, yyyy - HH:mm a');
  const formattedEndDate = format(endDate, 'dd MMM, yyyy - HH:mm a');

  let organizers = event.organizing_clubs.map((club, count = 1) => {
    let length = event.organizing_clubs.length;
    count++;
    return (
      <p key={count}>
        {club.replace(/-/g, ' ')}
        {count !== length && ', '}
      </p>
    );
  });

  return (
    <div className="event-modal">
      <div className="event-modal-content" ref={modalRef}>
        <div className="event-close-button-container">
          <h2>{event.event_title}</h2>
          <p className="event-close-button" onClick={onClose}>
            ✖
          </p>
        </div>
        <div className="event-modal-table text">
          <p>Description: </p>
          <p>{event.event_description}</p>
          <p>Start Date: </p>
          <p>{formattedStartDate}</p>
          <p>End Date: </p>
          <p>{formattedEndDate}</p>
          <p>Organised by: </p>
          <div>{organizers}</div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
