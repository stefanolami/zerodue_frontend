import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from "./Navigation";
import Form from "./Form";
import ShopsList from "./ShopsList";
import SelectComponent from "./SelectComponent";
import sortIcon from '../images/icon-sort.jpg';

const AdvancedSearch = (props) => {

    const navigate = useNavigate();

    const [shopsList, setShopsList] = useState();
    const [showList, setShowList] = useState(false);
    const [orderBy, setOrderBy] = useState("ultimo contatto");
    const [direction, setDirection] = useState("ASC");
    const [orderByOptions] = useState(["nome", "indirizzo", "città", "ultimo contatto"]);


    /** 
     * Submit function, creates a query string based on the given shop parameters
     * @param  {object}  shop
     * Calls the searchAdvanced function with the created query, and sets the showList state to true in order to show the liost and hide the form
     */
    const submit = (e, shop) => {
        e.preventDefault();

        let query = `?1=1`;

        if (shop.nome) {
            query += `&nome=${shop.nome}`;
        }
        if (shop.indirizzo) {
            query += `&indirizzo=${shop.indirizzo}`;
        }
        if (shop.cap) {
            query += `&cap=${shop.cap}`;
        }
        if (shop.città) {
            query += `&città=${shop.città}`;
        }
        if (shop.provincia) {
            query += `&provincia=${shop.provincia}`;
        }
        if (shop.regione) {
            query += `&regione=${shop.regione}`;
        }
        if (shop.email) {
            query += `&email=${shop.email}`;
        }
        if (shop.telefono) {
            query += `&telefono=${shop.telefono}`;
        }
        if (shop.telefonoReferente) {
            query += `&telefonoReferente=${shop.telefonoReferente}`;
        }
        if (shop.contattato) {
            query += `&contattato=${shop.contattato}`;
        }
        if (shop.riContattato) {
            query += `&riContattato=${shop.riContattato}`;
        }
        if (shop.compra) {
            query += `&compra=${shop.compra}`;
        }
        if (shop.sfuso) {
            query += `&sfuso=${shop.sfuso}`;
        }
        if (shop.imbustato) {
            query += `&imbustato=${shop.imbustato}`;
        }
        if (shop.note) {
            query += `&note=${shop.note}`;
        }

        let newOrderBy;
        
        if (orderBy === "ultimo contatto") {
            newOrderBy = "ultimo_contatto"
        } else {
            newOrderBy = orderBy
        }
    
        props.context.actions.searchAdvanced(newOrderBy, direction, query)
            .then(res => {
                if (res === null) {
                    navigate("/notfound")
                } else {
                    setShopsList(res)
                }
            })
            .catch(err => {
                console.log(err.message);
                navigate('/error');
            })
        navigate({
            pathname: `/advanced-search`,
            search: `${query}`
        })
        setShowList(true);
    }

    const newSearch = () => {
        setShopsList(null);
        setShowList(false);
    }

    /** 
     * Checks on render for the existence of a search query in the current url,
     *  if it finds it calls searchAdvanced with the given query, otherwise get ready for a new search
     */
    useEffect(() => {

        if (window.location.search) {
            let newOrderBy;
        
            if (orderBy === "ultimo contatto") {
                newOrderBy = "ultimo_contatto"
            } else {
                newOrderBy = orderBy
            }
            props.context.actions.searchAdvanced(newOrderBy, direction, window.location.search)
                .then(res => {
                    if (res === null) {
                        navigate("/notfound")
                    } else {
                        setShopsList(res)
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    navigate("/error")
                })
            setShowList(true);
        } else {
            setShopsList(null);
            setShowList(false);
        }
        
        // eslint-disable-next-line
    }, [window.location.search, orderBy, direction])

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Advanced Search</title>
            </Helmet>
            <Navigation />
            {
                showList ? (
                    <button className="advanced-search-btn" onClick={() => newSearch()}>Nuova Ricerca</button>
                ) : (
                    <Form 
                        submit={submit}
                        title="Ricerca Avanzata"
                        button="Cerca"
                        update={false}
                    />
                )
            }
            {
                showList ? (
                    <React.Fragment>
                        <div className="clients-list-selectors">
                            <div className="list-filter clients">
                                <SelectComponent
                                    options={orderByOptions}
                                    onChange={(item) => setOrderBy(item)}
                                    value={orderBy || ""}
                                    label="Ordina"
                                />
                            </div>
                            <div className="clients-list-sort">
                                <img src={sortIcon} alt="sort icon" onClick={() => direction === "ASC" ? setDirection("DESC") : setDirection("ASC")} />
                            </div>
                        </div>
                        <ShopsList
                            list={shopsList} 
                            formatDate={props.context.actions.formatDate}
                        />
                    </React.Fragment>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}

export default AdvancedSearch;