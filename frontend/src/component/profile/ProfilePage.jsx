import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './ProfilePage.css';


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
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
                opacity: 0,
            };

            window.ScrollReveal().reveal(".dashboard-header", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            window.ScrollReveal().reveal(".profile-details-card", {
                ...scrollRevealOption,
                origin: "left",
                delay: 300,
            });

            window.ScrollReveal().reveal(".quick-actions-section", {
                ...scrollRevealOption,
                origin: "right",
                delay: 400,
            });

            window.ScrollReveal().reveal(".bookings-history-section", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 500,
            });

            window.ScrollReveal().reveal(".booking-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
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

    const handleBrowseRooms = () => {
        navigate('/rooms');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return names[0][0].toUpperCase() + names[1][0].toUpperCase();
        }
        return name[0].toUpperCase();
    };

    if (loading) {
        return (
            <div className="profile-page-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page-container">
            <div className="profile-dashboard-wrapper">
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="user-welcome">
                            <h1 className="welcome-title">Welcome back, {user?.name || 'Guest'}!</h1>
                            <p className="welcome-subtitle">Manage your profile, bookings, and preferences</p>
                        </div>
                        <div className="profile-avatar-section">
                            <div className="avatar-placeholder">
                                {user?.profilePicture ? (
                                    <img src={user.profilePicture} alt="Profile" className="profile-avatar" />
                                ) : (
                                    <span>{getInitials(user?.name)}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="header-btn btn-edit" onClick={handleEditProfile}>
                            ✏️ Edit Profile
                        </button>
                        <button className="header-btn btn-rooms" onClick={handleBrowseRooms}>
                            🏨 Browse Rooms
                        </button>
                        <button className="header-btn btn-logout" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* Dashboard Grid */}
                <div className="dashboard-grid">
                    {/* Profile Details Card */}
                    <div className="profile-details-card">
                        <div className="card-header">
                            <span className="card-icon">👤</span>
                            <h3 className="card-title">Profile Details</h3>
                        </div>
                        {user && (
                            <>
                                <div className="detail-item">
                                    <span className="detail-icon">👤</span>
                                    <div className="detail-content">
                                        <div className="detail-label">Full Name</div>
                                        <div className="detail-value">{user.name}</div>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">📧</span>
                                    <div className="detail-content">
                                        <div className="detail-label">Email Address</div>
                                        <div className="detail-value">{user.email}</div>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">📱</span>
                                    <div className="detail-content">
                                        <div className="detail-label">Phone Number</div>
                                        <div className="detail-value">{user.phoneNumber}</div>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-icon">🔑</span>
                                    <div className="detail-content">
                                        <div className="detail-label">Account Role</div>
                                        <div className="detail-value">{user.role || 'User'}</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Quick Actions */}
                        <div className="quick-actions-section">
                            <div className="card-header">
                                <span className="card-icon">⚡</span>
                                <h3 className="card-title">Quick Actions</h3>
                            </div>
                            <div className="quick-actions-grid">
                                <div className="quick-action-btn" onClick={handleEditProfile}>
                                    <span className="quick-action-icon">✏️</span>
                                    <h4 className="quick-action-title">Edit Profile</h4>
                                    <p className="quick-action-desc">Update your information</p>
                                </div>
                                <div className="quick-action-btn" onClick={() => navigate('/edit-profile')}>
                                    <span className="quick-action-icon">🔒</span>
                                    <h4 className="quick-action-title">Change Password</h4>
                                    <p className="quick-action-desc">Update your password</p>
                                </div>
                                <div className="quick-action-btn" onClick={handleBrowseRooms}>
                                    <span className="quick-action-icon">🔍</span>
                                    <h4 className="quick-action-title">Browse Rooms</h4>
                                    <p className="quick-action-desc">Find your next stay</p>
                                </div>
                                <div className="quick-action-btn" onClick={() => navigate('/find-booking')}>
                                    <span className="quick-action-icon">🔎</span>
                                    <h4 className="quick-action-title">Find Booking</h4>
                                    <p className="quick-action-desc">Search by code</p>
                                </div>
                            </div>
                        </div>

                        {/* Booking History */}
                        <div className="bookings-history-section">
                            <div className="section-header">
                                <div className="card-header" style={{ border: 'none', padding: 0, margin: 0 }}>
                                    <span className="card-icon">📚</span>
                                    <h3 className="card-title">Booking History</h3>
                                </div>
                                {user && user.bookings && user.bookings.length > 0 && (
                                    <span className="booking-count">{user.bookings.length} Booking{user.bookings.length !== 1 ? 's' : ''}</span>
                                )}
                            </div>
                            
                            <div className="bookings-list">
                                {user && user.bookings && user.bookings.length > 0 ? (
                                    user.bookings.map((booking) => (
                                        <div key={booking.id} className="booking-card">
                                            <div className="booking-card-content">
                                                <div className="booking-image-container">
                                                    <img 
                                                        src={booking.room.roomPhotoUrl} 
                                                        alt={booking.room.roomType} 
                                                        className="booking-room-image" 
                                                    />
                                                    <div className="booking-status-badge">Confirmed</div>
                                                </div>
                                                <div className="booking-details">
                                                    <div className="booking-header">
                                                        <span className="booking-code">
                                                            📋 {booking.bookingConfirmationCode}
                                                        </span>
                                                        <span className="room-type-badge">
                                                            {booking.room.roomType}
                                                        </span>
                                                    </div>
                                                    <div className="booking-info-grid">
                                                        <div className="booking-info-item">
                                                            <span className="booking-info-icon">📅</span>
                                                            <div className="booking-info-content">
                                                                <div className="info-label">Check-in</div>
                                                                <div className="info-value">{booking.checkInDate}</div>
                                                            </div>
                                                        </div>
                                                        <div className="booking-info-item">
                                                            <span className="booking-info-icon">📅</span>
                                                            <div className="booking-info-content">
                                                                <div className="info-label">Check-out</div>
                                                                <div className="info-value">{booking.checkOutDate}</div>
                                                            </div>
                                                        </div>
                                                        <div className="booking-info-item">
                                                            <span className="booking-info-icon">👥</span>
                                                            <div className="booking-info-content">
                                                                <div className="info-label">Guests</div>
                                                                <div className="info-value">{booking.totalNumOfGuest}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-bookings">
                                        <div className="empty-icon">📭</div>
                                        <h3 className="empty-title">No Bookings Yet</h3>
                                        <p className="empty-description">Start your journey by booking your first room!</p>
                                        <button className="browse-rooms-btn" onClick={handleBrowseRooms}>
                                            Browse Available Rooms
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
