import "./Navbar.css";

import image from "../../Assets/Vector(1).png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import SignIn from "./SignIn.jsx";
import ProfileIcon from "./ProfileIcon.jsx"
export default function Navbar() {
  const openSearchInputBox = () => {
    document
      .getElementById("navbar-search-input-item")
      .classList.toggle("hiddenDisplay");
    document
      .getElementById("navbar-test-item")
      .classList.toggle("hiddenDisplay");
    document
      .getElementById("navbar-clubs-item")
      .classList.toggle("hiddenDisplay");
    document
      .getElementById("navbar-recruitments-item")
      .classList.toggle("hiddenDisplay");
    document
      .getElementById("navbar-profile-item")
      .classList.toggle("hiddenDisplay");
    document
      .getElementsByClassName("navbar-logo")[0]
      .classList.toggle("hiddenDisplay");
    document
      .getElementsByClassName("hamburger-menu-btn")[0]
      .classList.toggle("hiddenDisplay");
  };
  const [userCredentials, setUserCredentials] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      var decoded = jwtDecode(localStorage.getItem("token"));
      setUserCredentials(decoded);
    }
  },[]);

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
              <li id="navbar-test-item">
                <Link to="/Association-Of-Computing-Machinery">
                  [TEST ONLY] CLUB PAGE (ACM)
                </Link>
              </li>
              <li id="navbar-clubs-item">
                <Link to="/club">CLUBS</Link>
              </li>
              <li id="navbar-recruitments-item">
                <Link to="/(club-name)/recruitments">RECRUITMENTS</Link>
              </li>
              <li id="navbar-recruitments-item">
                <Link to="/Department-of-Visual-Media/recruitments">DVM recs test</Link>
              </li>
              <li id="navbar-search-btn-item">
                <Link to="/searchpage">
                  <img
                    src={image}
                    alt=""
                    width="15px"
                    // onClick={openSearchInputBox}
                  />
                </Link>
              </li>
              <li id="navbar-profile-item">
                {/* If userJWT is not null, then profile will be showed, otherwise the signin button will be shown */}
                {userCredentials ? (
                  <ProfileIcon userCredentials={userCredentials} />
                ) : (
                  <SignIn/>
                )}
              </li>
              {/* <li id="navbar-search-input-item" className="hiddenDisplay">
                <input
                  type="text"
                  placeholder="Search"
                  className="navbar-search-input-box"
                />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
