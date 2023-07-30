import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import http from '../../../http-common'
export default function DeptSection() {
  const [clubCardsData, setClubCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    http.get('/clubs/')
      .then((response)=> {
        setClubCardsData(response.data.clubs);
        setIsLoading(false)
      });
  }, []);

  const filterClubCardsData = clubCardsData.filter((club) => {
    return club.isDepartment;
  });

  return (
    <>
      {isLoading ? <CircularProgress color='inherit'/>:filterClubCardsData.map((item, id) => (
        <ClubCard clubName={item.club_acronym} role={item.club_tags[0]} skill={item.isRecruiting ? 'Recruiting' : 'Recruitments Over'} myKey={id} img = {item.club_image} clubFullName = {item.club_name}/>
      ))}
    </>
  );
}
