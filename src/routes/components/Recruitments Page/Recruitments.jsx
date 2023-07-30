import React, { useEffect, useState } from "react";
import "./Recruitments.css";
import RelevantInfo from "./RelevantInfo.jsx";
import ImgContainer1 from "./ImgContainer1";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skills from "./Skills";
import EditRecPage from "./EditRecPage";

export default function RecruitmentsPage() {
  const { club } = useParams();
  const clubName = club.replace(/-/g, " ");
  const clubNameDashed = club;

  const [clubInfo, setClubInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  const apiLink = `https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/recruitments`;

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const response = await axios.get(apiLink);
        setClubInfo(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchClubInfo();
  }, [apiLink]);

  if (loading) {
    return <div className="loading page">Loading...</div>; // Show loading message while fetching data
  }

  if (!clubInfo.isRecruiting) {
    return (
      <div className="not-recruiting page">
        <h3>{clubName + " is currently not recruiting"}</h3>
        <button>
          <Link to={`/${club}/recruitments/edit`}>Add Recruitments Info</Link>
        </button>
      </div>
    );
  }

  let skillsRequired =
    clubInfo.club_tags.length > 0 &&
    clubInfo.club_tags.map((skill, index) => (
      <Skills text={skill} key={index} />
    ));

  let relevantLinks =
    clubInfo.recruitment_info.links.length > 0 &&
    clubInfo.recruitment_info.links.map((link, index) => (
      <React.Fragment key={index}>
        <div className="text">
          <a href={link}>{link}</a>
        </div>
      </React.Fragment>
    ));

  function relevantInfo() {
    return (
      <li>
        <RelevantInfo info={clubInfo.recruitment_info.info} key={index} />
      </li>)
  };

  function handleClickEdit() {
    return (
      <div>
        <EditRecPage />
      </div>
    )
  }

  // console.log(clubInfo.recruitment_info.info);

  return (
    <div>
      <div className="recruitments page">
        <div className="rec-process">
          <h1 className="rec-clubname">{clubName + " Recruitments"}</h1>
          <div className="image-section">
          <ImgContainer1 src={clubInfo.club_image} />
          <p className="text">{clubInfo.club_name}</p>
          <div className="skills-tags">{skillsRequired}</div>
        </div>
          <button>
            <div onClick={handleClickEdit}>Edit this page</div>
          </button>
          <div className="button-container">
            <h2 className="heading-1">Relevant Info</h2>
            <button>
              <Link to={`/${club}`}>Go to Club Page</Link>
            </button>
          </div>
          <div className="rec-info">{relevantInfo}</div>

          <div className="links-list"><div className="task heading-2">Relevant Links</div>
            {relevantLinks}</div>
        </div>

        <div className="image-section">
          <ImgContainer1 src={clubInfo.club_image} />
          <p className="text">{clubInfo.club_name}</p>
          <div className="skills-tags">{skillsRequired}</div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="heading-1">Recruitment Form</h2>
        <div>
          <a href={clubInfo.recruitment_form}>Form Link</a>
        </div>
        <div className="embedded-form-container">
          {/* <div style={{filter: "hue-rotate(189.73deg)", saturate: "18.61%", brightness: "96.86%"}}> */}
          <iframe
            title="Embedded Google Form"
            src={clubInfo.recruitment_form}
            className="embedded-form-iframe"
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
