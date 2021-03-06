import React from 'react';
import { Link, withRouter } from "react-router-dom";
import './NavBar.css';


const NavBar = props => {
    
    return (
        <nav>
            <ul className={props.hasUser ? "nav_container" : "nav_container_intro"}>
                <div className="nav_leftside">
                    <li>
                    {props.history.location.pathname === '/'
                        ? <span className="nav_current logo">Code Habit</span>
                        : <Link className="nav_link logo" to="/">Code Habit</Link>}
                    </li>
                    {props.hasUser ?
                    <li>
                    {props.history.location.pathname === '/labit'
                        ? <span className="nav_current">Lab It</span>
                        : <Link className="nav_link" to="/labit">Lab It</Link>}
                    </li>
                    : null}
                    {props.hasUser ?
                    <li>
                    {props.history.location.pathname === '/habit'
                        ? <span className="nav_current">Habit</span>
                        : <Link className="nav_link" to="/habit">Habit</Link>}
                    </li>
                    : null}
                </div>
                <div className="nav_rightside">
                    {props.hasUser ?
                    null 
                    : 
                    <li>
                    {props.history.location.pathname === '/login'
                        ? <span className="nav_current">Sign In</span>
                        : <Link className="nav_link" to="/login">Sign In</Link>}
                    </li>}
                    {props.hasUser ?
                    null 
                    : 
                    <li>
                    {props.history.location.pathname === '/signup'
                        ? <span className="nav_current">Sign Up</span>
                        : <Link className="nav_link" to="/signup">Sign Up</Link>}
                    </li>}
                    {props.hasUser ?
                    <li>
                    {props.history.location.pathname.includes('/profile')
                        ? <span className="nav_current">Profile</span>
                        : <Link className="nav_link" to={`/profile/${JSON.parse(sessionStorage.user).username}`}>Profile</Link>}
                    </li>
                    : null}
                </div>
            </ul>
        </nav>
    )
}

export default withRouter(NavBar)