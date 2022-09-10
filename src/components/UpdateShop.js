import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Form from "./Form";
import Navigation from "./Navigation";

const UpdateShop = (props) => {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [errors, setErrors] = useState();
    const [submitted, setSubmitted] = useState(false);

    const { id } = useParams();

    const submit = (e, shop) => {
        e.preventDefault();
        if (shop.nome) {
            props.context.actions.updateShop(id, shop)
                .then(res => {
                    if (res === true) {
                        setSubmitted('Negozio Aggiornato!')
                        setTimeout(() => navigate(-1, { replace: true }), 1500)
                    } else if (res.status === 400) {
                        setErrors("Inserisci un nome");
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    navigate('/error');
                })
        } else {
            setErrors("Inserisci un nome");
        }
    }

    useEffect(() => {
        props.context.actions.getShop(id)
            .then(res => {
                if (res !== null) {
                    setName(res[0].nome)
                } else {
                    navigate('notfound')
                }
            })
            .catch(err => {
                console.log(err.message);
                navigate('/error')
            })
        // eslint-disable-next-line
    }, [])

    return (
        <React.Fragment>
            {
                name ? (
                    <Helmet>
                        <title>{`ZeroDue - ${name} - Update`}</title>
                    </Helmet>
                ) : null
            }
            <Navigation />
            <Form
                submit={submit}
                errors={errors}
                id={id}
                getShop={props.context.actions.getShop}
                title="Aggiorna Negozio"
                button="Aggiorna"
                update={true}
                submitted={submitted}
            />
        </React.Fragment>
        
    )
}

export default UpdateShop;