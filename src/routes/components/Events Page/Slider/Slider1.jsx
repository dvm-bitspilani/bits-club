import React from "react"
import "./Slider.css"
import ImgContainer3 from "./ImgContainer3"

export default function Slider1(props) {

//     const sliderRef = useRef(null);
//   const [isDown, setIsDown] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const handleMouseDown = (e) => {
//     setIsDown(true);
//     sliderRef.current.classList.add('active');
//     setStartX(e.pageX - sliderRef.current.offsetLeft);
//     setScrollLeft(sliderRef.current.scrollLeft);
//   };

//   const handleMouseLeave = () => {
//     setIsDown(false);
//     sliderRef.current.classList.remove('active');
//   };

//   const handleMouseUp = () => {
//     setIsDown(false);
//     sliderRef.current.classList.remove('active');
//   };

//   const handleMouseMove = (e) => {
//     if (!isDown) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX) * 3; // scroll-fast
//     sliderRef.current.scrollLeft = scrollLeft - walk;
//     console.log(walk);
//   };


let eventsList = props.eventsArray.map((event, index) => {

    if(!event.isSeminar){
        return (
            <ImgContainer3 
            key= {index}
            id = {event._id}
            title = {event.event_title}
            desc = {event.event_description}
            isSeminar = {event.isSeminar}
            start = {event.event_start}
            end = {event.event_end}
            img = {event.event_images}
            />)
    }
})

    return (
        <div className="slider">
            <div className="slider-container snaps-inline grabbable">
                {eventsList}
            </div>
        </div>
    )
}