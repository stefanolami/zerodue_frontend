import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React from 'react';

const WelcomeToDemo = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Welcome</title>
            </Helmet>
            <div className="welcome">
                <h2>Welcome to the ZeroDue Business WebApp Demo!</h2>
                <p>To login use "guest" as username and "1234" as password. Enjoy the tour!</p>
                <Link to="/home">
                    <button>Proceed</button>
                </Link>
            </div>
        </React.Fragment>
        
    )
}

export default WelcomeToDemo;