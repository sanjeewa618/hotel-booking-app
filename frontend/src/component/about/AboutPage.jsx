import React, { useEffect } from 'react';
import './AboutPage.css';

const AboutPage = () => {
    // ScrollReveal animations
    useEffect(() => {
        if (window.ScrollReveal) {
            const scrollRevealOption = {
                distance: "50px",
                duration: 1000,
                easing: "ease-in-out",
                origin: "bottom",
                reset: false,
            };

            window.ScrollReveal().reveal(".about-hero", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            window.ScrollReveal().reveal(".about-image-container", {
                ...scrollRevealOption,
                origin: "left",
                delay: 300,
            });

            window.ScrollReveal().reveal(".about-text-container", {
                ...scrollRevealOption,
                origin: "right",
                delay: 400,
            });

            window.ScrollReveal().reveal(".mv-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 200,
                delay: 400,
            });

            window.ScrollReveal().reveal(".stat-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
                delay: 400,
            });

            window.ScrollReveal().reveal(".team-member", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 200,
                delay: 400,
            });

            window.ScrollReveal().reveal(".testimonial-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 200,
                delay: 400,
            });

            
            window.ScrollReveal().reveal(".feature-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
                delay: 400,
            });

            window.ScrollReveal().reveal(".value-item", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
                delay: 400,
            });

            window.ScrollReveal().reveal(".cta-section", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 500,
            });
        }
    }, []);

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-overlay">
                    <h1 className="hero-title">About <span className="highlight">Us</span></h1>
                    <p className="hero-subtitle">Discover the Aurora Hotel Experience</p>
                </div>
            </section>

            {/* Main About Section */}
            <section className="about-main">
                <div className="about-content-wrapper">
                    <div className="about-image-container">
                        <div className="image-card">
                            <img src="./assets/images/about1.png" alt="Aurora Hotel Interior" />
                            <div className="image-overlay">
                                <p>Modern Elegance</p>
                            </div>
                        </div>
                    </div>
                    <div className="about-text-container">
                        <h2>Welcome to <span className="highlight">Aurora Hotel</span></h2>
                        <p className="intro-text">
                            At Aurora Hotel, we believe that every stay should be more than just a place to rest — it should be 
                            an experience filled with comfort, beauty, and unforgettable memories.
                        </p>
                        <p>
                            Designed with a blend of modern elegance and warm hospitality, our hotel offers the perfect balance 
                            of luxury and relaxation. From the moment you arrive, our dedicated team is committed to ensuring 
                            your stay feels exceptional, personal, and seamless.
                        </p>
                        <p>
                            Every space within Aurora Hotel has been thoughtfully crafted — from our beautifully furnished rooms 
                            and calming interior aesthetics to our exceptional dining and recreational facilities. Welcome to a 
                            place where your experience comes first — welcome to Aurora Hotel.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision">
                <div className="mv-container">
                    <div className="mv-card">
                        <div className="mv-icon">
                            <i className="icon-mission">🎯</i>
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To provide exceptional hospitality experiences that blend modern luxury with personalized service, 
                            creating memorable moments for every guest who walks through our doors.
                        </p>
                    </div>
                    <div className="mv-card">
                        <div className="mv-icon">
                            <i className="icon-vision">👁️</i>
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            To be recognized as the premier destination for travelers seeking a perfect harmony of 
                            contemporary comfort, authentic hospitality, and unforgettable experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">What Makes Us <span className="highlight">Special</span></h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>🛏️</span>
                        </div>
                        <h3>Premium Rooms</h3>
                        <p>
                            Elegantly designed rooms featuring modern amenities, plush bedding, and stunning views. 
                            Each room is a sanctuary of comfort and style.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>🍽️</span>
                        </div>
                        <h3>Exquisite Dining</h3>
                        <p>
                            Savor culinary excellence at our restaurants, offering diverse menus crafted by expert chefs 
                            using fresh, locally-sourced ingredients.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>💆</span>
                        </div>
                        <h3>Wellness & Spa</h3>
                        <p>
                            Rejuvenate your body and mind at our state-of-the-art spa facilities, featuring therapeutic 
                            treatments and wellness programs.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>🏊</span>
                        </div>
                        <h3>Recreation</h3>
                        <p>
                            Enjoy our fitness center, swimming pool, and recreational facilities designed to keep you 
                            active and entertained during your stay.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>🤝</span>
                        </div>
                        <h3>Personalized Service</h3>
                        <p>
                            Our dedicated staff is available 24/7 to cater to your every need, ensuring a seamless and 
                            memorable experience throughout your stay.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span>🌿</span>
                        </div>
                        <h3>Sustainable Luxury</h3>
                        <p>
                            We're committed to environmental responsibility, implementing eco-friendly practices while 
                            maintaining the highest standards of luxury.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <h3 className="stat-number">150+</h3>
                        <p className="stat-label">Luxury Rooms</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number">10K+</h3>
                        <p className="stat-label">Happy Guests</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number">15+</h3>
                        <p className="stat-label">Years of Excellence</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-number">24/7</h3>
                        <p className="stat-label">Customer Service</p>
                    </div>
                </div>
            </section>

            {/* Team Values Section */}
            <section className="values-section">
                <h2 className="section-title">Our <span className="highlight">Core Values</span></h2>
                <div className="values-grid">
                    <div className="value-item">
                        <div className="value-number">01</div>
                        <h4>Excellence</h4>
                        <p>We strive for perfection in every detail, from room cleanliness to guest interactions.</p>
                    </div>
                    <div className="value-item">
                        <div className="value-number">02</div>
                        <h4>Integrity</h4>
                        <p>Honesty and transparency guide all our business practices and guest relationships.</p>
                    </div>
                    <div className="value-item">
                        <div className="value-number">03</div>
                        <h4>Innovation</h4>
                        <p>We continuously evolve to meet changing guest needs with modern solutions.</p>
                    </div>
                    <div className="value-item">
                        <div className="value-number">04</div>
                        <h4>Hospitality</h4>
                        <p>Warm, genuine care for our guests is at the heart of everything we do.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Experience Aurora Hotel?</h2>
                    <p>Book your stay today and discover the perfect blend of luxury, comfort, and hospitality.</p>
                    <button className="cta-button" onClick={() => window.location.href = '/rooms'}>
                        Explore Our Rooms
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
