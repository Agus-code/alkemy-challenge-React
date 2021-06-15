import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css'

const NavBar = () => {

    const [menuOpen, setMenuOpen] = React.useState(false);

    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem("token");
        history.push("/login")
    }

    return (
        <>
            <nav className="navBar">
                <div className="navBar__container">
                    <div className="navBar__title">
                        <h1 className="navBar__title-h1">
                            SuperHero API
                        </h1>
                    </div>
                    <div className="navBar__menu">
                        <div className="navBar__menu-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                            <i className="navBar__menu-hamburger-icon fas fa-bars"></i>
                        </div>
                        <div className={`navBar__menu-container ${menuOpen ? "active" : ""}`}>
                            <ul className="navBar__menu-ul">
                                <li className="navBar__menu-ul-item">
                                    <Link to="/" className="navBar__menu-ul-item-link">
                                        HOME
                                    </Link>
                                </li>
                                <li className="navBar__menu-ul-item">
                                    <Link to="/search" className="navBar__menu-ul-item-link">
                                        SEARCH
                                    </Link>
                                </li>
                                <li className="navBar__menu-ul-item">
                                    <span to="/search" className="navBar__menu-ul-item-link" onClick={logOut}>
                                        LOG OUT
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;