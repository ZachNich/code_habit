import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
    const [creds, setCreds] = useState({username: "", email: "", password: ""})
    const [profile, setProfile] = useState({userId: null, joinDate: "", level: null})

    const handleFieldChange = e => {
        const stateToChange = {...creds}
        stateToChange[e.target.id] = e.target.value
        setCreds(stateToChange)
    }

    return (
        <form>
            <fieldset>
                {props.isNew ? <input required type="text" id="username" placeholder="username" /> : null}
                <input required type="email" id="email" placeholder="email" />
                <input required type="password" id="password" placeholder="password" />
                {props.isNew ? <button type="submit">SIGN UP</button> : <button type="submit">SIGN IN</button>}
                {props.isNew ? <Link className="small_link" to="/login">Sign in</Link> : <Link className="small_link" to="/signup">Sign up</Link>}
                <Link className="small_link" to="/">Return Home</Link>
            </fieldset>
        </form>
    )
}

export default Login