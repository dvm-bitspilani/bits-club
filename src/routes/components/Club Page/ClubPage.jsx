import { Link, useParams } from "react-router-dom";
import { useRef, useEffect } from "react";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import "swiper/swiper-bundle.css";
// register Swiper custom elements
register();

import "./ClubPage.css";
import ClubPreviousEventSlide from "./components/ClubPreviousEventSlide/ClubPreviousEventSlide";
import SkillsTag from "./components/SkillsTag/SkillsTag";
import PORCard from "./components/PORHolder/PORCard";

export default function ClubPage() {
  const clubName = useParams().club;

  // Styling the prev and next buttons this way since they cant
  // be accessed outside of their VDOM (or smthn like that)
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      // pagination: true,
      injectStyles:[
        `
        .swiper-button-next{
          right: -10%;
        }
        .swiper-button-prev{
          left: -10%;
        }
        `
      ]
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <div className="club-page">
      <section className="club-title-container">
        <h1 className="club-title">{clubName}</h1>
      </section>
      <section className="club-description-container">
        <div className="club-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod
          odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor
          vel mauris ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum
          vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris
          ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper
          sed imperdiet nunc. Integer varius tortor vel
        </div>
        <div className="club-description-image-container" />
      </section>
      <section className="club-recruitment">
        <div className="club-recruitment-title">
          ACM is currently recruiting from the 2023 batch
        </div>
        <button className="club-recruitment-button">
          <Link to={`/${clubName}/recruitments`}>Apply Now</Link>
        </button>
      </section>
      <section className="club-previous-work">
        <div className="club-previous-work-title">Previous Work</div>
        <swiper-container
        ref={swiperRef}
          slides-per-view="4"
          init = "false"
          speed="500"
          // navigation="true"
          // pagination="true"
          // scrollbar="true"
          space-between="50"
          update-on-window-resize="true"
          style={{ marginBlock: "2rem" , overflow : "visible", width : "80%", marginInline: "auto"}}
        >
          <swiper-slide>
            <ClubPreviousEventSlide />
          </swiper-slide>
          <swiper-slide>
            <ClubPreviousEventSlide />
          </swiper-slide>
          <swiper-slide>
            <ClubPreviousEventSlide />
          </swiper-slide>
          <swiper-slide>
            <ClubPreviousEventSlide />
          </swiper-slide>
          <swiper-slide>
            <ClubPreviousEventSlide />
          </swiper-slide>
          <swiper-slide>
            <ClubPreviousEventSlide />
          </swiper-slide>
        </swiper-container>
      </section>
      <section className="club-skills-required">
        <h1 className="club-skills-required-title">Skills Required</h1>
        <div className="club-skills-required-container">
          <ul className="club-skills-list">
            <li className="club-skills-list-item">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloremque expedita blanditiis fugiat quam illum molestiae
              inventore unde, soluta perferendis dolores commodi?
            </li>
            <li className="club-skills-list-item">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
              dignissimos tempora asperiores ab consequuntur?
            </li>
          </ul>
        </div>
        <div className="club-skills-tags">
          <SkillsTag text="Coding Skills" />
          <SkillsTag text="Angular" />
          <SkillsTag text="Competitive Coding" />
          <SkillsTag text="Video Editing" />
        </div>
      </section>
      <section className="club-leadership">
        <h1 className="club-skills-required-title">Leadership</h1>
        <div className="club-leadership-container">
          <PORCard
            name="Siddharth"
            position="President"
            image="./assets/thumbnail3.png"
          />
          <PORCard
            name="Siddharth"
            position="Vice President"
            image="./assets/thumbnail3.png"
          />
        </div>
        <div className="club-leadership-container">
          <PORCard
            name="Siddharth"
            position="Oasis Coordinator"
            image="./assets/thumbnail3.png"
          />
          <PORCard
            name="Siddharth"
            position="BOSM Coordinator"
            image="./assets/thumbnail3.png"
          />
          <PORCard
            name="Siddharth"
            position="APOGEE Coordinator"
            image="./assets/thumbnail3.png"
          />
        </div>
      </section>
    </div>
  );
}
