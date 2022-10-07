import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from './Navigation';

const Error = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const goBack2 = () => {
        if (location.pathname === "/error") {
            navigate(-2, {replace: true});
        }
    }

    const goBack = () => {
        navigate(-1, {replace: true});
        setTimeout(goBack2, 500) 
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Error</title>
            </Helmet>
            <Navigation />
            <div className="error main">
                <h1>Error</h1>
                <h3>Sorry, an unexpected error has occurred</h3>
                <button className="error-btn button" onClick={goBack}>Back</button>
            </div>
        </React.Fragment>
    )
}

export default Error;