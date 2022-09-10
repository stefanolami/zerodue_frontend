import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from './Navigation';

const NotFound = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const goBack2 = () => {
        if (location.pathname === "/notfound") {
            console.log("back 2")
            navigate(-2, {replace: true});
        }
    }

    const goBack = () => {
        console.log("back")
        navigate(-1, {replace: true});
        setTimeout(goBack2, 500) 
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Not Found</title>
            </Helmet>
            <Navigation />
            <div className="not-found">
                <h1>Error 404</h1>
                <h3>Sorry, we couldn't find what you're looking for</h3>
                <button onClick={goBack}>Back</button>
            </div>
        </React.Fragment>
    )
}

export default NotFound;