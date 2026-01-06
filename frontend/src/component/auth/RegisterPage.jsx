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
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        if (password.length < minLength || password.length > maxLength) {
            setPasswordError(`Password must be ${minLength}-${maxLength} characters long`);
            return false;
        }
        if (!hasUpperCase) {
            setPasswordError('Password must contain at least one uppercase letter');
            return false;
        }
        if (!hasSpecialChar) {
            setPasswordError('Password must contain at least one special character');
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
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
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
                    {passwordError && <p style={{color: 'red', fontSize: '0.85em', marginTop: '5px'}}>{passwordError}</p>}
                    <p style={{fontSize: '0.85em', marginTop: '5px', color: '#666'}}>
                        Password must be 8-12 characters and include:<br/>
                        • At least one uppercase letter<br/>
                        • At least one special character (!@#$%^&*...)
                    </p>
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
