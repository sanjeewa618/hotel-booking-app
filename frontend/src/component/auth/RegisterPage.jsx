import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'USER'
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        hasLength: false,
        hasUpperCase: false,
        hasSpecialChar: false
    });

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

            window.ScrollReveal().reveal(".auth-container h2", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            window.ScrollReveal().reveal(".form-group", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
                delay: 400,
            });

            window.ScrollReveal().reveal(".auth-button", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 700,
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Validate password on change
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const maxLength = 12;
        // Match backend validation exactly
        const backendRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,12}$/;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const hasLength = password.length >= minLength && password.length <= maxLength;
        
        // Update password strength indicators
        setPasswordStrength({
            hasLength,
            hasUpperCase,
            hasSpecialChar
        });
        
        // Validate using the exact backend pattern
        if (!backendRegex.test(password)) {
            if (!hasLength) {
                setPasswordError(`Password must be ${minLength}-${maxLength} characters long`);
            } else if (!hasUpperCase) {
                setPasswordError('Password must contain at least one uppercase letter');
            } else if (!hasSpecialChar) {
                setPasswordError('Password must contain at least one special character');
            } else {
                setPasswordError('Password does not meet requirements');
            }
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber, role } = formData;
        if (!name || !email || !password || !phoneNumber || !role) {
            return false;
        }
        if (!validatePassword(password)) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage(passwordError || 'Please fill all the fields correctly.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
        try {
            console.log('Submitting registration with data:', formData);
            // Call the register method from ApiService
            const response = await ApiService.registerUser(formData);

            // Check if the response is successful
            if (response.statusCode === 200) {
                // Clear the form fields after successful registration
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    role: 'USER'
                });
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 3000);
            }
        }
         catch (error) {
            console.log('Registration error:', error);
            console.log('Error response:', error.response?.data);
            const errorMsg = error.response?.data?.message || error.message;
            setErrorMessage(errorMsg);
            setTimeout(() => setErrorMessage(''), 10000);
        }
    };

    return (
        <div className="auth-page-wrapper">
            {/* Left Section - Hotel Branding */}
            <div className="auth-left-section">
                <div className="auth-illustration">
                    <svg viewBox="0 0 400 400" className="hotel-illustration" xmlns="http://www.w3.org/2000/svg">
                        {/* Background Circle */}
                        <circle cx="200" cy="200" r="180" fill="rgba(255, 255, 255, 0.15)" />
                        
                        {/* Hotel Building - Main Focus */}
                        <g transform="translate(150, 100)">
                            {/* Building Base */}
                            <rect x="0" y="60" width="100" height="140" rx="8" fill="#007F86" />
                            
                            {/* Windows - Multiple Rows */}
                            <rect x="10" y="70" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="35" y="70" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="60" y="70" width="18" height="20" rx="3" fill="#00c4d4" />
                            
                            <rect x="10" y="100" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="35" y="100" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="60" y="100" width="18" height="20" rx="3" fill="#00c4d4" />
                            
                            <rect x="10" y="130" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="35" y="130" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="60" y="130" width="18" height="20" rx="3" fill="#00c4d4" />
                            
                            <rect x="10" y="160" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="35" y="160" width="18" height="20" rx="3" fill="#00c4d4" />
                            <rect x="60" y="160" width="18" height="20" rx="3" fill="#00c4d4" />
                            
                            {/* Entrance Door */}
                            <rect x="35" y="180" width="30" height="20" rx="3" fill="#00a3ad" />
                            <circle cx="58" cy="190" r="2" fill="#ffffff" />
                            
                            {/* Roof */}
                            <polygon points="0,60 50,35 100,60" fill="#00a3ad" />
                            
                            {/* Flag on top */}
                            <rect x="48" y="30" width="4" height="10" fill="#00a3ad" />
                            <path d="M52 30 L65 33 L52 36 Z" fill="#00c4d4" />
                        </g>
                        
                        {/* Luggage/Suitcase */}
                        <g transform="translate(80, 250)">
                            <rect x="0" y="10" width="50" height="40" rx="5" fill="#00a3ad" />
                            <rect x="5" y="15" width="40" height="5" fill="#007F86" />
                            <rect x="20" y="0" width="10" height="12" rx="3" fill="#00a3ad" />
                            <circle cx="12" cy="52" r="5" fill="#2c3e50" />
                            <circle cx="38" cy="52" r="5" fill="#2c3e50" />
                        </g>
                        
                        {/* Room Key Card */}
                        <g transform="translate(270, 240)">
                            <rect x="0" y="0" width="45" height="30" rx="4" fill="#ffffff" />
                            <rect x="5" y="5" width="35" height="8" rx="2" fill="#007F86" />
                            <rect x="5" y="16" width="15" height="3" rx="1" fill="#e0e0e0" />
                            <rect x="5" y="21" width="20" height="3" rx="1" fill="#e0e0e0" />
                            <circle cx="38" cy="22" r="3" fill="#00a3ad" />
                        </g>
                        
                        {/* Calendar/Booking Icon */}
                        <g transform="translate(85, 140)">
                            <rect x="0" y="8" width="40" height="45" rx="4" fill="#ffffff" />
                            <rect x="0" y="8" width="40" height="12" rx="4" fill="#007F86" />
                            <rect x="8" y="3" width="5" height="10" rx="2" fill="#00a3ad" />
                            <rect x="27" y="3" width="5" height="10" rx="2" fill="#00a3ad" />
                            <text x="20" y="38" fontSize="20" fontWeight="bold" fill="#007F86" textAnchor="middle">15</text>
                        </g>
                        
                        {/* Five Star Rating */}
                        <g transform="translate(270, 140)">
                            <polygon points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6" fill="#00c4d4" />
                            <polygon points="8,23 10,29 16,29 11,33 13,39 8,35 3,39 5,33 0,29 6,29" fill="#00c4d4" />
                        </g>
                        
                        {/* Checkmark in Circle */}
                        <circle cx="90" cy="330" r="18" fill="#00c4d4" opacity="0.8" />
                        <path d="M82 330 L88 336 L98 324" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Decorative dots */}
                        <circle cx="120" cy="90" r="6" fill="#00c4d4" opacity="0.4" />
                        <circle cx="300" cy="320" r="8" fill="#00a3ad" opacity="0.3" />
                        <circle cx="340" cy="180" r="5" fill="#00c4d4" opacity="0.5" />
                        
                        {/* Sparkles */}
                        <circle cx="310" cy="95" r="3" fill="#ffffff" opacity="0.9" />
                        <circle cx="315" cy="102" r="2" fill="#ffffff" opacity="0.8" />
                    </svg>
                </div>

                <div className="auth-info">
                    <h3>Experience Luxury Living</h3>
                    <p>Welcome to Aurora Hotel - where comfort meets elegance. Book your perfect stay with us and enjoy world-class amenities and exceptional service.</p>
                </div>

              
            </div>

            {/* Right Section - Registration Form */}
            <div className="auth-right-section">
                <div className="auth-form-container">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    
                    <h2 className="auth-form-title">Create Account</h2>
                    <p className="auth-form-subtitle">Register your account</p>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter your full name"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉️</span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter your email"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="input-wrapper">
                                <span className="input-icon">📱</span>
                                <input 
                                    type="text" 
                                    name="phoneNumber" 
                                    value={formData.phoneNumber} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter your phone number"
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleInputChange} 
                                    placeholder="Create a strong password"
                                    required 
                                />
                            </div>
                            {passwordError && <p className="password-error">{passwordError}</p>}
                            <div className="password-requirements">
                                <p className="requirements-title">Password Requirements:</p>
                                <div className="requirements-list">
                                    <span className={passwordStrength.hasLength ? 'requirement-met' : 'requirement-unmet'}>
                                        {passwordStrength.hasLength ? '✓' : '○'} 8-12 characters long
                                    </span>
                                    <span className={passwordStrength.hasUpperCase ? 'requirement-met' : 'requirement-unmet'}>
                                        {passwordStrength.hasUpperCase ? '✓' : '○'} At least one uppercase letter
                                    </span>
                                    <span className={passwordStrength.hasSpecialChar ? 'requirement-met' : 'requirement-unmet'}>
                                        {passwordStrength.hasSpecialChar ? '✓' : '○'} At least one special character
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👥</span>
                                <select 
                                    name="role" 
                                    value={formData.role} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="auth-button">Create Account</button>
                    </form>

                    <p className="register-link">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
