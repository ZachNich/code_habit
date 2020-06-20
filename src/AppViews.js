import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./login/Login";
import NavBar from "./nav/NavBar";
import LabIt from "./lab/LabIt";
import Habit from "./lab/Habit";

const AppViews = props => {
    const isAuthenticated = () => sessionStorage.getItem("user") !== null
    const [hasUser, setHasUser] = useState(isAuthenticated())
    const [hasSuccessWindow, setHasSuccessWindow] = useState(false)

    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
      }

    const setUser = user => {
        clearUser()
        sessionStorage.setItem("user", JSON.stringify(user))
        setHasUser(isAuthenticated())
    }

    const toggleSuccess = () => setHasSuccessWindow(!hasSuccessWindow)

    return (
        <>
            <Route exact path="/" render={props => <NavBar hasUser={hasUser} />} />
            <Route exact path="/signup" render={props => <Login isNew={true} setUser={setUser} {...props} />} />
            <Route exact path="/login" render={props => <Login isNew={false} setUser={setUser} {...props} />} />
            <Route exact path="/labit" render={props => <> <NavBar hasUser={hasUser} /> <LabIt {...props} toggleSuccess={toggleSuccess} hasSuccessWindow={hasSuccessWindow} /> </>} />
            <Route exact path="/habit" render={props => <> <NavBar hasUser={hasUser} /> <Habit {...props} toggleSuccess={toggleSuccess} hasSuccessWindow={hasSuccessWindow} /> </>} />
            <Route path="/profile/:username" render={props => <NavBar hasUser={hasUser} />} />
        </>
    )
}

export default AppViews