import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = props => {
    return (
        <nav>
            <ul className="nav_container">
                <li>
                    <Link className="nav_link" to="/">Logo</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar