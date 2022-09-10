import React from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import filterIcon from '../images/advanced-search.png';
import searchIcon from "../images/search.png";
import globeIcon from '../images/globe.png';
import plusIcon from "../images/plus-sign.png";
import clientsIcon from '../images/hand-shake.png';
import lastAddedIcon from "../images/list-plus.png";

const Home = (props) => {
    

    return (
        <div className="home">
            <Helmet>
                <title>ZeroDue - Home</title>
            </Helmet>
            <Link to="/search">
                <div>
                    <img src={searchIcon} alt="search icon" />
                    <h4>CERCA</h4>
                </div>
            </Link>
            <Link to="/search-by-place">
                <div>
                    <img src={globeIcon} alt="globe icon" />
                    <h4>RICERCA<br></br> PER LUOGO</h4>
                </div>
            </Link>
            <Link to="/advanced-search">
                <div>
                    <img src={filterIcon} alt="filter icon" />
                    <h4>RICERCA<br></br> AVANZATA</h4>
                </div>
            </Link>
            <Link to="/clients-list">
                <div>
                    <img src={clientsIcon} alt="clients icon" />
                    <h4>LISTA<br></br> CLIENTI</h4>
                </div>
            </Link>
            <Link to="/last-added">
                <div>
                    <img src={lastAddedIcon} alt="last added icon" />
                    <h4>ULTIMI<br></br> AGGIUNTI</h4>
                </div>
            </Link>
            <Link to="/add-shop">
                <div>
                    <img src={plusIcon} alt="plus icon" id="plus-icon-home" />
                    <h4>AGGIUNGI<br></br> NEGOZIO</h4>
                </div>
            </Link>
        </div>
    );
};

export default Home;