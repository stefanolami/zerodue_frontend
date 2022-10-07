import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LogIn = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        props.context.actions.logIn(username, password)
            .then(res => {
                if (res !== null) {
                    navigate("/home")
                } else {
                    setError("Sign in was unsuccessful")
                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Log In</title>
            </Helmet>
            {
                !error ? (
                    null
                ) : (
                    <div className="validationErrors">
                        <h3>{error}</h3>
                    </div>
                )
            }
            <div className="sign-in-div">
                <form className="sign-in-form" onSubmit={(e) => submit(e)}>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="login-btn button" type="submit">Log In</button>
                </form>
            </div>
        </React.Fragment>
        
    )
}

export default LogIn;