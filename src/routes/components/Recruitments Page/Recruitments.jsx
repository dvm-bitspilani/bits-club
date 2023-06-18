import React from "react"
import "./Recruitments.css"
import Task from "./Task.jsx"
import ImgContainer1 from "./ImgContainer1"

export default function RecruitmentsPage() {
    return (
        <div className='recruitments' style = {{backgroundImage: "url(../src/assets/Sprinkle2.png)"}}>
            <div className='rec-process'>
                <h1 className="rec-clubname">ACM Recruitments</h1>
                <div className="button-container">
                    <h2 className="heading-1">Recruitment Process</h2>
                    <button>Go to Club Page</button>
                </div>
                <Task />
                <Task />
                <h2 className="heading-1">Recruitment Form</h2>
            </div>

            <div className="image-section">
                <ImgContainer1 />
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sint sunt inventore rerum! Iure soluta quos quas adipisci quaerat consequatur?</p>
            </div>
        </div>
    )
}


