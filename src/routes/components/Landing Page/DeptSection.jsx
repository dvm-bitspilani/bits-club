// import React from 'react'
// import ClubCard from './ClubCard.jsx'
// export default function ClubSection() {
//   return (
//     <>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//                <ClubCard clubName = 'DVM' role = 'Technical' skill='Coding'/>
//     </>
//   )
// }

import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard.jsx';

export default function DeptSection() {
  const [clubCardsData, setClubCardsData] = useState([]);

  useEffect(() => {
    fetch('https://bits-clubs.onrender.com/api/v1/clubs/')
      .then((response) => response.json())
      .then((json) => {
        setClubCardsData(json.clubs);
      });
  }, []);

  const filterClubCardsData = clubCardsData.filter((club) => {
    return club.isDepartment;
  });

  return (
    <>
      {filterClubCardsData.map((item, id) => (
        <ClubCard clubName={item.club_acronym} role={item.club_tags[0]} skill={item.isRecruiting ? 'Recruiting' : 'Recruitments Over'} myKey={id} img = {item.club_image} />
      ))}
    </>
  );
}