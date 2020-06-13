import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./login/Login";
import NavBar from "./nav/NavBar";

const AppViews = props => {
    return (
        <>
            <Route exact path="/" render={props => <NavBar />} />
            <Route exact path="/signup" render={props => <Login isNew={true} {...props} />} />
            <Route exact path="/login" render={props => <Login isNew={false} {...props} />} />
        </>
    )
}

export default AppViews