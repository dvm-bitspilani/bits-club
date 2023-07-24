import PORCardCSS from "./PORCard.module.css";

export default function PORCard(props) {
  return (
    <div className={PORCardCSS["por-card"]}>
      {props.isAdmin && (
        <>
          <button
            className={PORCardCSS["deleteButton"]}
            onClick={props.onDelete}
          >
            <img src="/assets/delete.png" alt="Delete" />
          </button>
          <button
            className={PORCardCSS["editButton"]}
            onClick={props.onEdit}
          >
            <img src="/assets/edit_icon.png" alt="Edit" />
          </button>
        </>
      )}
      <div className={PORCardCSS["por-card-image-container"]}>
        <img
          src={props.image}
          // alt="por"
          className={PORCardCSS["por-card-image"]}
          onError={(e) => (e.target.src = "/assets/thumbnail3.png")}
        />
      </div>
      <span className={PORCardCSS["por-card-name"]}>{props.name}</span>
      <span className={PORCardCSS["por-card-position"]}>{props.position}</span>
    </div>
  );
}
