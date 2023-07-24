import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard';
import CircularProgress from '@mui/material/CircularProgress';
export default function ClubSection() {
  const [clubCardsData, setClubCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch('https://bits-clubs.onrender.com/api/v1/clubs/')
      .then((response) => response.json())
      .then((json) => {
        setClubCardsData(json.clubs);
        setIsLoading(false)
      });
  }, []);

  const filterClubCardsData = clubCardsData.filter((club) => {
    return club.isClub;
  });

  return (
    <>
      {isLoading? <CircularProgress color='inherit'/>:filterClubCardsData.map((item, id) => (
        <ClubCard clubName={item.club_acronym} role={item.club_tags[0]} skill={item.isRecruiting ? 'Recruiting' : 'Recruitments Over'} myKey={id} img = {item.club_image} clubFullName = {item.club_name}/>
      ))}
    </>
  );
}
