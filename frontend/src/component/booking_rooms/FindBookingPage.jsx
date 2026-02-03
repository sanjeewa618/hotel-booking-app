import React, { useState } from 'react';
import ApiService from '../../service/ApiService';

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a booking confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }

        setIsLoading(true);
        setError(null);
        setBookingDetails(null);

        console.log('Searching for booking with code:', confirmationCode);

        try {
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            console.log('Booking API Response:', response);

            if (response.statusCode === 200 && response.booking) {
                setBookingDetails(response.booking);
                setError(null);
            } else {
                setError(response.message || 'Booking not found');
            }
        } catch (error) {
            console.error('Error fetching booking:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch booking details';
            setError(errorMessage);
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="find-booking-page">
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Find Booking</h2>
            <div className="search-container">
                <input
                    className="booking-code-input"
                    required
                    type="text"
                    placeholder="Enter your booking confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoComplete="off"
                    disabled={isLoading}
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Find'}
                </button>
            </div>
            {error && <p className="error-message" style={{ color: 'red', marginTop: '20px', fontSize: '16px' }}>{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3 style={{ 
                        fontSize: '2rem', 
                        fontWeight: '700', 
                        background: 'linear-gradient(135deg, #007F86 0%, #FF8C42 100%)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textAlign: 'center',
                        margin: '20px auto',
                        padding: '10px 0',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        maxWidth: '600px',
                        wordBreak: 'break-word'
                    }}>
                         BOOKING DETAILS 
                    </h3>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Num Of Adults: {bookingDetails.numOfAdults}</p>
                    <p>Num Of Children: {bookingDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Detials</h3>
                    <div>
                        <p> Name: {bookingDetails.user.name}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <div>
                        <p> Room Type: {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;
