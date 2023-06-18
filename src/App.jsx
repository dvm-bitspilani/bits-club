import { useRoutes } from "react-router-dom"

import Navbar from "./NavBar.jsx"
import LandingPage from "./routes/Landing Page/LandingPage.jsx"
import ClubPage from "./routes/Club Page/ClubPage.jsx"

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
