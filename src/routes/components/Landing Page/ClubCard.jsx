import React from 'react';
import { Link } from 'react-router-dom';

export default function ClubCard(props) {
  return (
    <Link to={props.clubFullName.replace(/ /g, "-")}>
      <div
        className="landing-page-card"
        style={{ backgroundImage: `url(${props.img})` }}
      >
        <span className="landing-page-card-club-name">{props.clubName}</span>
        <div className="role-skill-wrapper">
          <span className="landing-page-card-role-type">{props.role}</span>
          <span className="landing-page-card-skill-name">{props.skill}</span>
        </div>
      </div>
    </Link>
  );
}
