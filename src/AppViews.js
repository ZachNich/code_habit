import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppViews = props => {
    return (
        <>
            <Route exact path="/" render={props => null} />
        </>
    )
}

export default AppViews