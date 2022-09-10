import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from "./Navigation";
import Form from "./Form";

const AddShop = (props) => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState();

    const [submitted, setSubmitted] = useState(false);

    const submit = (e, shop) => {
        e.preventDefault();
        
        if (shop.nome) {
            props.context.actions.createShop(shop)
            .then(res => {
                if (res) {
                    setSubmitted('Negozio Creato!')
                    setTimeout(() => navigate("/home"), 1500)
                } else if (res.status === 400) {
                    setErrors("Inserisci un nome");
                }
            })
            .catch(err => {
                console.log(err.message);
                navigate("/error")
            })
        } else {
            setErrors("Inserisci un nome");
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Add Shop</title>
            </Helmet>
            <Navigation />
            <Form 
                submit={submit}
                errors={errors}
                title="Aggiungi Negozio"
                button="Aggiungi"
                update={false}
                submitted={submitted}
            />
        </React.Fragment>
    )
}

export default AddShop;