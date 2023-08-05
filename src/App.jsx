import { useRoutes, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "../src/routes/Navbar/Navbar"
import ClubPage from "./routes/components/Club Page/ClubPage.jsx"
import LandingPage from "./routes/components/Landing Page/LandingPage.jsx"
import SearchPage from "./routes/components/Search Page/SearchPage";
// import ImgContainer1 from "./routes/components/Recruitments Page/ImgContainer1"
import EventsPage from "./routes/components/Events Page/EventsPage"
import EditRecPage from "./routes/components/Recruitments Page/EditRecPage";
import OnGoingRecruitmentsPage from "./routes/components/OnGoingRecruitment Page/OnGoingRecruitmentPage.jsx";
import Footer from "./routes/Footer/Footer";

const CLIENT_ID = "790445088727-eteehqoqngm4q823mt8i0281fj2uch3g.apps.googleusercontent.com";

function App() {

  let routes = useRoutes([
    {
      path: "/",
      element: <LandingPage/>,
    },
    {
      path: "/:club",
      element: <ClubPage/>,
    },
    {
      path: "/:club/recruitments",
      element: <EditRecPage/>
    },
    {
      path: "/:club/recruitments/edit",
      element: <EditRecPage/>
    },
    {
      path: "/events",
      element: <EventsPage/>
    },
    {
      path: "/searchpage",
      element:<SearchPage/>
    },
    {
      path: "/ongoing-recruitments",
      element: <OnGoingRecruitmentsPage/>,
    },
    {path: "*",
    element: <Navigate to="/" replace />}
  ])

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <div style={{
      backgroundImage: "url(../src/assets/Sprinkle2.png)",
      backgroundRepeat: "repeat",
      backgroundSize: "contain",
      position: "relative",
      }}>
    <Navbar />
      {routes}
    <Footer/>
    </div>
    </GoogleOAuthProvider>
  )
}

export default App
