import "./OngoingRecruitmentPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SkillsTag from "../Club Page/components/SkillsTag/SkillsTag";

export default function OngoingClubCard({ club }) {
  // const width = window.innerWidth;
  // console.log(width);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ongoing-club-card">
      <div className="ongoing-club-heading">
        <h2>{club.club_name}</h2>
        <h2>20/3/2023</h2>
        <Link to={`/${club.club_name.replace(/ /g, "-")}/recruitments`}>
          <button>Apply Now</button>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="39"
              viewBox="0 0 40 39"
              fill="none"
            >
              <path
                d="M13.5417 24.375L20.0083 18.07L26.475 24.375C27.125 25.0088 28.175 25.0088 28.825 24.375C29.475 23.7413 29.475 22.7175 28.825 22.0838L21.175 14.625C20.8636 14.3207 20.4409 14.1497 20 14.1497C19.5591 14.1497 19.1364 14.3207 18.825 14.625L11.175 22.0838C10.525 22.7175 10.525 23.7413 11.175 24.375C11.825 24.9925 12.8917 25.0088 13.5417 24.375Z"
                fill="#3E7CB1"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
            >
              <path
                d="M14.1705 15L20.6372 21.4667L27.1039 15C27.7539 14.35 28.8039 14.35 29.4539 15C30.1039 15.65 30.1039 16.7 29.4539 17.35L21.8039 25C21.1539 25.65 20.1039 25.65 19.4539 25L11.8039 17.35C11.4918 17.0386 11.3164 16.6159 11.3164 16.175C11.3164 15.7341 11.4918 15.3114 11.8039 15C12.4539 14.3667 13.5205 14.35 14.1705 15Z"
                fill="#3E7CB1"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen && (<>
        <div className="ongoing-club-description">
          <p>{club.club_description}</p>
        </div>
        <div className="ongoing-club-last">
            <div className="ongoing-club-tags">
                {club.club_tags.map((tag, key) => (
                    <SkillsTag key={key} text={tag} />
                ))}
            </div>
            <Link to={`/${club.club_name.replace(/ /g, "-")}`}><button>Go to Club Page</button></Link>
        </div>
        </>
      )}
    </div>
  );
}
