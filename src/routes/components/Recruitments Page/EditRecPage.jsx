import React, { useRef, useEffect, useState } from "react";
import "./Recruitments.css";
import ImgContainer1 from "./ImgContainer1";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skills from "./Skills";
import "../Club Page/ClubPage.css";
import jwtDecode from "jwt-decode";
import Switch from "../Club Page/components/Switch/Switch";
import LinksAddModal from "./LinksAddModal";
import { CircularProgress } from "@mui/material";

export default function RecruitmentsPage() {
  const { club } = useParams();
  const clubName = club.replace(/-/g, " ");
  const clubNameDashed = club;
  const [clubData, setClubData] = useState([]);
  const [clubDataMasters, setClubDataMasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSavingDescription, setIsSavingDescription] = useState(false);
  const [isSavingFormLink, setIsSavingFormLink] = useState(false);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchClubData();
  }, [apiLink]);

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
        setClubData(updatedData);
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
        setClubData(updatedData);
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
      if (newskill === "") return;
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
      <button className="rec-button mobile">
        <a href={clubData.recruitment_form} target="_blank">
          Open Form in new tab
        </a>
      </button>
      <button className="form-button desktop">
        <a href={clubData.recruitment_form} target="_blank">
          Open Form in new tab
        </a>
      </button>
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

    let relevantLinks =
        clubData.recruitment_info.links.length > 0 &&
        clubData.recruitment_info.links.map((link, index) => (
            <React.Fragment key={index}>
                <li className="text">
                    <a href={link} target="_blank">{link}</a>
                </li>
            </React.Fragment>
        ));

    let skillsRequired =
        clubData.club_tags.length > 0 &&
        clubData.club_tags.map((skill, index) => (
            <Skills text={skill} key={index} />
        ));

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
                {isEmailVerified && (
                  <div className="switch-buffer mobile"></div>
                )}
                    <h1 className="rec-clubname">{clubName + " Recruitments"}</h1>
                    <div className="image-section mobile">
                    <ImgContainer1 src={clubData.club_image}/>
                    <div className="skills-tags">{skillsRequired}</div>
                </div>
                <button className="rec-button mobile">
                            <Link to={`/${club}`}>Go to Club Page</Link>
                        </button>
                    <div className="button-container">
                        <h2 className="heading-1">Relevant Info</h2>
                        <button className="rec-button desktop">
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
                            tags={clubData.recruitment_info.links}
                            handleAddSkillTag={handleAddSkillTag}
                            handleEditSkillTag={handleEditSkillTag}
                            handleDeleteSkillTag={handleDeleteSkillTag}
                        />
                    )}
                    <ul className="links-ul">
                    {relevantLinks}
                    </ul>
                </div>

                <div className="image-section desktop">
                    <ImgContainer1 src={clubData.club_image} />
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
