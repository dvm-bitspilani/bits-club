import { Link } from "react-router-dom"

const LIST_STYLES = {
    listStyle : "none",
    display : "flex",
    justifyContent:"space-evenly",
    width:"40%"
}

export default function NavBar() {
    return (
        <nav>
            <ul style={LIST_STYLES}>
                <li><Link to = '/'> Home </Link></li>
                <li><Link to = '/club'> Club </Link></li>
            </ul>
        </nav>
    )
    }
