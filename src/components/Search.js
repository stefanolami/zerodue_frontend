import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from './Navigation';
import ShopsList from './ShopsList';

import searchIcon from "../images/search-icon.png";

const Search = (props) => {

    const [query, setQuery] = useState();
    const [shopsList, setShopsList] = useState();

    const navigate = useNavigate()

    const searchShops = (e, query) => {
        const newQuery = `?query=${query}`;
        e.preventDefault();
        props.context.actions.searchShops(newQuery)
            .then(res => setShopsList(res))
            .catch(err => {
                console.log(err.message);
                navigate("/error");
            })
        navigate({
            pathname: '/search',
            search: `${newQuery}`
        })
    }

    /** 
     * Checks on render for the existence of a search query in the current url,
     *  if it finds it calls searchShops with the given query, otherwise get ready for a new search
     */
    useEffect(() => {

        if (window.location.search) {
            props.context.actions.searchShops(window.location.search)
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
        } else {
            setShopsList(null)
        }
        
        // eslint-disable-next-line
    }, [window.location.search])

    return (
        <React.Fragment>
            <Helmet>
                <title>ZeroDue - Search</title>
            </Helmet>
            <Navigation />
            <div className="search">
                <form className="search-div" spellCheck="false" onSubmit={(e) => searchShops(e, query)}>
                    <input type="text" className="search-input" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="search-btn"><img src={searchIcon} alt="Search icon" className="searchIcon" /></button>
                </form>
                <ShopsList 
                    list={shopsList} 
                    formatDate={props.context.actions.formatDate}
                />
            </div>
        </React.Fragment>
    )
}

export default Search;