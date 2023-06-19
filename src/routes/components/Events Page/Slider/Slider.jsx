import React from "react"
import "./Slider.css"
import ImgContainer3 from "./ImgContainer3"

export default function Slider(){
    return(
        <div className="slider">
            <div className="slider-container">
                <ImgContainer3 cardNo="1"/>
                <ImgContainer3 cardNo="2"/>
                <ImgContainer3 cardNo="3"/>
                <ImgContainer3 cardNo="4"/>
                <ImgContainer3 cardNo="5"/>
                <ImgContainer3 cardNo="6"/>
                <ImgContainer3 cardNo="7"/>
                <ImgContainer3 cardNo="8"/>
                <ImgContainer3 cardNo="9"/>
            </div>


        </div>
    )
}