import React from "react"
import "./Recruitments.css"
import Task from "./Task.jsx"

export default function RecruitmentsPage(){
    return(
        <div className='recruitments'>
            <div className='rec-process'>
                <h1 className="rec-clubname">ACM Recruitments</h1>
                <h2 className="heading-1">Recruitment Process</h2>
                <Task/>
                <Task/>
                <h2 className="heading-1">Recruitment Form</h2>
            </div>

            <div className="image-section">
                <img src="src\assets\laptop.png" alt="image not found"/>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sint sunt inventore rerum! Iure soluta quos quas adipisci quaerat consequatur?</p>
                <button>Go to Club Page</button>
            </div>
        </div>
    )
}