import axios from "axios";
import { useEffect, useState } from "react";
import "./OnGoingRecruitmentPage.css";
import { CircularProgress } from "@mui/material";
import OngoingClubCard from "./OngoingClubCard";

export default function OnGoingRecruitmentPage() {
  const [recruitingClubs, setRecruitingClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "On Going Recruitment";
    axios
      .get(`https://bits-clubs.onrender.com/api/v1/clubs/recruitments`)
      .then((res) => {
        console.log(res.data.clubs);
        setRecruitingClubs(res.data.clubs);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="on-going-page">
      <div className="on-going-page-header">
        <h1>Ongoing Recruitment</h1>
      </div>
      <div className="recruiting-club-container">
        {isLoading ? (
          <CircularProgress size={"4rem"} />
        ) : (
          <OngoingClubCard club={recruitingClubs[0]} />
        )}
      </div>
    </div>
  );
}
