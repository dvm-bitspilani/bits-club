import React from "react"
import "./Slider.css"
import ImgContainer3 from "./ImgContainer3"

export default function Slider({ children }) {

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

    return (
        <div className="slider">
            <div className="slider-container snaps-inline grabbable">
                <ImgContainer3 cardNo="1" />
                <ImgContainer3 cardNo="2" />
                <ImgContainer3 cardNo="3" />
                <ImgContainer3 cardNo="4" />
                <ImgContainer3 cardNo="5" />
                <ImgContainer3 cardNo="6" />
                <ImgContainer3 cardNo="7" />
                <ImgContainer3 cardNo="8" />
                <ImgContainer3 cardNo="9" />
            </div>
        </div>
    )
}