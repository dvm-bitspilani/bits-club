import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

import axios from "axios";
import jwtDecode from "jwt-decode";

import "./ClubPage.css";
import ClubPreviousEventSlide from "./components/ClubPreviousEventSlide/ClubPreviousEventSlide";
import SkillsTag from "./components/SkillsTag/SkillsTag";
import PORCard from "./components/PORHolder/PORCard";

export default function ClubPage() {
  const clubName = useParams().club.replace(/-/g, " ");

  const [clubData, setClubData] = useState({
    _id: "64baa65b54c6759b38251ea6",
    club_name: "Association Of Computing Machinery",
    club_description:
      "We are the Association for Computing Machinery (ACM), Student Chapter, Birla Institute of Technology and Science, Pilani (BITS-ACM). BITS ACM student chapter has 70 core team members and has nurtured more than 650 alumni since its inception in 2008.The objective of the chapter to promote computer science as field of education and foster a sense of innovation and creativity among computer enthusiasts. Alumni of the chapter have gone on to conduct research at top universities and create successful companies.",
    club_members: [
      {
        email: "rajclerk.2004@gmail.com",
        position: "Member",
        _id: "64baa6a854c6759b38251eaa",
      },
    ],
    club_tags: ["Coding", "Angular", "Competitive Coding", "Video Editing"],
    skills_text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu ligula augue. In vel felis acquam laoreet mollis. Aliquam mattis velit non mauris imperdiet, at eleifend odio commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Donec a ornare eros, eu vestibulum nisl. Phasellus eu pharetra orci. Aliquam mattis eu leo eget semper Suspendisse aliquam a mi in tristique.",
    ],
    club_image: "<some default value here>",
    isRecruiting: false,
    pors: [
      {
        por_holder_name: "John Doe",
        por_holder_email: "john.doe@gmail.com",
        por_title: "President",
        por_display_image: "default.jpg",
        _id: "64baa6a854c6759b38251eab",
      },
      {
        _id: "64babd5fc4e977d3a5fd2024",
        por_holder_name: "John Doe",
        por_holder_email: "john.doe@gmail.com",
        por_title: "Vice-President",
        por_display_image: "default.jpg",
      },
      {
        _id: "64babd5fc4e977d3a5fd2024",
        por_holder_name: "John Doe",
        por_holder_email: "john.doe@gmail.com",
        por_title: "BOSM-Coodinator",
        por_display_image: "default.jpg",
      },
      {
        _id: "64babd5fc4e977d3a5fd2024",
        por_holder_name: "John Doe",
        por_holder_email: "john.doe@gmail.com",
        por_title: "Oasis-Coodinator",
        por_display_image: "default.jpg",
      },
      {
        _id: "64babd5fc4e977d3a5fd2024",
        por_holder_name: "John Doe",
        por_holder_email: "john.doe@gmail.com",
        por_title: "APOGEE-Coodinator",
        por_display_image: "default.jpg",
      },
    ],
    openRecruitments: [],
    previousWork: [
      {
        name: "Checkmate",
        description: "1. Fun event hosted by BITS-ACM twice during the year",
        image: "default.jpg",
        _id: "64baa6a854c6759b38251eac",
      },
      {
        name: "Checkmate",
        description: "2. Fun event hosted by BITS-ACM twice during the year",
        image: "default.jpg",
        _id: "64baa6a854c6759b38251eac",
      },
      {
        name: "Checkmate",
        description: "3. Fun event hosted by BITS-ACM twice during the year",
        image: "default.jpg",
        _id: "64baa6a854c6759b38251eac",
      },
      {
        name: "Checkmate",
        description: "4. Fun event hosted by BITS-ACM twice during the year",
        image: "default.jpg",
        _id: "64baa6a854c6759b38251eac",
      },
      {
        name: "Checkmate",
        description: "5. Fun event hosted by BITS-ACM twice during the year",
        image: "default.jpg",
        _id: "64baa6a854c6759b38251eac",
      },
      {
        name: "Checkmate",
        description: "6. Fun event hosted by BITS-ACM twice during the year",
        image: "default.jpg",
        _id: "64baa6a854c6759b38251eac",
      },
    ],
    __v: 0,
    club_acronym: "ACM",
  });

  // Fetch and store club data in the state variable
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/clubs/${clubName.replace(/ /g, "-")}`)
      .then((res) => {
        setClubData(res.data.club);
        // console.log(clubData);
      })
      .catch((err) => console.error(err));

    // Updating the data in the api
    // axios.put(`http://localhost:8000/api/v1/clubs/${clubName.replace(/ /g, "-")}/update`, clubData)
    //   .then((res) => {
    //     console.log(res.data);
    //   }
    //   ).catch((err) => console.error(err));
  }, []);

  const descriptionTextareaRef = useRef(null);

  const [isAdmin, setIsAdmin] = useState(false);

  // Setting the current description to the default description

  const currentDescription = clubData.club_description;

  // Setting the previous works to the default previous works
  const previousWorks = clubData.previousWork.map((item, key) => {
    return (
      <ClubPreviousEventSlide
        key={key}
        description={item.description}
        image={item.image}
        onDelete={() => handleDeleteEvent(item.description)}
        onEdit={() => handleEditEvent(item)}
        isAdmin={isAdmin}
      />
    );
  });

  // Setting the skills list to the default skills list
  const skillsList = clubData.skills_text.map((item, key) => {
    return (
      <li key={key} className="club-skills-list-item">
        {item}
      </li>
    );
  });

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

  console.log(clubData);

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
        onClick={() => handleSaveDescription()}
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

  const handleDeleteEvent = (description) => {
    if (confirm("Are you sure you want to delete this event?") === false)
      return;
    const tempPrevWork = clubData.previousWork.filter((item) => {
      return item.description !== description;
    });
    setClubData({ ...clubData, previousWork: tempPrevWork });
  };

  const handleEditEvent = (event) => {
    const description = prompt("Enter the new description");
    if (description === null) return;
    const tempPrevWork = clubData.previousWork.map((item) => {
      if (item.description === event.description) {
        item.description = description;
      }
      return item;
    });
    setClubData({ ...clubData, previousWork: tempPrevWork });
    return;
  };

  const handleAddEvent = () => {
    const name = prompt("Enter the name of the event");
    if (name === null) return;
    const description = prompt("Enter the description of the event");
    if (description === null) return;
    const image = prompt("Enter the image of the event");
    if (image === null) return;
    const tempPrevWork = clubData.previousWork;
    tempPrevWork.push({ name, description, image });
    setClubData({ ...clubData, previousWork: tempPrevWork });
    return;
  };

  const handleAddSkillText = () => {
    const text = prompt("Enter the skill text");
    if (text === null) return;
    const tempSkillsText = clubData.skills_text;
    tempSkillsText.push(text);
    setClubData({ ...clubData, skills_text: tempSkillsText });
    return;
  };

  const handleAddLeaderShip = () => {
    const por_holder_name = prompt("Enter the name of the POR holder");
    if (por_holder_name === null) return;
    const por_holder_email = prompt("Enter the email of the POR holder");
    if (por_holder_email === null) return;
    const por_title = prompt("Enter the title of the POR");
    if (por_title === null) return;
    const por_display_image = prompt("Enter the image of the POR");
    if (por_display_image === null) return;
    const tempPors = clubData.pors;
    tempPors.push({
      por_holder_name,
      por_holder_email,
      por_title,
      por_display_image,
    });
    setClubData({ ...clubData, pors: tempPors });
    return;
  };

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
            <img
              id="club-image-img"
              src={clubData.club_image}
              alt="NAB"
              onError={(e) => (e.target.src = "/assets/NAB.png")}
            />
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
      <section className="club-previous-work">
        <div className="club-previous-work-title">
          Previous Work
          {isAdmin && (
            <button className="club-previous-work-add-button" onClick={handleAddEvent}>
              <img src="/assets/add.png" alt="add" />
            </button>
          )}
        </div>
        <div className="club-previous-work-container">{previousWorks}</div>
      </section>
      <section className="club-skills-required">
        <h1 className="club-skills-required-title">Skills Required{isAdmin && (
            <button className="club-previous-work-add-button" onClick={handleAddSkillText}>
              <img src="/assets/add.png" alt="add" />
            </button>
          )}</h1>
        <div className="club-skills-required-container">
          <ul className="club-skills-list">{skillsList}</ul>
        </div>
        <div className="club-skills-tags">{skillsTags}</div>
      </section>
      <section className="club-leadership">
        <h1 className="club-skills-required-title">Leadership{isAdmin && (
            <button className="club-previous-work-add-button" onClick={handleAddLeaderShip}>
              <img src="/assets/add.png" alt="add" />
            </button>
          )}</h1>
        <div className="club-leadership-container">{leadershipTop}</div>
        <div className="club-leadership-container club-leadership-container-gap">
          {leadershipBottom}
        </div>
      </section>
    </div>
  );
}
