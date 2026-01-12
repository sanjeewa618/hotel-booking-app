import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { useCart } from '../../context/CartContext';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();
    const { getCartCount } = useCart();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            window.location.href = '/home';
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
            
            <div className="navbar-brand">
                <NavLink to="/home" onClick={closeMobileMenu}>
                    <span className="brand-text">Aurora Hotel</span>
                </NavLink>
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>

            <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="navbar-ul">
                    <li><NavLink to="/home" activeclassname="active" onClick={closeMobileMenu}>Home</NavLink></li>
                    <li><NavLink to="/about" activeclassname="active" onClick={closeMobileMenu}>About</NavLink></li>
                    <li><NavLink to="/rooms" activeclassname="active" onClick={closeMobileMenu}>Rooms</NavLink></li>

                    {isAuthenticated && (
                        <li><NavLink to="/find-booking" activeclassname="active" onClick={closeMobileMenu}>Bookings</NavLink></li>
                    )}

                    {isAuthenticated && (
                        <li className="cart-nav-item">
                            <NavLink to="/cart" activeclassname="active" className="cart-link" onClick={closeMobileMenu}>
                                <span className="cart-icon">🛒</span>
                                <span className="cart-text">Cart</span>
                                {getCartCount() > 0 && (
                                    <span className="cart-badge">{getCartCount()}</span>
                                )}
                            </NavLink>
                        </li>
                    )}

                    {isUser && <li><NavLink to="/profile" activeclassname="active" onClick={closeMobileMenu}>Profile</NavLink></li>}
                    {isAdmin && <li><NavLink to="/admin" activeclassname="active" onClick={closeMobileMenu}>Admin</NavLink></li>}
                </ul>

                <div className="navbar-actions">
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" className="btn-login" onClick={closeMobileMenu}>Login</NavLink>
                            <NavLink to="/register" className="btn-register" onClick={closeMobileMenu}>Register</NavLink>
                        </>
                    ) : (
                        <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="btn-logout">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
