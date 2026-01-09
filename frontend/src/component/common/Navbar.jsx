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
            navigate('/home');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">
                    <span className="brand-text">Aurora Hotel</span>
                </NavLink>
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>

            <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="navbar-ul">
                    <li><NavLink to="/home" activeclassname="active">Home</NavLink></li>
                    <li><NavLink to="/about" activeclassname="active">About</NavLink></li>
                    <li><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>
                    
                    {isAuthenticated && (
                        <li><NavLink to="/find-booking" activeclassname="active">Bookings</NavLink></li>
                    )}

                    {isAuthenticated && (
                        <li className="cart-nav-item">
                            <NavLink to="/cart" activeclassname="active" className="cart-link">
                                <span className="cart-icon">🛒</span>
                                <span className="cart-text">Cart</span>
                                {getCartCount() > 0 && (
                                    <span className="cart-badge">{getCartCount()}</span>
                                )}
                            </NavLink>
                        </li>
                    )}

                    {isUser && <li><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
                    {isAdmin && <li><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}
                </ul>

                <div className="navbar-actions">
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" className="btn-login">Login</NavLink>
                            <NavLink to="/register" className="btn-register">Register</NavLink>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
