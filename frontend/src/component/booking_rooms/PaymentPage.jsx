import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ApiService from '../../service/ApiService';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart, calculateNights } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [bookingConfirmations, setBookingConfirmations] = useState([]);

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        paypalEmail: '',
        billingAddress: '',
        city: '',
        zipCode: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePayment = () => {
        if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
            if (!paymentDetails.cardNumber || !paymentDetails.cardName || 
                !paymentDetails.expiryMonth || !paymentDetails.expiryYear || !paymentDetails.cvv) {
                setError('Please fill in all card details');
                return false;
            }
            if (paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
                setError('Invalid card number');
                return false;
            }
            if (paymentDetails.cvv.length !== 3) {
                setError('Invalid CVV');
                return false;
            }
        } else if (paymentMethod === 'paypal') {
            if (!paymentDetails.paypalEmail) {
                setError('Please enter your PayPal email');
                return false;
            }
        }

        if (!paymentDetails.billingAddress || !paymentDetails.city || 
            !paymentDetails.zipCode || !paymentDetails.country) {
            setError('Please fill in all billing address fields');
            return false;
        }

        return true;
    };

    const handlePayment = async () => {
        setError('');

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        if (!validatePayment()) {
            return;
        }

        setIsProcessing(true);

        try {
            // Get user profile
            const userProfile = await ApiService.getUserProfile();
            const userId = userProfile.user.id;

            console.log('Processing bookings for user:', userId);
            console.log('Cart items:', cartItems);

            // Process each booking
            const confirmations = [];
            const errors = [];
            
            for (const item of cartItems) {
                const booking = {
                    checkInDate: item.checkInDate,
                    checkOutDate: item.checkOutDate,
                    numOfAdults: item.numAdults,
                    numOfChildren: item.numChildren
                };

                console.log('Attempting to book room:', item.room.id, 'with data:', booking);

                try {
                    const response = await ApiService.bookRoom(item.room.id, userId, booking);
                    console.log('Booking response:', response);
                    
                    if (response.statusCode === 200) {
                        confirmations.push({
                            roomType: item.room.roomType,
                            confirmationCode: response.bookingConfirmationCode,
                            checkIn: item.checkInDate,
                            checkOut: item.checkOutDate
                        });
                    } else {
                        errors.push(`${item.room.roomType}: ${response.message || 'Unknown error'}`);
                    }
                } catch (err) {
                    console.error('Booking error for room:', item.room.roomType, err);
                    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
                    errors.push(`${item.room.roomType}: ${errorMessage}`);
                }
            }

            console.log('Confirmations:', confirmations);
            console.log('Errors:', errors);

            if (confirmations.length > 0) {
                setBookingConfirmations(confirmations);
                clearCart();
                
                // If there were some errors, show them
                if (errors.length > 0) {
                    setError(`Some bookings failed: ${errors.join(', ')}`);
                }
                
                // Show success message and redirect after 10 seconds
                setTimeout(() => {
                    navigate('/profile');
                }, 10000);
            } else {
                // All bookings failed
                const errorDetails = errors.length > 0 ? errors.join('; ') : 'Unknown error occurred';
                setError(`Failed to process bookings: ${errorDetails}`);
            }

        } catch (error) {
            console.error('Payment error:', error);
            setError(error.response?.data?.message || error.message || 'Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (bookingConfirmations.length > 0) {
        return (
            <div className="payment-page">
                <div className="payment-success">
                    <h2>✓ Payment Successful!</h2>
                    <p>Your bookings have been confirmed. Confirmation emails have been sent.</p>
                    <div className="confirmations-list">
                        {bookingConfirmations.map((conf, index) => (
                            <div key={index} className="confirmation-item">
                                <h4>{conf.roomType}</h4>
                                <p><strong>Confirmation Code:</strong> {conf.confirmationCode}</p>
                                <p><strong>Check-in:</strong> {conf.checkIn}</p>
                                <p><strong>Check-out:</strong> {conf.checkOut}</p>
                            </div>
                        ))}
                    </div>
                    <p className="redirect-message">Redirecting to your profile...</p>
                    <button className="btn-primary" onClick={() => navigate('/profile')}>
                        View My Bookings
                    </button>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="payment-page">
                <h2>Payment</h2>
                <p>Your cart is empty</p>
                <button className="btn-primary" onClick={() => navigate('/rooms')}>
                    Browse Rooms
                </button>
            </div>
        );
    }

    return (
        <div className="payment-page">
            <h2>Payment & Checkout</h2>
            
            {error && <div className="payment-error">{error}</div>}

            <div className="payment-container">
                <div className="payment-form">
                    <h3>Payment Method</h3>
                    <div className="payment-methods">
                        <label className={paymentMethod === 'credit-card' ? 'payment-option active' : 'payment-option'}>
                            <input
                                type="radio"
                                value="credit-card"
                                checked={paymentMethod === 'credit-card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Credit Card</span>
                        </label>
                        <label className={paymentMethod === 'debit-card' ? 'payment-option active' : 'payment-option'}>
                            <input
                                type="radio"
                                value="debit-card"
                                checked={paymentMethod === 'debit-card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Debit Card</span>
                        </label>
                        <label className={paymentMethod === 'paypal' ? 'payment-option active' : 'payment-option'}>
                            <input
                                type="radio"
                                value="paypal"
                                checked={paymentMethod === 'paypal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>PayPal</span>
                        </label>
                    </div>

                    {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                        <div className="card-details">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    value={paymentDetails.cardNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Cardholder Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    placeholder="John Doe"
                                    value={paymentDetails.cardName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Month</label>
                                    <select name="expiryMonth" value={paymentDetails.expiryMonth} onChange={handleInputChange}>
                                        <option value="">MM</option>
                                        {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                                            <option key={m} value={m.toString().padStart(2, '0')}>
                                                {m.toString().padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Expiry Year</label>
                                    <select name="expiryYear" value={paymentDetails.expiryYear} onChange={handleInputChange}>
                                        <option value="">YYYY</option>
                                        {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="123"
                                        maxLength="3"
                                        value={paymentDetails.cvv}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'paypal' && (
                        <div className="paypal-details">
                            <div className="form-group">
                                <label>PayPal Email</label>
                                <input
                                    type="email"
                                    name="paypalEmail"
                                    placeholder="your@email.com"
                                    value={paymentDetails.paypalEmail}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    )}

                    <h3>Billing Address</h3>
                    <div className="billing-address">
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="billingAddress"
                                placeholder="123 Main Street"
                                value={paymentDetails.billingAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="New York"
                                    value={paymentDetails.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="10001"
                                    value={paymentDetails.zipCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                placeholder="United States"
                                value={paymentDetails.country}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="order-summary-payment">
                    <h3>Order Summary</h3>
                    <div className="summary-items">
                        {cartItems.map((item, index) => (
                            <div key={item.id} className="summary-item">
                                <div className="item-info">
                                    <p className="item-name">{item.room.roomType}</p>
                                    <p className="item-dates">{item.checkInDate} to {item.checkOutDate}</p>
                                    <p className="item-guests">{item.numAdults} Adults, {item.numChildren} Children</p>
                                </div>
                                <p className="item-price">${item.room.roomPrice * calculateNights(item.checkInDate, item.checkOutDate)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <span>Total Amount:</span>
                        <span className="total-amount">${getCartTotal()}</span>
                    </div>
                    <button 
                        className="btn-pay" 
                        onClick={handlePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : `Pay $${getCartTotal()}`}
                    </button>
                    <button className="btn-back" onClick={() => navigate('/cart')}>
                        Back to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
