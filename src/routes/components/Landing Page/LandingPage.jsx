import './LandingPage.css'
import './ClubCard.jsx'
import ClubCard from './ClubCard.jsx'
export default function LandingPage() {
    return (
        <>
        <div className="container">
            <div className="first-landing-page-wrapper">
                <div className="first-landing-page-left">
                    <div className="landing-page-large-text-wrapper">
                        <span className='first-landing-page-bits'>BITS</span>
                        <span className='first-landing-page-clubs'>Clubs</span>
                    </div>
                    <div className="first-landing-page-small-text-wrapper">
                        <p className='first-landing-page-small-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
                            </p>
                    </div>
                    <div className="first-landing-page-sign-in">
                        <button className='first-landing-page-sign-in-btn'>Sign in</button>
                    </div>
                </div>
                <div className="first-landing-page-right">
                    <div className="first-landing-page-events">
                        <div className="landing-page-events-wrapper">
                            <span className="landing-page-events-text">
                                Events
                            </span>
                            <p className='landing-page-events-para'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris 
                            </p>
                            <button className="first-landing-page-events-explore-btn">
                                Explore
                            </button>
                        </div>
                    </div>
                    <div className="first-landing-page-recruitments">
                    <div className="landing-page-recruitments-wrapper">
                            <span className="landing-page-recruitments-text">
                                Events
                            </span>
                            <p className='landing-page-recruitments-para'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod odio a ipsum vehicula semper sed imperdiet nunc. Integer varius tortor vel mauris 
                            </p>
                            <button className="first-landing-page-recruitments-explore-btn">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="second-landing-page">
        <div className="second-landing-page-wrapper">
            <div className="second-landing-page-links">
               <a href="#" id='second-landing-page-clubs-link'>Clubs</a>
               <a href="#" id='second-landing-page-departments-link'>Departments</a>
            </div>
            <div className="second-landing-page-cards-wrapper">
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
               <ClubCard clubName = 'ACM' role = 'Technical' skill='Coding'/>
            </div>
        </div>
        </div>
    </>
    )
}
