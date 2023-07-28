import eventCSS from "../../Club Page/components/ClubPreviousEventSlide/event.module.css";


export default function EventSlider({ image, description}) {

  return (
    <div className={eventCSS.eventContainer}>
      <div className={eventCSS.eventImageContainer}>
        <img
          src={image}
          alt="Event"
          className={eventCSS.eventImage}
          onError={(e) => (e.target.src = "/assets/thumbnail3.png")}
        />
      </div>
      <div className={eventCSS.eventDescription}>
        <span>{description}</span>
      </div>
    </div>
  );
}