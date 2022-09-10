import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import italia from '../geography';
import { Helmet } from 'react-helmet';

import Navigation from "./Navigation";
import ShopsList from './ShopsList';

const SearchByPlace = (props) => {

    const navigate = useNavigate();
    
    const [regioni] = useState(italia);
    const [province, setProvince] = useState([]);

    const showCities = (reg, index) => {
        setProvince(regioni.italia[reg]);
    }

    const showShops = (prov) => {
        props.context.actions.getShopsByPlace(prov)
            .then(res => props.context.actions.setShopsListByPlace(res))
            .catch(err => {
                console.log(err.message);
                navigate("/error");
            })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Search by Place</title>
            </Helmet>
            <Navigation />
            <div className="search-by-place">
                <div className="reg">
                    {
                        Object.keys(regioni.italia).map((reg, index) => {
                            return (
                                <button onClick={() => showCities(reg, index)} key={index}>{reg}</button>
                            )
                        })
                    }
                </div>
                <div className="prov">
                    {
                        province ? (
                            province.map((prov, index) => {
                                return (
                                    <button onClick={() => showShops(prov)} key={index}>{prov}</button>
                                )
                            })
                        ) : (
                            <React.Fragment></React.Fragment>
                        )
                    }
                </div>
                <ShopsList 
                    list={props.context.shopsListByPlace} 
                    formatDate={props.context.actions.formatDate}
                />
            </div>
        </React.Fragment>
    );
};

export default SearchByPlace;