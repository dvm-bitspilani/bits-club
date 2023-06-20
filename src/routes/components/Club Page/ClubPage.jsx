import { Link, useParams } from "react-router-dom";

import "./ClubPage.css";

export default function ClubPage() {
  const clubName = useParams().club;

  return (
    <div className="club-page">
      <section className="club-title-container">
        <div className="club-title">{clubName}</div>
      </section>
      <section className="club-description-container">
        <div className="club-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris ultricies, vitae accumsan neque rutrum..Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel
        </div>
        <div className="club-description-image-container" />
      </section>
      <section className="club-recruitment">
        <div className="club-recruitment-title">ACM is currently recruiting from the 2023 batch</div>
        <button className="club-recruitment-button"><Link to = {`/${clubName}/recruitments`}>Apply Now</Link></button>
      </section>
      <section className="club-previous-work">
        <div className="club-previous-work-title">Previous Work</div>
      </section>
    </div>
  );
}
