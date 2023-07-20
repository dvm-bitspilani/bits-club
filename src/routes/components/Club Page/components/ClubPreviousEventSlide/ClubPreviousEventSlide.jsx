import eventCSS from "./event.module.css";

export default function ClubPreviousEventSlide() {
  return (
    <div className={eventCSS.eventContainer}>
      <div className={eventCSS.eventImageContainer} />
      <div className={eventCSS.eventDescription}>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod
          odio a ipsum vehicula semper sed imperdiet nunc.
        </span>
      </div>
    </div>
  );
}
