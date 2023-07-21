import eventCSS from "./event.module.css";

export default function ClubPreviousEventSlide({image, description}) {
  return (
    <div className={eventCSS.eventContainer}>
      <div className={eventCSS.eventImageContainer}>
        <img src={image} alt="Event" className={eventCSS.eventImage} />
        </div>
      <div className={eventCSS.eventDescription}>
        <span>
          {description}
        </span>
      </div>
    </div>
  );
}
