import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('hotelCart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('hotelCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (room, checkInDate, checkOutDate, numAdults, numChildren) => {
        // Check if room with same dates already exists
        const existingItemIndex = cartItems.findIndex(
            item => item.room.id === room.id && 
                    item.checkInDate === checkInDate && 
                    item.checkOutDate === checkOutDate
        );

        if (existingItemIndex !== -1) {
            // Update existing item
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                numAdults,
                numChildren
            };
            setCartItems(updatedCart);
            return { success: true, message: 'Cart updated successfully' };
        } else {
            // Add new item
            const cartItem = {
                id: Date.now(), // Unique ID for cart item
                room,
                checkInDate,
                checkOutDate,
                numAdults,
                numChildren,
                addedAt: new Date().toISOString()
            };
            setCartItems([...cartItems, cartItem]);
            return { success: true, message: 'Room added to cart successfully' };
        }
    };

    const removeFromCart = (cartItemId) => {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
    };

    const updateCartItem = (cartItemId, updates) => {
        setCartItems(cartItems.map(item => 
            item.id === cartItemId ? { ...item, ...updates } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('hotelCart');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const nights = calculateNights(item.checkInDate, item.checkOutDate);
            return total + (item.room.roomPrice * nights);
        }, 0);
    };

    const calculateNights = (checkIn, checkOut) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        return Math.round(Math.abs((endDate - startDate) / oneDay));
    };

    const getCartCount = () => {
        return cartItems.length;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getCartTotal,
        getCartCount,
        calculateNights
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
