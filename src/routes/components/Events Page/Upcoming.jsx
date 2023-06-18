import Marquee from "react-fast-marquee";


export default function Upcoming() {

    const marqueeText = "The Last Of Us - Gurukul Psenti Nite // So gear up and get ready to witness a night filled with melody and fun."
    const gap = "    "

    return (
        <div>
            <Marquee className="events-upcoming-card" pauseOnHover="true" speed={100} autoFill="true">
                <h3>{marqueeText}</h3>
            </Marquee>
        </div>
    )
}