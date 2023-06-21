import skillTagCSS from "./SkillsTag.module.css";

export default function SkillsTag(props) {
return (
    <div className={skillTagCSS.skillContainer}>
        {/* <div className="skills-tag__icon">
        <img src={props.icon} alt="icon" />
        </div> */}
        <div>{props.text}</div>
    </div>
    );
    }