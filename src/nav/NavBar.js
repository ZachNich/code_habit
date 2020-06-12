import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';


const NavBar = props => {

    // placeholder for conditional that will be passed down from props
    const hasUser = false;

    return (
        <nav>
            <ul className="nav_container">
                <div className="nav_leftside">
                    <li>
                        <Link className="nav_link logo" to="/">Logo</Link>
                    </li>
                </div>
                <div className="nav_rightside">
                    {hasUser ?
                    null 
                    : 
                    <li>
                        <Link className="nav_link" to="/sign-in">Sign In</Link>
                    </li>}
                    {hasUser ?
                    null 
                    : 
                    <li>
                        <Link className="nav_link" to="/sign-up">Sign Up</Link>
                    </li>}
                    {hasUser ?
                    <li>
                        <Link className="nav_link logo" to="/labit">Lab It</Link>
                    </li>
                    : null}
                    {hasUser ?
                    <li>
                        <Link className="nav_link logo" to="/habit">Habit</Link>
                    </li>
                    : null}
                    {hasUser ?
                    <li>
                        <Link className="nav_link logo" to="/profile">Profile</Link>
                    </li>
                    : null}
                </div>
            </ul>
        </nav>
    )
}

export default NavBar