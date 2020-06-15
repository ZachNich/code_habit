import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiManager from '../modules/ApiManager';

const Login = props => {
    const [creds, setCreds] = useState({username: "", email: "", password: ""})
    const [profile, setProfile] = useState({userId: null, joinDate: null, level: 1})

    const handleFieldChange = e => {
        const stateToChange = {...creds}
        stateToChange[e.target.id] = e.target.value
        setCreds(stateToChange)
    }

    const constructNewUser = e => {
        e.preventDefault()
        ApiManager.getByProperty('users', 'username', creds.username)
            .then(data => {
                if (data.length > 0) {
                    window.alert('Username taken. Please try another username or log in if you already have an account.')
                } else {
                    ApiManager.post('users', creds)
                        .then(data => {
                            const stateToChange = {...profile}
                            stateToChange.userId = data.id
                            stateToChange.joinDate = new Date().toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
                            setProfile(stateToChange)
                            props.history.push('/')
                        })
                }
            })
    }

    const handleLogin = e => {
        e.preventDefault()
        ApiManager.getByProperty('users', 'email', creds.email)
            .then(data => {
                if (data.length > 0) {
                    if (data[0].email === creds.email && data[0].password === creds.password) {
                        creds.id = data[0].id
                        props.setUser(creds)
                        props.history.push('/')
                    } else {
                        window.alert('Incorrect email or password. Please try again.')
                    }
                } else {
                    window.alert('No user found. Please try again or create an account.')
                }
            })
    }

    useEffect(() => {
        if (profile.userId) {
            ApiManager.post('profiles', profile)
        }
    }, [profile])

    return (
        <form>
            <fieldset>
                {props.isNew ? <input required type="text" id="username" placeholder="username" onChange={handleFieldChange} /> : null}
                <input required type="email" id="email" placeholder="email" onChange={handleFieldChange} />
                <input required type="password" id="password" placeholder="password" onChange={handleFieldChange} />
                {props.isNew ? <button type="button" onClick={constructNewUser}>SIGN UP</button> : <button type="button" onClick={handleLogin}>SIGN IN</button>}
                {props.isNew ? <Link className="small_link" to="/login">Sign in</Link> : <Link className="small_link" to="/signup">Sign up</Link>}
                <Link className="small_link" to="/">Return Home</Link>
            </fieldset>
        </form>
    )
}

export default Login