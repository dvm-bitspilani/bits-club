import { useRoutes } from "react-router-dom"

import Navbar from "../src/routes/Navbar/Navbar"
import ClubPage from "./routes/components/Club Page/ClubPage.jsx"
import LandingPage from "./routes/components/Landing Page/LandingPage.jsx"
import RecruitmentsPage from "./routes/components/Recruitments Page/Recruitments.jsx"
import ImgContainer1 from "./routes/components/Recruitments Page/ImgContainer1"

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
      path: "/recruitments",
      element: <RecruitmentsPage/>
    },
    {
      path: "/recruitments/img",
      element: <ImgContainer1/> //only for testing out the component
    }
  ])

  return (
    <>
    <Navbar />
      {routes}
    </>
  )
}

export default App
