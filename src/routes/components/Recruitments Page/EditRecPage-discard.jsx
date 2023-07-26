import React, { useRef, useEffect, useState } from "react";
import "./Recruitments.css";
import RelevantInfo from "./RelevantInfo.jsx";
import ImgContainer1 from "./ImgContainer1";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skills from "./Skills";
import Switch from "../Club Page/components/Switch";
import jwtDecode from "jwt-decode";
import "../Club Page/ClubPage.css"
import SkillTextAddModal from "../Club Page/components/Modal/SkillTextAddModal";
import SkillTextEditModal from "../Club Page/components/Modal/SkillTextEditModal";


export default function EditRecPage() {
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
        setLoading(false);
        if (localStorage.getItem("token") != null) {
          const decoded = jwtDecode(localStorage.getItem("token"));
          if (response.data.club_master_emails.includes(decoded.email)) {
            setIsEmailVerified(true)
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchClubInfo();
  }, [apiLink]);

  if (loading) {
    return <div className="loading page">Loading...</div>;
  }

  const infoTextAreaRef = useRef(null);
  // const linksTextAreaRef = useRef(null)
  // const formTextAreaRef = useRef(null)

  const [isAdmin, setIsAdmin] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isClubRecruiting, setIsClubRecruiting] = useState(false);
  const [isEditInfoModalOpen, setisEditInfoModalOpen] = useState([false, 0])
  const [isAddInfoModalOpen, setIsAddInfoModalOpen] = useState(false)
  const [isEditLinkModalOpen, setisEditLinkModalOpen] = useState([false, 0])
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false)
  const [isEditFormModalOpen, setisEditFormModalOpen] = useState([false, 0])


  useEffect(() => {
    if (isAdmin) {
      axios
        .put(
          `https://bits-clubs.onrender.com/api/v1/clubs/${clubName.replace(
            / /g,
            "-"
          )}/update`,
          clubInfo
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [clubInfo]);

  const currentState = clubInfo.isRecruiting;

  // const currentInfo = clubInfo.recruitment_info.info;
  // const currentLinks = clubInfo.recruitment_info.links;
  const currentForm = clubInfo.recruitment_form;



  if (!clubInfo.isRecruiting) {
    return (
      <div className="not-recruiting page">
        <h3>{clubName + " is currently not recruiting"}</h3>
        <button>
          {/* <Link to={`/${club}/recruitments/edit`}>Add Recruitments Info</Link> */}
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

  let relevantInfo =
    clubInfo.recruitment_info.info.length > 0 &&
    clubInfo.recruitment_info.info.map((info, index) => (
      <li>
        <RelevantInfo info={info} key={index} />
      </li>
    ));


  useEffect(() => {
    if (isAdmin) {
      infoTextAreaRef.current.style.height = "inherit";
      infoTextAreaRef.current.style.height = `${infoTextAreaRef.current.scrollHeight + 20
        }px`;
    }
  }, [isAdmin]);

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 25}px`;
  };

  const handleSaveInfo = () => {
    const info = infoTextAreaRef.current.value;
    setClubInfo({ ...clubInfo, info });
    alert("Info Saved")
  }

  let clubInfoTextArea = isAdmin ? clubInfo.recruitment_info.info.map((info, index) => (
    <div key = {index}>
    <textarea
      ref = {infoTextAreaRef}
      className = "club-description-textarea"
      defaultValue= {info}
      onKeyDown={handleKeyDown}
      onMouseDown={handleKeyDown}
      // maxLength={700}
    ></textarea>
    <button
      onClick={() => handleSaveInfo()}
    >Save</button>
    </div>
  )) : (
    <div style={{whiteSpace: "pre-line" }}>
      {relevantInfo}
    </div>
  )

  const handleEditInfoText = (info, newInfo) => {
    if (newInfo === null) return;
    const tempInfo = clubInfo.recruitment_info.map((item) => {
      if (item === info) {
        item = newInfo;
      }
      return item;
    });
    setClubInfo({ ...clubInfo, recruitment_info: tempInfo });
    return;
  };

  const handleAddInfoText = (text) => {
    const tempInfo = clubInfo.recruitment_info;
    tempInfo.push(text);
    setClubInfo({ ...clubInfo, recruitment_info: tempInfo });
    return;
  };

  const handleDeleteInfoText = (text) => {
    if (
      confirm("Are you sure you want to delete this skill description?") ===
      false
    )
      return;
    const tempInfo = clubInfo.recruitment_info.filter((item) => {
      return item !== text;
    });
    setClubInfo({ ...clubInfo, recruitment_info: tempInfo });
    return;
  };

  const handleAddInfoBox = (tag) => {
    const tempInfoBox = clubInfo.recruitment_info;
    tempInfoBox.push(tag);
    setClubInfo({ ...clubInfo, recruitment_info: tempInfoBox });
    return;
  };

  const handleEditInfoBox = (info, newInfo) => {
    if (newInfo === null) return;
    const tempInfoBox = clubInfo.recruitment_info.map((item) => {
      if (item === info) {
        item = newInfo;
      }
      return item;
    });
    setClubInfo({ ...clubInfo, recruitment_info: tempInfoBox });
    return;
  };

  // const handleEditForm = (form, newForm) => {
  //   if (newForm === null) return;
  //   const tempForm = clubInfo.recruitment_form
  //   setClubInfo({ ...clubInfo, })
  // }

  const handleDeleteInfoBox = (info) => {
    if (confirm("Are you sure you want to delete this?") === false)
      return;
    const tempInfoBox = clubInfo.recruitment_info.filter((item) => {
      return item !== info;
    });
    setClubInfo({ ...clubInfo, recruitment_info: tempInfoBox });
    return;
  };


  // function handleClickEdit() {
  //   return (
  //     <div>
  //       <EditRecPage />
  //     </div>
  //   )
  // }

  // console.log(clubInfo.recruitment_info.info);

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
          <button>
            <div onClick={handleClickEdit}>Edit this page</div>
          </button>
          <div className="button-container">
            <h2 className="heading-1">Relevant Info</h2>
            <button>
              <Link to={`/${club}`}>Go to Club Page</Link>
            </button>
          </div>
          {(
            <button
              className="club-previous-work-add-button"
              onClick={() => setIsAddInfoModalOpen(true)}
            >
              <img src="/assets/add.png" alt="add" />
            </button>
          )}
          {isAddInfoModalOpen && (
            <EventAddModal
              onClose={() => setIsAddInfoModalOpen(false)}
              handleAddEvent={handleAddInfoBox}
            />
          )}
          {isEditInfoModalOpen[0] && (
            <EventEditModal
              onClose={() => setisEditInfoModalOpen([false, 0])}
              event={clubInfo.recruitment_info[isEditInfoModalOpen[1]]}
              handleEditEvent={handleEditInfoBox}
            />
          )}

          <div className="task heading-2">Relevant Links</div>
          {relevantLinks}
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
          <iframe
            title="Embedded Google Form"
            src={clubInfo.recruitment_form}
            className="embedded-form-iframe"
          />
        </div>
      </div>
    </div>
  );
};

