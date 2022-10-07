import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from "./Navigation";

const Shop = (props) => {

    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false)

    const deleteShop = (id) => {
        if (window.confirm("Sei sicuro di voler cancellare questo negozio?")) {
            props.context.actions.deleteShop(id)
            .then(res => {
                if (res === true) {
                    setSubmitted('Negozio Cancellato!')
                    setTimeout(() => navigate("/home"), 1500)
                } else {
                    navigate('/error');
                }
            })
            .catch(err => {
                console.log(err.message);
                navigate('/error')
            })
        }
    }

    useEffect(() => {
        props.context.actions.getShop(id)
            .then(res => {
                if (res !== null) {
                    setShop(res[0])
                } else {
                    navigate('/notfound')
                }
            })
            .catch(err => {
                console.log(err.message)
                navigate('/error')
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Navigation />
            {
                shop ? (
                    <React.Fragment>
                        <Helmet>
                            <title>{`ZeroDue - ${shop.nome}`}</title>
                        </Helmet>
                        <div className="shop main">
                            <h3>{shop.nome}</h3>
                            <div className="shop-div">
                                <div className="shop-info">
                                    <p><strong>Email:</strong>&nbsp;&nbsp;{shop.email || "--"}</p>
                                    <p><strong>Indirizzo:</strong>&nbsp;&nbsp;{shop.indirizzo || "--"}</p>
                                    <p><strong>Cap:</strong>&nbsp;&nbsp;{shop.cap || "--"}</p>
                                    <p><strong>Città:</strong>&nbsp;&nbsp;{shop.città || "--"}</p>
                                    <p><strong>Provincia:</strong>&nbsp;&nbsp;{shop.provincia || "--"}</p>
                                    <p><strong>Regione:</strong>&nbsp;&nbsp;{shop.regione || "--"}</p>
                                    <p><strong>Note:</strong>&nbsp;&nbsp;{shop.note || "--"}</p>
                                </div>
                                <div className="shop-business">
                                    <p><strong>Telefono:</strong>&nbsp;&nbsp;{shop.telefono || "--"}</p>
                                    <p><strong>Telefono Referente:</strong>&nbsp;&nbsp;{shop.telefono_referente || "--"}</p>
                                    <p><strong>Nome Referente:</strong>&nbsp;&nbsp;{shop.nome_referente || "--"}</p>
                                    <div className="shop-business-div">
                                        <div>
                                            <div>
                                                <p><strong>Cliente</strong></p>
                                                {
                                                    shop.cliente === 1 ? (
                                                        <span className="span-client si">Si</span>
                                                    ) : (
                                                        <span className="span-client no">No</span> 
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p><strong>Compra</strong></p>
                                                {
                                                    shop.compra === 1 ? (
                                                        <span className="span-client si">Si</span>
                                                    ) : (
                                                        <span className="span-client no">No</span> 
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <p><strong>Buste</strong></p>
                                                {
                                                    shop.buste === 1 ? (
                                                        <span className="span-client si">Si</span>
                                                    ) : (
                                                        <span className="span-client no">No</span> 
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p><strong>Sfuso</strong></p>
                                                {
                                                    shop.sfuso ===  1 ? (
                                                        <span className="span-client si">Si</span>
                                                    ) : (
                                                        <span className="span-client no">No</span> 
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div id="shop-business-div-contattato">
                                            <div>
                                                <p><strong>Contattato</strong></p>
                                                {
                                                    shop.contattato ===  1 ? (
                                                        <span className="span-client si">Si</span>
                                                    ) : (
                                                        <span className="span-client no">No</span> 
                                                    )
                                                }
                                            </div>
                                                {
                                                    shop.ultimo_contatto && shop.contattato === 1 ? (
                                                        <div id="ultimo-contatto-div">
                                                            <p><strong>Ultimo Contatto</strong></p>
                                                            <span>{props.context.actions.formatDate(shop.ultimo_contatto)}</span>
                                                        </div>
                                                    ) : (null)
                                                }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            submitted ? (
                                <h4 className="submit-confirmation">{submitted}</h4>
                            ) : (
                                null
                            )
                        }
                        <div className="shop-btns">
                            <Link to={`/orders-history/${id}`}>
                                <button className="orders-btn button">Storico Ordini</button>
                            </Link>
                            <Link to={`/update/${id}`}>
                                <button className="update-btn button">Aggiorna</button>
                            </Link>
                            <button className="delete-btn button" onClick={() => deleteShop(id)}>Cancella</button>  
                        </div>
                    </React.Fragment>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}

export default Shop;