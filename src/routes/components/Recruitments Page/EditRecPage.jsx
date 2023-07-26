import React, {useRef, useEffect, useState } from "react";
import "./Recruitments.css";
import RelevantInfo from "./RelevantInfo.jsx";
import ImgContainer1 from "./ImgContainer1";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skills from "./Skills";
import EditRecPage from "./EditRecPage";
import "../Club Page/ClubPage.css";
import jwtDecode from "jwt-decode";
import Switch from "../Club Page/components/Switch";


export default function RecruitmentsPage() {
  const { club } = useParams();
  const clubName = club.replace(/-/g, " ");
  const clubNameDashed = club;
  console.log(clubName)

  const [clubData, setClubData] = useState([]);
  const [clubDataMasters, setClubDataMasters] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  

  const apiLink = `https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/recruitments`;

  useEffect(() => {
    axios
      .get(`https://bits-clubs.onrender.com/api/v1/clubs/${clubName.replace(/ /g,"-")}`)
      .then((res) => {
        setClubDataMasters(res.data.club);
        console.log("hi");
        if (localStorage.getItem("token") != null) {
          const decoded = jwtDecode(localStorage.getItem("token"));
          if (res.data.club.club_master_emails.includes(decoded.email)) {
            setIsEmailVerified(true);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);
//   console.log("hi");
  console.log(clubDataMasters)

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(apiLink);
        console.log("hello")
        setClubData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchClubData();
  }, [apiLink]);

  console.log(clubData)

  const currentDescription = clubData.recruitment_info?.info || "";

  const infoTextareaRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAddSkillTextModalOpen, setIsAddSkillTextModalOpen] = useState(false);
  const [isEditSkillTextModalOpen, setIsEditSkillTextModalOpen] = useState([
    false,
    0,
  ]);

  useEffect(() => {
    if (isAdmin) {
      axios
        .put(
          `https://bits-clubs.onrender.com/api/v1/clubs/${clubName.replace(
            / /g,
            "-"
          )}/update`,
          clubData
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [clubData]);

useEffect(() => {
    if (isAdmin && infoTextareaRef.current) {
      infoTextareaRef.current.style.height = "inherit";
      infoTextareaRef.current.style.height = `${
        infoTextareaRef.current.scrollHeight + 20
      }px`;
    }
  }, [isAdmin, clubData]);

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 25}px`;
  };

const handleSaveDescription = () => {
    const club_description = infoTextareaRef.current.value;
    const updatedData = { ...clubData, recruitment_info: { ...clubData.recruitment_info, info: club_description } };

    axios
      .put(`https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/update`, updatedData)
      .then((res) => {
        console.log("Data successfully updated on the server:", res.data);
        setClubData(updatedData); // Update local state after successful API request
        alert("Description Saved");
      })
      .catch((err) => console.error("Error updating data:", err));
  }


  let relevantInfo = isAdmin ? (
    <>
        <textarea
          ref={infoTextareaRef}
          className="rec-description-textarea text"
          defaultValue={currentDescription}
          onKeyDown={handleKeyDown}
          onMouseDown={handleKeyDown}
          maxLength={700}
        ></textarea>
      <button
        // className="club-description-save"
        onClick={() => handleSaveDescription()}
      >
        Save Description
      </button>
    </>
  ) : (
    <div style={{ whiteSpace: "pre-line" }} className="text">{currentDescription}</div>
  );


  if (loading) {
    return <div className="loading page">Loading...</div>; // Show loading message while fetching data
  }

//   if (!clubData.isRecruiting) {
//     return (
//       <div className="not-recruiting page">
//         <h3>{clubName + " is currently not recruiting"}</h3>
//         <button>
//           <Link to={`/${club}/recruitments/edit`}>Add Recruitments Info</Link>
//         </button>
//       </div>
//     );
//   }

  let skillsRequired =
    clubData.club_tags.length > 0 &&
    clubData.club_tags.map((skill, index) => (
      <Skills text={skill} key={index} />
    ));

  let relevantLinks =
    clubData.recruitment_info.links.length > 0 &&
    clubData.recruitment_info.links.map((link, index) => (
      <React.Fragment key={index}>
        <div className="text">
          <a href={link}>{link}</a>
        </div>
      </React.Fragment>
    ));

//   let relevantInfo =
//     clubData.recruitment_info.info.length > 0 &&
//     clubData.recruitment_info.info.map((info, index) => (
//       <li>
//         <RelevantInfo info={info} key={index} />
//       </li>
//     ));

  function handleClickEdit() {
    return (
      <div>
        <EditRecPage />
      </div>
    )
  }

  console.log(currentDescription);

  return (
    <div>
      <div className="recruitments page">
      {isEmailVerified && (
        <div className="make-page-editable">
          <span>Page Editable ? </span>
          <Switch
            isOn={isAdmin}
            handleToggle={() => setIsAdmin(!isAdmin)}
            colorOne="#06D6A0"
            colorTwo="#EF476F"
          />
        </div>
      )}
        <div className="rec-process">
          <h1 className="rec-clubname">{clubName + " Recruitments"}</h1>
          <div className="button-container">
            <h2 className="heading-1">Relevant Info</h2>
            <button>
              <Link to={`/${club}`}>Go to Club Page</Link>
            </button>
          </div>
          <ul>{relevantInfo}</ul>

          <div className="task heading-2">Relevant Links</div>
          {relevantLinks}
        </div>

        <div className="image-section">
          <ImgContainer1 src={clubData.club_image} />
          {/* <p className="text">{clubData.club_name}</p> */}
          <div className="skills-tags">{skillsRequired}</div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="heading-1">Recruitment Form</h2>
        <div>
          <a href={clubData.recruitment_form}>Form Link</a>
        </div>
        <div className="embedded-form-container">
          {/* <div style={{filter: "hue-rotate(189.73deg)", saturate: "18.61%", brightness: "96.86%"}}> */}
            <iframe
              title="Embedded Google Form"
              src={clubData.recruitment_form}
              className="embedded-form-iframe"
            />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
