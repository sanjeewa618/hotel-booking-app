import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";




const HomePage = () => {

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">

            <section>
                <header className="header-banner">
                    <img src="./assets/images/hero-background.png" alt="Aurora Hotel" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="zenora-color">Aurora Hotel</span>
                        </h1><br />
                        <h3>Step into a haven of comfort and care</h3>

                        <div className="header-buttons">
                            <button className="btn-primary" onClick={() => window.location.href = '/login'}>
                                Login <span>→</span>
                            </button>
                            <button className="btn-secondary" onClick={() => document.querySelector('.service-section')?.scrollIntoView({ behavior: 'smooth' })}>
                                Our Services <span>→</span>
                            </button>
                        </div>
                    </div>

                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={roomSearchResults} />

            <h4><a className="view-rooms-home" href="/rooms">All Rooms</a></h4>
            {/* ABOUT US SECTION */}
            <section className="about-section">
                <div className="about-container">
                    <h2>About <span className="zenora-color">Us</span></h2>

                    <div className="about-content">
                        <div className="about-image">
                            <img src="./assets/images/about1.png" alt="Aurora Hotel Interior" />
                        </div>
                        <p>
                            At Aurora Hotel, we believe that every stay should be more than just a place to rest — it should be an experience filled with comfort, beauty,
                            and unforgettable memories. Designed with a blend of modern elegance and warm hospitality, our hotel offers the perfect balance of luxury and relaxation.
                            From the moment you arrive, our dedicated team is committed to ensuring your stay feels exceptional, personal, and seamless. Every space within Aurora Hotel has been thoughtfully crafted — from our
                            beautifully furnished rooms and calming interior aesthetics to our exceptional dining and recreational facilities. Welcome to a place where your experience comes first — welcome to Aurora Hotel.
                            From our elegantly designed rooms to our exceptional dining and recreational facilities,
                            every detail is crafted to exceed your expectations.
                        </p>
                    </div>


                </div>
            </section>

            <h2 className="home-services">Services at <span className="zenora-color">Aurora Hotel</span></h2>

            {/* SERVICES SECTION */}
            <section className="service-section"><div className="service-card">
                <img src="https://media.istockphoto.com/id/1399980977/photo/hand-with-remote-control-directed-on-air-conditioner.jpg?s=612x612&w=0&k=20&c=xqENxTqbyyahXcKhg2Yn_zBEjYKTbDv8PNS294XQo9c=" alt="Air Conditioning" />
                <div className="service-details">
                    <h3 className="service-title">Air Conditioning</h3>
                    <p className="service-description">Enjoy a cool and refreshing stay with our individually controlled air conditioning, designed to keep your room perfectly comfortable no matter the weather outside.</p>
                </div>
            </div>
                <div className="service-card">
                    <img src="https://images.pexels.com/photos/29463197/pexels-photo-29463197.jpeg" alt="Mini Bar" />
                    <div className="service-details">
                        <h3 className="service-title">Mini Bar</h3>
                        <p className="service-description">Relax with a delightful selection of complimentary snacks and beverages from your in-room mini bar, thoughtfully stocked for your convenience and enjoyment.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="https://images.pexels.com/photos/776122/pexels-photo-776122.jpeg" alt="Parking" />
                    <div className="service-details">
                        <h3 className="service-title">Parking</h3>
                        <p className="service-description">Travel with peace of mind using our secure on-site parking facilities. Convenient and easily accessible, with valet assistance available upon request.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/wifi.png" alt="WiFi" />
                    <div className="service-details">
                        <h3 className="service-title">WiFi</h3>
                        <p className="service-description">Stay connected effortlessly with our high-speed complimentary WiFi, available throughout the property for a smooth and reliable online experience.</p>
                    </div>
                </div>

            </section>
            {/* AVAILABLE ROOMS SECTION */}
            <section>

            </section>
        </div>
    );
}

export default HomePage;
