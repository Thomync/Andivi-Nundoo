import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Style from '../css/navbar.module.css';

const NavBar = () => {
    const location = useLocation();

    const getActiveClass = (path) => {
        return location.pathname === path ? Style.active : '';
    };

    return (
        <nav className={Style.navbar}>
            <div className={Style.navbarBrand}>
                <Link to="/" className={Style.navbarLink}>
                    <img src="mixtecnautas.webp" alt="Logo" />
                    <p>Mixtecnautas</p>
                </Link>
            </div>
            <ul className={Style.navbarList}>
                <li className={`${Style.navbarItem} ${getActiveClass('/')}`}>
                    <Link to="/" className={Style.navbarLink} aria-label="home">Home</Link>
                </li>
                <li className={`${Style.navbarItem} ${getActiveClass('/exoplanets')}`}>
                    <Link to="/exoplanets" className={Style.navbarLink} aria-label="home">Exoplanets</Link>
                </li>
                <li className={`${Style.navbarItem} ${getActiveClass('/stars')}`}>
                    <Link to="/stars" className={Style.navbarLink} aria-label="products">Stars</Link>
                </li>
                <li className={`${Style.navbarItem} ${getActiveClass('/aboutUs')}`}>
                    <Link to="/aboutUs" className={Style.navbarLink} aria-label="Us">Us</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
