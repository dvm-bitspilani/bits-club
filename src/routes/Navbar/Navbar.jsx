import React from "react";
import "./Navbar.css";
import image from "../../Assets/Vector(1).png";
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
              <span id="navbar-logo-bits">BITS</span>
              <span id="navbar-logo-clubs">Clubs</span>
            </div>
          </div>
          <div className="navbar-right">
            <ul className="navbar-right-light">
                <li><a href="#">Clubs</a></li>
                <li><a href="#">Requirements</a></li>
                <li><a href="#">My Profile</a></li>
                <li><a href="#"><img src={image} alt="" /></a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
