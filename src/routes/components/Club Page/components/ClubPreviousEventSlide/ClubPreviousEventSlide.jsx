import eventCSS from "./event.module.css";

export default function ClubPreviousEventSlide({ image, description, onDelete, onEdit, isAdmin}) {
  return (
    <div className={eventCSS.eventContainer}>
      {isAdmin && <>
      <button className={eventCSS.deleteButton} onClick={onDelete}>
        <img src="/assets/delete.png" alt="Delete" />
      </button>
      <button className={eventCSS.editButton} onClick={onEdit}>
        <img src="/assets/edit_icon.png" alt="Edit" />
      </button>
      </>
      }<div className={eventCSS.eventImageContainer}>
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
