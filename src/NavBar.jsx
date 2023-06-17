import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
            <ul style={{listStyle : "none",display : "flex", justifyContent:"space-evenly", width:"40"}}>
                <li><Link to = '/'> Home </Link></li>
                <li><Link to = '/club'> Club </Link></li>
            </ul>
        </nav>
    )
    }
