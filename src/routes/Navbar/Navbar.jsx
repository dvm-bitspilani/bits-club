import React from "react";
import "./Navbar.css";
import image from "../../Assets/Vector(1).png";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <div className="navbar-left">
            <div className="hamburger-menu-btn">
              <span className="hamline" id="hamline1"></span>
              <span className="hamline" id="hamline2"></span>
              <span className="hamline" id="hamline3"></span>
            </div>
            <div className="navbar-logo">
              <Link to="/">
                <span id="navbar-logo-bits">BITS</span>
                <span id="navbar-logo-clubs">Clubs</span>
              </Link>
            </div>
          </div>
          <div className="navbar-right">
            <ul className="navbar-right-list">
              <li>
                <Link to="/Association of Computing Machinery">[TEST ONLY] CLUB PAGE (ACM for now)</Link>
              </li>
              <li>
                <Link to="/club">CLUBS</Link>
              </li>
              <li>
                <Link to="/(club-name)/recruitments">RECRUITMENTS</Link>
              </li>
              <li>
                <Link to="/">MY PROFILE</Link>
              </li>
              <li>
                <a href="#">
                  <img src={image} alt="" width="15px" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
