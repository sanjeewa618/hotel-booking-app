import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user)

            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    // ScrollReveal animations
    useEffect(() => {
        if (window.ScrollReveal && user) {
            const scrollRevealOption = {
                distance: "50px",
                duration: 1000,
                easing: "ease-in-out",
                origin: "bottom",
                reset: false,
            };

            window.ScrollReveal().reveal(".profile-page h2", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            window.ScrollReveal().reveal(".profile-actions", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 300,
            });

            window.ScrollReveal().reveal(".profile-details", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 400,
            });

            window.ScrollReveal().reveal(".bookings-section", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 500,
            });

            window.ScrollReveal().reveal(".booking-item", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 200,
                delay: 600,
            });
        }
    }, [user]);

    const handleLogout = () => {
        ApiService.logout();
        window.location.href = '/home';
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
            )}
            <div className="bookings-section">
                <h3>My Booking History</h3>
                <div className="booking-list">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                                <p><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                                <p><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                                <p><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                                <p><strong>Room Type:</strong> {booking.room.roomType}</p>
                                <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
