import React from 'react';
import { NavLink } from 'react-router-dom';

import filterIcon from '../images/advanced-search.png';
import searchIcon from "../images/search.png";
import globeIcon from '../images/globe.png';
import plusIcon from "../images/plus-sign.png";
import clientsIcon from '../images/hand-shake.png';
import lastAddedIcon from "../images/list-plus.png";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="navigation-div">
                <NavLink to="/search">
                    <div>
                        <img src={searchIcon} alt="search icon" />
                    </div>
                </NavLink>
                <NavLink to="/search-by-place">
                    <div>
                        <img src={globeIcon} alt="globe icon" id="globe-icon-navigation" />
                    </div>
                </NavLink>
                <NavLink to="/advanced-search">
                    <div>
                        <img src={filterIcon} alt="filter icon" />
                    </div>
                </NavLink>
                <NavLink to="/clients-list">
                    <div>
                        <img src={clientsIcon} alt="clients icon" />
                    </div>
                </NavLink>
                <NavLink to="/last-added">
                    <div>
                        <img src={lastAddedIcon} alt="last added icon" />
                    </div>
                </NavLink>
                <NavLink to="/add-shop">
                    <div>
                        <img src={plusIcon} alt="plus icon" id="plus-icon-navigation" />
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navigation;