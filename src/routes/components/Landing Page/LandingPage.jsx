 import "./LandingPage.css";
 import "./ClubCard.jsx";
 import ClubSection from "./ClubSection.jsx";
 import DeptSection from "./DeptSection.jsx";
 import barImage from "../../../Assets/Scroll.png";
//  import scrollPositionImage from "../../../Assets/Subtract.png";
 import { useEffect, useState } from "react";
 import jwtDecode from "jwt-decode";
 import { Link } from "react-router-dom";
 import { GoogleLogin } from '@react-oauth/google';



export default function LandingPage() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [clubsShow, setClubsShow] = useState(true);
  const [deptShow, setDeptShow] = useState(false);

  useEffect(() => {

    if (localStorage.getItem("token")) {
      var decoded = jwtDecode(localStorage.getItem("token"));
      setUserCredentials(decoded);
    }
  }, []);

  const colorChangeClubs = (e) => {
    e.preventDefault();
    setClubsShow(true);
    setDeptShow(false);
    if (
      document.querySelector("#second-landing-page-clubs-link").style.color ===
      "white"
    ) {
      document.querySelector(
        "#second-landing-page-departments-link"
      ).style.color = "rgba(255, 255, 255, 0.237)";
    } else {
      document.querySelector("#second-landing-page-clubs-link").style.color =
        "white";
      document.querySelector(
        "#second-landing-page-departments-link"
      ).style.color = "rgba(255, 255, 255, 0.237)";
    }
  };

  const colorChangeDepartments = (e) => {
    e.preventDefault();
    setClubsShow(false);
    setDeptShow(true);
    if (
      document.querySelector("#second-landing-page-departments-link").style
        .color === "white"
    ) {
      document.querySelector("#second-landing-page-clubs-link").style.color =
        "rgba(255, 255, 255, 0.237)";
    } else {
      document.querySelector(
        "#second-landing-page-departments-link"
      ).style.color = "white";
      document.querySelector("#second-landing-page-clubs-link").style.color =
        "rgba(255, 255, 255, 0.237)";
    }
  };

  return (
    <>
      <div className="container">
        <div className="first-landing-page-wrapper">
          <div className="first-landing-page-left">
            <div className="landing-page-large-text-wrapper">
              <span className="first-landing-page-bits">BITS</span>
              <span className="first-landing-page-clubs">Clubs</span>
            </div>
            <div className="first-landing-page-small-text-wrapper">
              <p className="first-landing-page-small-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis.
              </p>
            </div>
            <div className="first-landing-page-sign-in">
              {!userCredentials ? (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    localStorage.setItem('token', credentialResponse.credential);
                    window.location.reload();
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                  size="medium"
                  ux_mode="popup"
                  render={({ onClick }) => (
                    <button
                      className="first-landing-page-sign-in-btn"
                      onClick={onClick}
                    >
                      Sign in
                    </button>
                  )}
                />
              ) : null}
            </div>
          </div>
          <div className="first-landing-page-right">
            <div className="first-landing-page-events">
              <div className="landing-page-events-wrapper">
                <div className="landing-page-events-text">Events</div>
                <p className="landing-page-events-para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  euismod odio a ipsum vehicula semper sed imperdiet nunc.
                  Integer varius tortor vel mauris
                </p>
                <button className="first-landing-page-events-explore-btn">
                  <Link to="/Events">Explore</Link>
                </button>
              </div>
            </div>
            <div className="first-landing-page-recruitments">
              <div className="landing-page-recruitments-wrapper">
                <span className="landing-page-recruitments-text">
                  Recruitments
                </span>
                <p className="landing-page-recruitments-para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  euismod odio a ipsum vehicula semper sed imperdiet nunc.
                  Integer varius tortor vel mauris
                </p>
                <button className="first-landing-page-recruitments-explore-btn">
                  <Link to="/ongoing-recruitments"> Explore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second-landing-page">
        <div className="second-landing-page-wrapper">
          <div className="second-landing-page-links">
            <a
              href="#"
              id="second-landing-page-clubs-link"
              onClick={colorChangeClubs}
            >
              Clubs
            </a>
            <a
              href="#"
              id="second-landing-page-departments-link"
              onClick={colorChangeDepartments}
            >
              Departments
            </a>
          </div>
          <div className="second-landing-page-cards-scrollbar-wrapper">
            <div className="second-landing-page-cards-wrapper">
                  {clubsShow && <ClubSection />}
                  {deptShow && <DeptSection />}
                  
            </div>
             {/* <div className="second-landing-page-scrollbar-wrapper">
                 <img src={barImage} alt="scrollBar" id='scrollbar-image'/>
                 <img src={scrollPositionImage} alt="scrollThumb" id='scrollthumb-image' />
              </div>  */}
          </div>
        </div>
      </div>
    </>
  );
}
