import React from 'react';
import { Link, withRouter } from "react-router-dom";
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
                    {props.history.location.pathname === '/login'
                        ? <span className="nav_current">Sign In</span>
                        : <Link className="nav_link" to="/login">Sign In</Link>}
                    </li>}
                    {hasUser ?
                    null 
                    : 
                    <li>
                    {props.history.location.pathname === '/signup'
                        ? <span className="nav_current">Sign Up</span>
                        : <Link className="nav_link" to="/signup">Sign Up</Link>}
                    </li>}
                    {hasUser ?
                    <li>
                    {props.history.location.pathname === '/labit'
                        ? <span className="nav_current">Lab It</span>
                        : <Link className="nav_link" to="/labit">Lab It</Link>}
                    </li>
                    : null}
                    {hasUser ?
                    <li>
                    {props.history.location.pathname === '/habit'
                        ? <span className="nav_current">Habit</span>
                        : <Link className="nav_link" to="/habit">Habit</Link>}
                    </li>
                    : null}
                    {hasUser ?
                    <li>
                    {props.history.location.pathname === '/profile'
                        ? <span className="nav_current">Profile</span>
                        : <Link className="nav_link" to="/profile">Profile</Link>}
                    </li>
                    : null}
                </div>
            </ul>
        </nav>
    )
}

export default withRouter(NavBar)