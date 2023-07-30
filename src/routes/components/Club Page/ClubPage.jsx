import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

import http from "../../../http-common.js"
import jwtDecode from "jwt-decode";

import "./ClubPage.css";

import ClubPreviousEventSlide from "./components/ClubPreviousEventSlide/ClubPreviousEventSlide";
import SkillsTag from "./components/SkillsTag/SkillsTag";
import PORCard from "./components/PORHolder/PORCard";
import Switch from "./components/Switch/Switch";

import EventEditModal from "./components/Modal/EventEditModal";
import EventAddModal from "./components/Modal/EventAddModal";
import SkillTextAddModal from "./components/Modal/SkillTextAddModal";
import SkillTextEditModal from "./components/Modal/SkillTextEditModal";
import PORAddModal from "./components/Modal/PORAddModal";
import POREditModal from "./components/Modal/POREditModal";

export default function ClubPage() {
  const clubName = useParams().club.replace(/-/g, " ");

  const [clubData, setClubData] = useState({
    _id: "",
    club_name: "",
    club_description:
      "",
    club_members: [],
    club_tags: [],
    skills_text: [
      "",
    ],
    club_image: "",
    isRecruiting: false,
    pors: [],
    openRecruitments: [],
    previous_work: [],
    __v: 0,
    club_acronym: "",
    recruiting_message: "",
  });

  // Fetch and store club data in the state variable
  useEffect(() => {
    http
      .get(
        `/clubs/${clubName.replace(
          / /g,
          "-"
        )}`
      )
      .then((res) => {
        console.log('hi')
        setClubData(res.data.club);
        console.log(res.data.club);
        if (localStorage.getItem("token") != null) {
          const decoded = jwtDecode(localStorage.getItem("token"));
          if (res.data.club.club_master_emails.includes(decoded.email)) {
            setIsEmailVerified(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const descriptionTextareaRef = useRef(null);
  const clubImageRef = useRef(null);
  const clubImageInputRef = useRef(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isEditEventModalOpen, setisEditEventModalOpen] = useState([false, 0]);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isAddSkillTextModalOpen, setIsAddSkillTextModalOpen] = useState(false);
  const [isEditSkillTextModalOpen, setIsEditSkillTextModalOpen] = useState([
    false,
    0,
  ]);
  const [isAddLeaderShipModalOpen, setIsAddLeaderShipModalOpen] =
    useState(false);
  const [isEditLeaderShipModalOpen, setIsEditLeaderShipModalOpen] = useState([
    false,
    0,
  ]);

  useEffect(() => {
    if (isAdmin) {
      http
        .put(
          `/clubs/${clubName.replace(
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

  // Setting the current description to the default description

  const currentDescription = clubData.club_description;

  const recruitmentMessage = clubData.recruiting_message;

  // Setting the previous works to the default previous works
  const previous_works = clubData.previous_work.map((item, key) => {
    return (
      <div key={key}>
        <ClubPreviousEventSlide
          description={item.description}
          image={item.image}
          onDelete={() => handleDeleteEvent(item.description)}
          onEdit={() => setisEditEventModalOpen([true, key])}
          isAdmin={isAdmin}
        />
      </div>
    );
  });

  // console.log(clubData.previous_work);

  // Setting the skills list to the default skills list
  const skillsList = clubData.skills_text.map((item, key) => {
    return (
      <li key={key} className="club-skills-list-item">
        {isAdmin && (
          <>
            <button
              className="club-skills-list-item-delete"
              onClick={() => handleDeleteSkillText(item)}
            >
              <img src="/assets/delete.png" alt="delete" />
            </button>
            <button
              className="club-skills-list-item-edit"
              onClick={() => setIsEditSkillTextModalOpen([true, key])}
            >
              <img src="/assets/edit_icon.png" alt="edit" />
            </button>
          </>
        )}
        {item}
      </li>
    );
  });

  // console.log(isEditSkillTextModalOpen);

  // Setting the skills tags to the default skills tags
  const skillsTags = clubData.club_tags.map((item, key) => {
    return <SkillsTag key={key} text={item} />;
  });

  // Setting the first two leadership cards to the default leadership cards
  const leadershipTop = clubData.pors.slice(0, 2).map((item, key) => {
    return (
      <PORCard
        key={key}
        name={item.por_holder_name}
        position={item.por_title}
        image={item.por_display_image}
        onDelete={() => handleDeleteLeaderShip(item.por_title)}
        onEdit={() => setIsEditLeaderShipModalOpen([true, key])}
        isAdmin={isAdmin}
      />
    );
  });

  // Setting the last three leadership cards to the default leadership cards
  const leadershipBottom = clubData.pors
    .slice(2, clubData.pors.length)
    .map((item, key) => {
      return (
        <PORCard
          key={key}
          name={item.por_holder_name}
          position={item.por_title}
          image={item.por_display_image}
          onDelete={() => handleDeleteLeaderShip(item.por_title)}
          onEdit={() => setIsEditLeaderShipModalOpen([true, key + 2])}
          isAdmin={isAdmin}
        />
      );
    });

  // Setting the height of the description textarea to the height of the text when admin status changes
  useEffect(() => {
    if (isAdmin) {
      descriptionTextareaRef.current.style.height = "inherit";
      descriptionTextareaRef.current.style.height = `${
        descriptionTextareaRef.current.scrollHeight + 20
      }px`;
    }
  }, [isAdmin]);

  // Setting the height of the description textarea to the height of the text when the text changes
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 25}px`;
  };

  const handleSaveDescription = () => {
    const club_description = descriptionTextareaRef.current.value;
    setClubData({ ...clubData, club_description });
    alert("Description Saved");
  };

  // Club Description is editable only if the user is an admin
  let clubDescription = isAdmin ? (
    <>
      <textarea
        ref={descriptionTextareaRef}
        className="club-description-textarea"
        defaultValue={currentDescription}
        onKeyDown={handleKeyDown}
        onMouseDown={handleKeyDown}
        maxLength={700}
      ></textarea>
      <button
        className="club-description-save"
        onClick={() => handleSaveDescription()}
      >
        Save Description
      </button>
    </>
  ) : (
    <div style={{ whiteSpace: "pre-line" }}>{currentDescription}</div>
  );

  const handleDeleteEvent = (description) => {
    if (confirm("Are you sure you want to delete this event?") === false)
      return;
    const tempPrevWork = clubData.previous_work.filter((item) => {
      return item.description !== description;
    });
    setClubData({ ...clubData, previous_work: tempPrevWork });
  };

  const handleEditEvent = (event, newName, newDescription, newImg) => {
    if (newName === null || newDescription === null) return;
    const tempPrevWork = clubData.previous_work.map((item) => {
      if (item.description === event.description) {
        item.description = newDescription;
        item.name = newName;
        item.image = newImg ? newImg : item.image;
      }
      return item;
    });
    setClubData({ ...clubData, previous_work: tempPrevWork });
    return;
  };

  const handleAddEvent = (name, description, image) => {
    const tempPrevWork = clubData.previous_work;
    tempPrevWork.push({ name, description, image });
    setClubData({ ...clubData, previous_work: tempPrevWork });
    return;
  };

  const handleAddSkillText = (text) => {
    const tempSkillsText = clubData.skills_text;
    tempSkillsText.push(text);
    setClubData({ ...clubData, skills_text: tempSkillsText });
    return;
  };

  const handleDeleteSkillText = (text) => {
    if (
      confirm("Are you sure you want to delete this skill description?") ===
      false
    )
      return;
    const tempSkillsText = clubData.skills_text.filter((item) => {
      return item !== text;
    });
    setClubData({ ...clubData, skills_text: tempSkillsText });
    return;
  };

  const handleEditSkillText = (skill, newskill) => {
    if (newskill === null) return;
    const tempSkillsText = clubData.skills_text.map((item) => {
      if (item === skill) {
        item = newskill;
      }
      return item;
    });
    setClubData({ ...clubData, skills_text: tempSkillsText });
    return;
  };

  const handleAddSkillTag = (tag) => {
    const tempSkillsTag = clubData.club_tags;
    tempSkillsTag.push(tag);
    setClubData({ ...clubData, club_tags: tempSkillsTag });
    return;
  };

  const handleEditSkillTag = (skill, newskill) => {
    if (newskill === null) return;
    const tempSkillsTag = clubData.club_tags.map((item) => {
      if (item === skill) {
        item = newskill;
      }
      return item;
    });
    setClubData({ ...clubData, club_tags: tempSkillsTag });
    return;
  };

  const handleDeleteSkillTag = (skill) => {
    if (confirm("Are you sure you want to delete this skill tag?") === false)
      return;
    const tempSkillsTag = clubData.club_tags.filter((item) => {
      return item !== skill;
    });
    setClubData({ ...clubData, club_tags: tempSkillsTag });
    return;
  };

  const handleAddLeaderShip = (
    por_holder_name,
    por_holder_email,
    por_title,
    por_display_image
  ) => {
    console.log(
      por_holder_name,
      por_holder_email,
      por_title,
      por_display_image
    );
    const tempPors = clubData.pors;
    tempPors.push({
      por_holder_name,
      por_holder_email,
      por_title,
      por_display_image,
    });
    console.log(tempPors);
    setClubData({ ...clubData, pors: tempPors });
    return;
  };

  const handleEditLeaderShip = (
    POR,
    por_holder_name,
    por_holder_email,
    por_title,
    por_display_image
  ) => {
    if (
      por_holder_name === null ||
      por_holder_email === null ||
      por_title === null
    )
      return;
    console.log(POR);
    const tempPors = clubData.pors.map((item) => {
      if (item.por_title === POR.por_title) {
        item.por_holder_name = por_holder_name;
        item.por_holder_email = por_holder_email;
        item.por_title = por_title;
        item.por_display_image = por_display_image
          ? por_display_image
          : item.por_display_image;
      }
      return item;
    });
    setClubData({ ...clubData, pors: tempPors });
    return;
  };

  const handleDeleteLeaderShip = (por_title) => {
    if (confirm("Are you sure you want to delete this POR?") === false) return;
    const tempPors = clubData.pors.filter((item) => {
      return item.por_title !== por_title;
    });
    setClubData({ ...clubData, pors: tempPors });
    return;
  };

  const handleClubImageUpload = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    http
      .post("/uploadImage", formData)
      .then((res) => {
        setClubData({ ...clubData, club_image: res.data.img_path });
        alert("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Image Upload Failed");
      });
  };


  return (
    <div className="club-page">
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
      <section className="club-title-container">
        <h1 className="club-title">{clubName}</h1>
      </section>
      <section className="club-description-container">
        <div className="club-description">{clubDescription}</div>
        <div className="club-description-image-container">
          <div className="club-description-image">
            <div
              className="club-description-image-wrapper"
              onMouseEnter={() => {
                clubImageRef.current.style.visibility = "visible";
              }}
              onMouseLeave={() => {
                clubImageRef.current.style.visibility = "hidden";
              }}
            >
              <img
                id="club-image-img"
                src={clubData.club_image}
                alt="Club Image"
                onError={(e) => (e.target.src = "/assets/NAB.png")}
              />
              {isAdmin && (
                <>
                <button ref={clubImageRef} className="club-image-edit-button" onClick={()=>clubImageInputRef.current.click()}>
                  <img src="/assets/edit_icon.png" alt="edit" />
                </button>
                <input type="file" style={{display : "none"}} ref={clubImageInputRef} onChange={handleClubImageUpload}/>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {clubData.isRecruiting && (
        <section className="club-recruitment">
          <div className="club-recruitment-title">{recruitmentMessage}</div>
          <button className="club-recruitment-button">
            <Link to={`/${clubName.replace(/ /g, "-")}/recruitments`}>
              Apply Now
            </Link>
          </button>
        </section>
      )}
      <section className="club-previous-work">
        <div className="club-previous-work-title">
          Previous Work
          {isAdmin && (
            <button
              className="club-previous-work-add-button"
              onClick={() => setIsAddEventModalOpen(true)}
            >
              <img src="/assets/add.png" alt="add" />
            </button>
          )}
          {isAddEventModalOpen && (
            <EventAddModal
              onClose={() => setIsAddEventModalOpen(false)}
              handleAddEvent={handleAddEvent}
            />
          )}
          {isEditEventModalOpen[0] && (
            <EventEditModal
              onClose={() => setisEditEventModalOpen([false, 0])}
              event={clubData.previous_work[isEditEventModalOpen[1]]}
              handleEditEvent={handleEditEvent}
            />
          )}
        </div>
        <div className="club-previous-work-container">{previous_works}</div>
      </section>
      <section className="club-skills-required">
        <h1 className="club-skills-required-title">
          Skills Required
          {isAdmin && (
            <button
              className="club-previous-work-add-button"
              onClick={() => setIsAddSkillTextModalOpen(true)}
            >
              <img src="/assets/add.png" alt="add" />
            </button>
          )}
          {isAddSkillTextModalOpen && (
            <SkillTextAddModal
              onClose={() => setIsAddSkillTextModalOpen(false)}
              handleAddSkill={handleAddSkillText}
              tags={clubData.club_tags}
              handleAddSkillTag={handleAddSkillTag}
              handleEditSkillTag={handleEditSkillTag}
              handleDeleteSkillTag={handleDeleteSkillTag}
            />
          )}
          {isEditSkillTextModalOpen[0] && (
            <SkillTextEditModal
              onClose={() => setIsEditSkillTextModalOpen([false, 0])}
              skill={clubData.skills_text[isEditSkillTextModalOpen[1]]}
              handleEditEvent={handleEditSkillText}
            />
          )}
        </h1>
        <div className="club-skills-required-container">
          <ul className="club-skills-list">{skillsList}</ul>
        </div>
        <div className="club-skills-tags">{skillsTags}</div>
      </section>
      <section className="club-leadership">
        <h1 className="club-skills-required-title">
          Leadership
          {isAdmin && (
            <button
              className="club-previous-work-add-button"
              onClick={() => setIsAddLeaderShipModalOpen(true)}
            >
              <img src="/assets/add.png" alt="add" />
            </button>
          )}
          {isAddLeaderShipModalOpen && (
            <PORAddModal
              onClose={() => setIsAddLeaderShipModalOpen(false)}
              handleAddPOR={handleAddLeaderShip}
            />
          )}
          {isEditLeaderShipModalOpen[0] && (
            <POREditModal
              onClose={() => setIsEditLeaderShipModalOpen([false, 0])}
              POR={clubData.pors[isEditLeaderShipModalOpen[1]]}
              handleEditPOR={handleEditLeaderShip}
            />
          )}
        </h1>
        <div className="club-leadership-container">{leadershipTop}</div>
        <div className="club-leadership-container club-leadership-container-gap">
          {leadershipBottom}
        </div>
      </section>
    </div>
  );
}
