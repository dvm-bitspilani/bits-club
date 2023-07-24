import "./Navbar.css";

import image from "../../Assets/Vector(1).png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import SignIn from "./SignIn.jsx";
import ProfileIcon from "./ProfileIcon.jsx"
export default function Navbar() {
  let hamOpened = false;
  const hamOpen = () => {
    console.log('clicked')
    if (!hamOpened) {
      document.getElementsByClassName("hamline")[0].style.opacity = "0";
      document.getElementsByClassName("hamline")[3].style.opacity = "0";
      document.getElementsByClassName("hamline")[1].style.transform = "rotate(45deg)";
      document.getElementsByClassName("hamline")[2].style.transform = "rotate(-45deg)";
      document.getElementsByClassName("hamburger-menu-opened")[0].style.opacity = "1";
      document.getElementsByClassName("hamburger-menu-opened")[0].style.top = "0";
      // let hamlines = document.getElementsByClassName("hamline");
      // for (let line of hamlines) {
      //   line.style.background = "#000";
      // }
      hamOpened = true;
    }
    else {
      document.getElementsByClassName("hamline")[0].style.opacity = "1";
      document.getElementsByClassName("hamline")[3].style.opacity = "1";
      document.getElementsByClassName("hamline")[1].style.transform = "rotate(0deg)";
      document.getElementsByClassName("hamline")[2].style.transform = "rotate(0deg)";
      document.getElementsByClassName("hamburger-menu-opened")[0].style.opacity = "0";
      document.getElementsByClassName("hamburger-menu-opened")[0].style.top = "-100%";
      // let hamlines = document.getElementsByClassName("hamline");
      // for (let line of hamlines) {
      //   line.style.background = "#fff";
      // }
      hamOpened = false;
    }
  };
  const closeHamMenu = ()=>{
    document.getElementsByClassName("hamline")[0].style.opacity = "1";
    document.getElementsByClassName("hamline")[3].style.opacity = "1";
    document.getElementsByClassName("hamline")[1].style.transform = "rotate(0deg)";
    document.getElementsByClassName("hamline")[2].style.transform = "rotate(0deg)";
    document.getElementsByClassName("hamburger-menu-opened")[0].style.opacity = "0";
    document.getElementsByClassName("hamburger-menu-opened")[0].style.top = "-100%";
  }
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
            <div className="hamburger-menu-btn" onClick={hamOpen}>
              <span className="hamline" id="hamline1"></span>
              <span className="hamline" id="hamline2"></span>
              <span className="hamline" id="hamline3"></span>
              <span className="hamline" id="hamline4"></span>
            </div>
            <div className="navbar-logo"onClick={closeHamMenu}>
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
              <li id="navbar-search-btn-item"onClick={closeHamMenu}>
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
        <div className="hamburger-menu-opened">
        <div className="navbar-right22">
                            <div className="navbar-right-list">
                                <ul className="navbar-right-list-ul2 flexcolumn">
          
              <li id="navbar-profile-item1" onClick={closeHamMenu}>
                
                {userCredentials ? (
                  <ProfileIcon userCredentials={userCredentials} />
                ) : (
                  <SignIn/>
                )}
              </li>
          <li id="navbar-test-item1"onClick={closeHamMenu}>
                <Link to="/Association-Of-Computing-Machinery">
                  [TEST ONLY] CLUB PAGE (ACM)
                </Link>
              </li>
              <li id="navbar-clubs-item1"onClick={closeHamMenu}>
                <Link to="/club">CLUBS</Link>
              </li>
              <li id="navbar-recruitments-item1"onClick={closeHamMenu}>
                <Link to="/(club-name)/recruitments">RECRUITMENTS</Link>
              </li>
              <li id="navbar-recruitments-item1"onClick={closeHamMenu}>
                <Link to="/Department-of-Visual-Media/recruitments">DVM recs test</Link>
              </li>
          </ul>
        </div>
        </div>
        </div>
    
      </nav>
    </>
  );
}
