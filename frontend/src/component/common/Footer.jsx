import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
    return (
        <footer className="modern-footer">
            <div className="footer-content">
                <div className="footer-section footer-about">
                    <h3 className="footer-logo">Aurora <span className="footer-highlight">Hotel</span></h3>
                    <p className="footer-description">
                        Experience luxury and comfort at Aurora Hotel. Your perfect stay awaits with world-class 
                        amenities and exceptional service.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="social-icon" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/rooms">Rooms</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/find-booking">My Bookings</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Services</h4>
                    <ul className="footer-links">
                        <li><a href="#services">Room Service</a></li>
                        <li><a href="#services">Spa & Wellness</a></li>
                        <li><a href="#services">Fine Dining</a></li>
                        <li><a href="#services">Business Center</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Contact Info</h4>
                    <ul className="footer-contact">
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>NO 18, Colombo RD, Sri Lanka</span>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i>
                            <span>info@aurorahotel.com</span>
                        </li>
                        <li>
                            <i className="fas fa-clock"></i>
                            <span>24/7 Customer Service</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} Aurora Hotel. All Rights Reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <span className="separator">|</span>
                        <a href="#">Terms of Service</a>
                        <span className="separator">|</span>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
