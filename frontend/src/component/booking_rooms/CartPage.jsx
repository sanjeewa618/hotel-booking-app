import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, clearCart, getCartTotal, calculateNights } = useCart();
    const [compareMode, setCompareMode] = useState(false);

    const handleRemoveItem = (cartItemId) => {
        if (window.confirm('Remove this room from cart?')) {
            removeFromCart(cartItemId);
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Clear entire cart?')) {
            clearCart();
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        navigate('/payment');
    };

    const getItemTotal = (item) => {
        const nights = calculateNights(item.checkInDate, item.checkOutDate);
        return item.room.roomPrice * nights;
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <h2>Shopping Cart</h2>
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button className="btn-primary" onClick={() => navigate('/rooms')}>
                        Browse Rooms
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h2>Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>
                <div className="cart-actions">
                    <button className="btn-compare" onClick={() => setCompareMode(!compareMode)}>
                        {compareMode ? 'List View' : 'Compare Rooms'}
                    </button>
                    <button className="btn-clear-cart" onClick={handleClearCart}>
                        Clear Cart
                    </button>
                </div>
            </div>

            {compareMode ? (
                <div className="compare-view">
                    <h3>Compare Rooms</h3>
                    <div className="compare-grid">
                        {cartItems.map((item) => (
                            <div key={item.id} className="compare-card">
                                <img src={item.room.roomPhotoUrl} alt={item.room.roomType} />
                                <h4>{item.room.roomType}</h4>
                                <div className="compare-details">
                                    <p><strong>Price per night:</strong> ${item.room.roomPrice}</p>
                                    <p><strong>Check-in:</strong> {item.checkInDate}</p>
                                    <p><strong>Check-out:</strong> {item.checkOutDate}</p>
                                    <p><strong>Nights:</strong> {calculateNights(item.checkInDate, item.checkOutDate)}</p>
                                    <p><strong>Guests:</strong> {item.numAdults} Adults, {item.numChildren} Children</p>
                                    <p className="total-price"><strong>Total:</strong> ${getItemTotal(item)}</p>
                                </div>
                                <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.room.roomPhotoUrl} alt={item.room.roomType} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.room.roomType}</h3>
                                <p className="cart-item-description">{item.room.roomDescription}</p>
                                <div className="cart-item-info">
                                    <p><strong>Check-in:</strong> {item.checkInDate}</p>
                                    <p><strong>Check-out:</strong> {item.checkOutDate}</p>
                                    <p><strong>Nights:</strong> {calculateNights(item.checkInDate, item.checkOutDate)}</p>
                                    <p><strong>Guests:</strong> {item.numAdults} Adults, {item.numChildren} Children</p>
                                </div>
                            </div>
                            <div className="cart-item-price">
                                <p className="price-per-night">${item.room.roomPrice}/night</p>
                                <p className="item-total">Total: ${getItemTotal(item)}</p>
                                <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="cart-summary">
                <div className="payment-methods-section">
                    <h3>We Accept</h3>
                    <p className="payment-subtitle">Secure payment options available</p>
                    <div className="payment-methods-grid">
                        <div className="payment-method-card">
                            <i className="payment-icon">💳</i>
                            <span>Credit Card</span>
                        </div>
                        <div className="payment-method-card">
                            <i className="payment-icon">💵</i>
                            <span>Debit Card</span>
                        </div>
                        <div className="payment-method-card">
                            <i className="payment-icon">🏦</i>
                            <span>Net Banking</span>
                        </div>
                        <div className="payment-method-card">
                            <i className="payment-icon">📱</i>
                            <span>UPI</span>
                        </div>
                        <div className="payment-method-card">
                            <i className="payment-icon">💰</i>
                            <span>Wallet</span>
                        </div>
                        <div className="payment-method-card">
                            <i className="payment-icon">🌐</i>
                            <span>PayPal</span>
                        </div>
                    </div>
                    <div className="payment-brands">
                        <div className="brand-badge visa">VISA</div>
                        <div className="brand-badge mastercard">MasterCard</div>
                        <div className="brand-badge amex">AMEX</div>
                        <div className="brand-badge discover">Discover</div>
                    </div>
                    <div className="secure-payment">
                        <i className="secure-icon">🔒</i>
                        <div className="secure-text">
                            <strong>100% Secure Payment</strong>
                            <p>Your payment information is encrypted and secure</p>
                        </div>
                    </div>
                </div>
                
                <div className="summary-content">
                    <h3>Order Summary</h3>
                    <div className="summary-line">
                        <span>Total Items:</span>
                        <span>{cartItems.length}</span>
                    </div>
                    <div className="summary-line">
                        <span>Total Nights:</span>
                        <span>
                            {cartItems.reduce((total, item) => 
                                total + calculateNights(item.checkInDate, item.checkOutDate), 0
                            )}
                        </span>
                        
                    </div>
                    <div className="summary-line total">
                        <span>Grand Total:</span>
                        <span>${getCartTotal()}</span>
                    </div>
                    <button className="btn-checkout" onClick={handleCheckout}>
                        Proceed to Payment
                    </button>
                    <button className="btn-continue" onClick={() => navigate('/rooms')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
