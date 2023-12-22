import { NavLink } from "react-router-dom"

const NavBar = () => {
    return(
        <header className="header">
            <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className="blue-gradient_text">TAT</p>
            </NavLink>
        </header>
    )
}

export default NavBar