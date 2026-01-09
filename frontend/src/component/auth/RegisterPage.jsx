import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';

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
        <div className="auth-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    {passwordError && <p style={{color: '#ff4757', fontSize: '0.85em', marginTop: '8px', fontWeight: '500'}}>{passwordError}</p>}
                    <div style={{marginTop: '10px', fontSize: '0.85em'}}>
                        <p style={{marginBottom: '8px', color: '#555', fontWeight: '500'}}>Password Requirements:</p>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                            <span style={{color: passwordStrength.hasLength ? '#2ed573' : '#666'}}>
                                {passwordStrength.hasLength ? '✓' : '○'} 8-12 characters long
                            </span>
                            <span style={{color: passwordStrength.hasUpperCase ? '#2ed573' : '#666'}}>
                                {passwordStrength.hasUpperCase ? '✓' : '○'} At least one uppercase letter
                            </span>
                            <span style={{color: passwordStrength.hasSpecialChar ? '#2ed573' : '#666'}}>
                                {passwordStrength.hasSpecialChar ? '✓' : '○'} At least one special character (!@#$%^&*...)
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleInputChange} required>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            <p className="register-link">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default RegisterPage;
