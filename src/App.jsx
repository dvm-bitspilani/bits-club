import { useRoutes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "../src/routes/Navbar/Navbar"
import ClubPage from "./routes/components/Club Page/ClubPage.jsx"
import LandingPage from "./routes/components/Landing Page/LandingPage.jsx"
import RecruitmentsPage from "./routes/components/Recruitments Page/Recruitments.jsx"
import SearchPage from "./routes/components/Search Page/SearchPage";
// import ImgContainer1 from "./routes/components/Recruitments Page/ImgContainer1"
import EventsPage from "./routes/components/Events Page/EventsPage"

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
      element: <RecruitmentsPage/>
    },
    {
      path: "/events",
      element: <EventsPage/>
    },
    {
      path: "/searchpage",
      element:<SearchPage/>
    },
  ])

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <div style={{
      backgroundImage: "url(../src/assets/Sprinkle2.png)",
      backgroundRepeat: "repeat",
      backgroundSize: "contain",
      }}>
    <Navbar />
      {routes}
    </div>
    </GoogleOAuthProvider>
  )
}

export default App
