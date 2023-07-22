import PORCardCSS from "./PORCard.module.css";

export default function PORCard(props) {

    return (
        <div className={PORCardCSS["por-card"]}>
        <div className={PORCardCSS["por-card-image-container"]}>
            <img
            src={props.image}
            // alt="por"
            className={PORCardCSS["por-card-image"]}
            onError={(e)=>e.target.src = '/assets/thumbnail3.png'}
            />
        </div>
        <div className={PORCardCSS["por-card-name"]}>{props.name}</div>
        <div className={PORCardCSS["por-card-position"]}>{props.position}</div>
        </div>
    );
    }