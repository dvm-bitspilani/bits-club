// import React from 'react'
// export default function DeptCard(props) {
//   return (
//     <>
//      <div className="landing-page-card">
//                     <span className='landing-page-card-club-name'>{props.deptName}</span>
//                     <div className="role-skill-wrapper">
//                     <span className='landing-page-card-role-type'>{props.role}</span>
//                     <span className='landing-page-card-skill-name'>{props.skill}</span>
//                     </div>
//                 </div>
//     </>
//   )
// }

import React from 'react';

export default function ClubCard(props) {
  return (
    <div className="landing-page-card" style={{ backgroundImage: `url(${props.img})` }}>
      <span className="landing-page-card-club-name">{props.clubName}</span>
      <div className="role-skill-wrapper">
        <span className="landing-page-card-role-type">{props.role}</span>
        <span className="landing-page-card-skill-name">{props.skill}</span>
      </div>
    </div>
  );
}