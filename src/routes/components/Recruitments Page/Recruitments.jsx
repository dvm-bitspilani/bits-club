import React from "react"
import "./Recruitments.css"
import Task from "./Task.jsx"
import ImgContainer1 from "./ImgContainer1"
import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

export default function RecruitmentsPage() {
    const clubName = useParams().club.replace(/-/g, " ");
    const clubNameDashed = useParams().club

    const [clubInfo, setClubInfo] = useState([]);
    const [recrForm, setRecrForm] = useState([]);
    const apiLink = `https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/recruitments`

    useEffect(() => {
        // Function to fetch the data from the first API using Axios
        const fetchClubInfo = async () => {
            try {
                const response = await axios.get(apiLink);
                setClubInfo(response.data);
                setRecrForm(response.data.recruitments)
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }
        fetchClubInfo();
    }, [])

    // if (!clubInfo.isRecruiting) {
    //     return (
    //         <div className="not-recruiting">
    //             <h3>{clubInfo.msg}</h3>
    //         </div>
    //     )
    // }

    let recruitmentForms = recrForm.map((form, index) => {
        return (
            <>
                <div key={index}>
                    {(index + 1) + ". " + form.position + ": "} <span><a href={form.gFormLink}>Form Link</a></span>
                </div>
                <div className="embedded-form-container">
                    <iframe
                        title="Embedded Google Form"
                        src={form.gFormLink}
                        className="embedded-form-iframe"
                    >
                    </iframe>
                </div>
            </>
        )
    })

    return (
        <div>
            <div className='recruitments page'>
                <div className='rec-process'>
                    <h1 className="rec-clubname">{clubName + " Recruitments"}</h1>
                    <div className="button-container">
                        <h2 className="heading-1">Relevant Info</h2>
                        <button>
                            <Link to={`/${useParams().club}`}>Go to Club Page</Link>
                        </button>
                    </div>
                    <Task />

                </div>

                <div className="image-section">
                    <ImgContainer1
                        src={clubInfo.club_image}
                    />
                    <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sint sunt inventore rerum! Iure soluta quos quas adipisci quaerat consequatur?</p>
                </div>



            </div>

            <div className="form-container">
                <h2 className="heading-1">Recruitment Form</h2>
                {recruitmentForms}
            </div>

        </div>


    )
}


