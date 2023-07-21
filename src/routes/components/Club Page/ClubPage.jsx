import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import "./ClubPage.css";
import ClubPreviousEventSlide from "./components/ClubPreviousEventSlide/ClubPreviousEventSlide";
import SkillsTag from "./components/SkillsTag/SkillsTag";
import PORCard from "./components/PORHolder/PORCard";

export default function ClubPage() {
  const clubName = useParams().club.replace(/-/g, " ");

  const descriptionTextareaRef = useRef(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const [clubData, setClubData] = useState({
    name: "ACM",
    description : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod
    odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor
    vel mauris ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum
    vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris
    ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper
    sed imperdiet nunc. Integer varius tortor vel`,
    previousWorks : [
      {image : "../assets/thumbnail3.png", 
      description : "1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
      {image : "../assets/thumbnail3.png",
      description : "5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc."},
    ],
    skillsList : [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque expedita blanditiis fugiat quam illum molestiae inventore unde, soluta perferendis dolores commodi?",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque expedita blanditiis fugiat quam illum molestiae inventore unde, soluta perferendis dolores commodi?",
    ],
    skillsTags : [
      "Coding Skills",
      "Angular",
      "Competitive Coding",
      "Video Editing",
    ],
    leadership : [
      {name : "Siddharth", position : "President", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "Vice President", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "Oasis Coordinator", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "BOSM Coordinator", image : "../assets/thumbnail3.png"},
      {name : "Siddharth", position : "APOGEE Coordinator", image : "../assets/thumbnail3.png"},
    ]
  });

  // Setting the current description to the default description
  const currentDescription = clubData.description;

  // Setting the previous works to the default previous works
  const previousWorks = clubData.previousWorks.map((item, key) => {
    return (
      <ClubPreviousEventSlide key={key} description={item.description} image ={item.image}/>
    );
  });

  // Setting the skills list to the default skills list
  const skillsList = clubData.skillsList.map((item, key) => {
    return (
      <li key={key} className="club-skills-list-item">
        {item}
      </li>
    );
  });

  // Setting the skills tags to the default skills tags
  const skillsTags = clubData.skillsTags.map((item, key) => {
    return (
      <SkillsTag key={key} text={item} />
    );
  });

  // Setting the first two leadership cards to the default leadership cards
  const leadershipTop = clubData.leadership.slice(0, 2).map((item, key) => {
    return (
      <PORCard key={key} name={item.name} position={item.position} image={item.image}/>
    );
  });

  // Setting the last three leadership cards to the default leadership cards
  const leadershipBottom = clubData.leadership.slice(2, clubData.leadership.length).map((item, key) => {
    return (
      <PORCard key={key} name={item.name} position={item.position} image={item.image}/>
    );
  });


  // Setting the height of the description textarea to the height of the text when admin status changes
  useEffect(() => {
    if (isAdmin) {
      descriptionTextareaRef.current.style.height = "inherit";
      descriptionTextareaRef.current.style.height = `${descriptionTextareaRef.current.scrollHeight + 20}px`;
    }
  }, [isAdmin]);

  // Setting the height of the description textarea to the height of the text when the text changes
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 25}px`;
  };

  const handleSaveDescription = () => {
    const description = descriptionTextareaRef.current.value;
    setClubData({...clubData, description})
    alert("Description Saved")
  }

  // Club Description is editable only if the user is an admin
  let clubDescription = isAdmin ? (
    <>
      <textarea
        ref={descriptionTextareaRef}
        className="club-description-textarea"
        defaultValue={currentDescription}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button
        className="club-description-save"
        onClick={() =>
          handleSaveDescription()
        }
      >
        Save Description
      </button>
    </>
  ) : (
    <div style={{ whiteSpace: "pre-line" }}>{currentDescription}</div>
  );

  // Checking email-address to see if the user is an admin
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      if (decoded.email === "f20220598@pilani.bits-pilani.ac.in") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleTestDeleteEvent = () => {
    const tempPrevWork = clubData.previousWorks.filter((item) => {
      return item.description !== "3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc.";
    })
    setClubData({...clubData, previousWorks : tempPrevWork})
  }

  return (
    <div className="club-page">
      <button
        style={{ position: "absolute", zIndex: "2", scale: "0.7", right: "0" }}
        onClick={() => setIsAdmin(!isAdmin)}
      >
        Temp Sign In
      </button>
      <section className="club-title-container">
        <h1 className="club-title">{clubName}</h1>
      </section>
      <section className="club-description-container">
        <div className="club-description">{clubDescription}</div>
        <div className="club-description-image-container">
          <div className="club-description-image">
            <img id="club-image-img" src="/assets/NAB.png" alt="NAB" />
          </div>
        </div>
      </section>
      <section className="club-recruitment">
        <div className="club-recruitment-title">
          ACM is currently recruiting from the 2023 batch
        </div>
        <button className="club-recruitment-button">
          <Link to={`/${useParams().club}/recruitments`}>Apply Now</Link>
        </button>
      </section>
      <button onClick = {handleTestDeleteEvent}>Test Delete Event</button>
      <section className="club-previous-work">
        <div className="club-previous-work-title">Previous Work</div>
        <div className="club-previous-work-container">
          {previousWorks}
        </div>
      </section>
      <section className="club-skills-required">
        <h1 className="club-skills-required-title">Skills Required</h1>
        <div className="club-skills-required-container">
          <ul className="club-skills-list">
            {skillsList}
          </ul>
        </div>
        <div className="club-skills-tags">
          {skillsTags}
        </div>
      </section>
      <section className="club-leadership">
        <h1 className="club-skills-required-title">Leadership</h1>
        <div className="club-leadership-container">
          {leadershipTop}
        </div>
        <div className="club-leadership-container club-leadership-container-gap">
          {leadershipBottom}
        </div>
      </section>
    </div>
  );
}
