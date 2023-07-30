import Marquee from "react-fast-marquee";


export default function Upcoming(props) {

    const gap = "⠀⠀⠀⠀⠀"

    return (
        <div>
            <Marquee className="events-upcoming-card" pauseOnHover="true" speed={100} autoFill="true">
                <h3 className="events-upcoming-card-text">{props.title}</h3>
                <h3 className="events-upcoming-card-text">{gap}</h3>
            </Marquee>
        </div>
    )
}
