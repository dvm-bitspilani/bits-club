import "./EventsPage.css"
import Upcoming from "./Upcoming.jsx"
import Slider from "./Slider/Slider.jsx"

export default function EventsPage() {
    return (
        <div className="events page">
            <h1 className="events-title">Events</h1>
            <div className="events-top-container">
                <div className="img-container-2">
                    <img src="../src/assets/NAB.png" alt="" />
                </div>
                <div className="events-bottomtext">
                    <h3 className="events-bottomtext-heading">1980's Batch Alumni Meet</h3>
                    <p className="events-bottomtext-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris </p>
                </div>
            </div>
            <div className="events-upcoming">
                <div className="events-upcoming-top">
                    <h1 className="events-title">Upcoming</h1>
                    <p className="events-seeall">see all</p>
                </div>
                <Upcoming/>
                <Upcoming/>
                <Upcoming/>
            </div>
            <div className="events-recommended">
                <div className="events-title">Recommended For You</div>
                <Slider/>
            </div>

            <div className="events-seminar">
                <div className="events-title">Seminar/Talks/Workshops</div>
                <Slider/>
            </div>
        </div>
    )
}