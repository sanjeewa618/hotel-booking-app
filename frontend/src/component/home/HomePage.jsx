import React, { useState, useEffect } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

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

            // Hero section
            window.ScrollReveal().reveal(".hero-content", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            // Search section
            window.ScrollReveal().reveal(".search-wrapper", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 300,
            });

            // Room results
            window.ScrollReveal().reveal(".room-list-item", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 200,
                delay: 400,
            });

            // Services header
            window.ScrollReveal().reveal(".section-header", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 200,
            });

            // Services items
            window.ScrollReveal().reveal(".service-item", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
                delay: 400,
            });
        }
    }, []);

    return (
        <div className="home-page-wrapper">
            {/* HERO SECTION */}
            <section className="hero-banner-section">
                <div className="hero-banner-container">
                    <img src="./assets/images/hero-background.png" alt="Aurora Hotel" className="hero-bg-image" />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Welcome to <span className="brand-highlight">Aurora Hotel</span>
                        </h1>
                        <p className="hero-description">Experience luxury, comfort and exceptional hospitality</p>
                        <div className="hero-buttons">
                            <button className="hero-btn hero-btn-primary" onClick={() => window.location.href = '/rooms'}>
                                Book Now
                            </button>
                            <button className="hero-btn hero-btn-secondary" onClick={() => window.location.href = '/about'}>
                                Discover More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEARCH SECTION */}
            <section className="search-availability-section">
                <div className="search-wrapper">
                    <h2 className="search-section-title">Find Your Perfect Room</h2>
                    <RoomSearch handleSearchResult={handleSearchResult} />
                </div>
                <RoomResult roomSearchResults={roomSearchResults} />
            </section>

            {/* SERVICES SECTION */}
            <section className="services-showcase-section">
                <div className="services-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Premium Services</h2>
                        
                    </div>
                    

                    <div className="services-grid">
                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Air Conditioning" className="service-image" />
                            <div className="service-content">
                                <h3>Air Conditioning</h3>
                                <p>Climate-controlled rooms for your ultimate comfort</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Mini Bar" className="service-image" />
                            <div className="service-content">
                                <h3>Mini Bar</h3>
                                <p>Complimentary refreshments stocked daily</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/776122/pexels-photo-776122.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Secure Parking" className="service-image" />
                            <div className="service-content">
                                <h3>Secure Parking</h3>
                                <p>Free valet parking with 24/7 security</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="High-Speed WiFi" className="service-image" />
                            <div className="service-content">
                                <h3>High-Speed WiFi</h3>
                                <p>Lightning-fast internet throughout the property</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Spa & Wellness" className="service-image" />
                            <div className="service-content">
                                <h3>Spa & Wellness</h3>
                                <p>Rejuvenating treatments and massage therapy</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fine Dining" className="service-image" />
                            <div className="service-content">
                                <h3>Fine Dining</h3>
                                <p>Award-winning restaurant with gourmet cuisine</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fitness Center" className="service-image" />
                            <div className="service-content">
                                <h3>Fitness Center</h3>
                                <p>State-of-the-art gym equipment available 24/7</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Swimming Pool" className="service-image" />
                            <div className="service-content">
                                <h3>Swimming Pool</h3>
                                <p>Olympic-sized pool with poolside bar service</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Room Service" className="service-image" />
                            <div className="service-content">
                                <h3>Room Service</h3>
                                <p>Gourmet meals delivered to your room anytime</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Concierge" className="service-image" />
                            <div className="service-content">
                                <h3>Concierge</h3>
                                <p>Expert assistance for all your travel needs</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Business Center" className="service-image" />
                            <div className="service-content">
                                <h3>Business Center</h3>
                                <p>Fully equipped meeting rooms and facilities</p>
                            </div>
                        </div>

                        <div className="service-item">
                            <img src="https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Laundry Service" className="service-image" />
                            <div className="service-content">
                                <h3>Laundry Service</h3>
                                <p>Professional cleaning with same-day delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
