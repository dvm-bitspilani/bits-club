import React, { useRef, useEffect, useState } from "react";
import "./Recruitments.css";
import RelevantInfo from "./RelevantInfo.jsx";
import ImgContainer1 from "./ImgContainer1";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skills from "./Skills";
import EditRecPage from "./EditRecPage";
import "../Club Page/ClubPage.css";
import jwtDecode from "jwt-decode";
import Switch from "../Club Page/components/Switch/Switch";
import LinksAddModal from "./LinksAddModal";
import { CircularProgress } from "@mui/material";

export default function RecruitmentsPage() {
  const { club } = useParams();
  const clubName = club.replace(/-/g, " ");
  const clubNameDashed = club;
  console.log(clubName);

  const [clubData, setClubData] = useState([]);
  const [clubDataMasters, setClubDataMasters] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [isSavingDescription, setIsSavingDescription] = useState(false); // State to handle saving description loading
  const [isSavingFormLink, setIsSavingFormLink] = useState(false); // State to handle saving form link loading

  const apiLink = `https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/recruitments`;

  useEffect(() => {
    axios
      .get(`https://bits-clubs.onrender.com/api/v1/clubs/${clubName.replace(/ /g, "-")}`)
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

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(apiLink);
        console.log("hello");
        setClubData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchClubData();
  }, [apiLink]);

  console.log(clubData);

  const currentDescription = clubData.recruitment_info?.info || "";
  const currentFormLink = clubData.recruitment_form || "";

  const infoTextareaRef = useRef(null);
  const formTextareaRef = useRef(null);
  const formRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAddLinksModalOpen, setIsAddLinksModalOpen] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      axios
        .put(
          `https://bits-clubs.onrender.com/api/v1/clubs/${clubName.replace(/ /g, "-")}/update`,
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
      infoTextareaRef.current.style.height = `${infoTextareaRef.current.scrollHeight + 20}px`;
    }
  }, [isAdmin, clubData]);

//   const height = "";

  useEffect(() => {
    if (formRef.current) {
      formRef.current.style.height = "inherit";
      formRef.current.style.height = `${formRef.current.scrollHeight + 20}px`;
    }
  }, [clubData]);

  useEffect(() => {
    if (isAdmin && formTextareaRef.current) {
      formTextareaRef.current.style.height = "inherit";
      formTextareaRef.current.style.height = `${formTextareaRef.current.scrollHeight + 20}px`;
    }
  }, [clubData]);

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 25}px`;
  };

  const handleSaveDescription = () => {
    setIsSavingDescription(true);
    const club_description = infoTextareaRef.current.value;
    const updatedData = { ...clubData, recruitment_info: { ...clubData.recruitment_info, info: club_description } };

    axios
      .put(`https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/update`, updatedData)
      .then((res) => {
        console.log("Data successfully updated on the server:", res.data);
        setClubData(updatedData); // Update local state after successful API request
        alert("Recruitment Data Saved");
      })
      .catch((err) => console.error("Error updating data:", err))
      .finally(() => {
        setIsSavingDescription(false);
      });
  };

  const handleSaveForm = () => {
    setIsSavingFormLink(true);
    const form = formTextareaRef.current.value;
    const updatedData = { ...clubData, recruitment_form: form };

    axios
      .put(`https://bits-clubs.onrender.com/api/v1/clubs/${clubNameDashed}/update`, updatedData)
      .then((res) => {
        // console.log("Data successfully updated on the server:", res.data);
        setClubData(updatedData); // Update local state after successful API request
        alert("Form Link Saved");
      })
      .catch((err) => console.error("Error updating data:", err))
      .finally(() => {
        setIsSavingFormLink(false);
      });
  };

  const handleAddSkillTag = (tag) => {
    if (tag !== "") {
      const tempSkillsTag = [...clubData.recruitment_info.links];
      tempSkillsTag.push(tag);
      setClubData({ ...clubData, recruitment_info: { ...clubData.recruitment_info, links: tempSkillsTag } });
    }
  };

  const handleEditSkillTag = (skill, newskill) => {
    if (newskill !== "") {
      if (newskill === null) return;
      const tempSkillsTag = clubData.recruitment_info.links.map((item) => {
        if (item === skill) {
          return newskill;
        }
        return item;
      });
      setClubData({ ...clubData, recruitment_info: { ...clubData.recruitment_info, links: tempSkillsTag } });
    }
  };

  const handleDeleteSkillTag = (skill) => {
    if (window.confirm("Are you sure you want to delete this link?") === false) return;
    const tempSkillsTag = clubData.recruitment_info.links.filter((item) => {
      return item !== skill;
    });
    setClubData({ ...clubData, recruitment_info: { ...clubData.recruitment_info, links: tempSkillsTag } });
  };

  let relevantInfo = isAdmin ? (
    <>
      <textarea
        ref={infoTextareaRef}
        className="rec-description-textarea text"
        defaultValue={currentDescription}
        onKeyDown={handleKeyDown}
        onMouseDown={handleKeyDown}
        maxLength={2000}
      ></textarea>
      <button onClick={handleSaveDescription} className="save-info text">
        {isSavingDescription ? "Saving..." : "Save Recruitment Info"}
      </button>
    </>
  ) : (
    <div style={{ whiteSpace: "pre-line" }} className="text">
      {currentDescription}
    </div>
  );

  let FormLink = isAdmin ? (
    <>
      <textarea
        ref={formTextareaRef}
        className="rec-description-textarea text"
        defaultValue={currentFormLink}
        onKeyDown={handleKeyDown}
        onMouseDown={handleKeyDown}
      ></textarea>
      <button onClick={handleSaveForm} className="text save-form">
        {isSavingFormLink ? "Saving..." : "Save Form Link"}
      </button>
    </>
  ) : (
    <>
      <div>
        <a href={clubData.recruitment_form} target="_blank">
          Form Link
        </a>
      </div>
      <div className="embedded-form-container" ref={formRef}>
        <iframe  title="Embedded Google Form" src={clubData.recruitment_form} className="embedded-form-iframe"/>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="page">
        <div className="club-page-loading">
        <CircularProgress />
      </div>
      </div>
      
    );
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


    let relevantLinks =
        clubData.recruitment_info.links.length > 0 &&
        clubData.recruitment_info.links.map((link, index) => (
            <React.Fragment key={index}>
                <div className="text">
                    <a href={link} target="_blank">{link}</a>
                </div>
            </React.Fragment>
        ));

    let skillsRequired =
        clubData.club_tags.length > 0 &&
        clubData.club_tags.map((skill, index) => (
            <Skills text={skill} key={index} />
        ));
    // function handleClickEdit() {
    //     return (
    //         <div>
    //             <EditRecPage />
    //         </div>
    //     )
    // }

    // console.log(currentDescription);

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

                    <div className="links">
                        <div className="task heading-2">Relevant Links</div>
                        {isAdmin && (
                            <button
                                className="club-previous-work-add-button"
                                onClick={() => setIsAddLinksModalOpen(true)}
                            >
                                <img src="/assets/edit_icon.png" alt="add" />
                            </button>
                        )}
                    </div>

                    {isAddLinksModalOpen && (
                        <LinksAddModal
                            onClose={() => setIsAddLinksModalOpen(false)}
                            // handleAddSkill={handleAddSkillText}
                            tags={clubData.recruitment_info.links}
                            handleAddSkillTag={handleAddSkillTag}
                            handleEditSkillTag={handleEditSkillTag}
                            handleDeleteSkillTag={handleDeleteSkillTag}
                        />
                    )}
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
                {FormLink}
            </div>
        </div>
    );
}
