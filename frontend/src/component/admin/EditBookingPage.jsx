import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
    const [error, setError] = useState(null); // Track any errors
    const [success, setSuccessMessage] = useState(null); // Track any errors

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    // ScrollReveal animations
    useEffect(() => {
        if (window.ScrollReveal && bookingDetails) {
            const scrollRevealOption = {
                distance: "50px",
                duration: 1000,
                easing: "ease-in-out",
                origin: "bottom",
                reset: false,
            };

            window.ScrollReveal().reveal(".booking-detail-title", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            window.ScrollReveal().reveal(".booking-section-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 200,
                delay: 400,
            });

            window.ScrollReveal().reveal(".acheive-booking", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 800,
            });
        }
    }, [bookingDetails]);
    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to Archive this booking?')) {
            return; // Do nothing if the user cancels
        }
        try {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            
            if (!token) {
                setError('Please login to perform this action');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                return;
            }

            if (role !== 'ADMIN') {
                setError('Only administrators can archive bookings');
                setTimeout(() => setError(''), 5000);
                return;
            }         
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The booking was Successfully Archived")
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            console.error('Archive booking error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to archive booking. Please check your permissions.';
            setError(errorMessage);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2 className="booking-detail-title">Booking Detail</h2>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <div className="booking-section-card">
                        <h3 className="section-heading">Booking Details</h3>
                        <div className="detail-item">
                            <span className="detail-label">Confirmation Code:</span>
                            <span className="detail-value">{bookingDetails.bookingConfirmationCode}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Check-in Date:</span>
                            <span className="detail-value">{bookingDetails.checkInDate}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Check-out Date:</span>
                            <span className="detail-value">{bookingDetails.checkOutDate}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Num Of Adults:</span>
                            <span className="detail-value">{bookingDetails.numOfAdults}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Num Of Children:</span>
                            <span className="detail-value">{bookingDetails.numOfChildren}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Guest Email:</span>
                            <span className="detail-value">{bookingDetails.guestEmail}</span>
                        </div>
                    </div>

                    <div className="booking-section-card">
                        <h3 className="section-heading">Booker Details</h3>
                        <div className="detail-item">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{bookingDetails.user.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{bookingDetails.user.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Phone Number:</span>
                            <span className="detail-value">{bookingDetails.user.phoneNumber}</span>
                        </div>
                    </div>

                    <div className="booking-section-card">
                        <h3 className="section-heading">Room Details</h3>
                        <div className="detail-item">
                            <span className="detail-label">Room Type:</span>
                            <span className="detail-value">{bookingDetails.room.roomType}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Room Price:</span>
                            <span className="detail-value price">${bookingDetails.room.roomPrice}</span>
                        </div>
                        <div className="detail-item-full">
                            <span className="detail-label">Room Description:</span>
                            <p className="detail-description">{bookingDetails.room.roomDescription}</p>
                        </div>
                        <img className="room-detail-image" src={bookingDetails.room.roomPhotoUrl} alt="Room" />
                    </div>

                    <button
                        className="acheive-booking"
                        onClick={() => acheiveBooking(bookingDetails.id)}>Archive Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;
