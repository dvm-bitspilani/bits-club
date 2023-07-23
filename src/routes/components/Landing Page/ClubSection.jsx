// import React, { useState, useEffect} from 'react'
// import ClubCard from './ClubCard.jsx'
// export default function ClubSection() {
//   const [clubCardsData , setClubCardsData] = useState([]);
//    useEffect(()=>{
//    fetch('https://bits-clubs.onrender.com/api/v1/clubs/').then((response) => response.json()).then((json) =>{
//     setClubCardsData(json.clubs)
//   })
// },[])
// const filterClubCardsData = clubCardsData.filter((club) => {
//   // console.log(club.isClub)
//   return club.isClub;
// })
// // filterClubCardsData.map((item, id)=>{
// //   console.log(item)
// // })
// // filterClubCardsData.map((item, index)=>{
// //   console.log(item.club_acronym)
// //   })
//   return (
//     <>
//        {
//         filterClubCardsData.map((item, id)=>{
//           <ClubCard clubName = {item.club_acronym} role = 'Role' skill = 'Skill' keyAddress = {id}/>
//         })
//        }         
//     </>
//   )
// }
import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard.jsx';

export default function ClubSection() {
  const [clubCardsData, setClubCardsData] = useState([]);

  useEffect(() => {
    fetch('https://bits-clubs.onrender.com/api/v1/clubs/')
      .then((response) => response.json())
      .then((json) => {
        setClubCardsData(json.clubs);
      });
  }, []);

  const filterClubCardsData = clubCardsData.filter((club) => {
    return club.isClub;
  });

  return (
    <>
      {filterClubCardsData.map((item, id) => (
        <ClubCard clubName={item.club_acronym} role={item.club_tags[0]} skill={item.isRecruiting ? 'Recruiting' : 'Recruitments Over'} myKey={id} img = {item.club_image} />
      ))}
    </>
  );
}

// ... (ClubCard component remains the same)
