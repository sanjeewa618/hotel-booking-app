import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

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
                delay: 300,
            });

            window.ScrollReveal().reveal(".auth-button", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 500,
            });

            window.ScrollReveal().reveal(".auth-divider", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 600,
            });

            window.ScrollReveal().reveal(".social-login-btn", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 100,
                delay: 700,
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        try {
            const response = await ApiService.loginUser({ email, password });
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google OAuth login
        // For now, showing alert - replace with actual OAuth implementation
        alert('Google login will be implemented with OAuth 2.0. Please configure Google OAuth credentials.');
        // window.location.href = 'YOUR_BACKEND_URL/oauth2/authorization/google';
    };

    const handleFacebookLogin = () => {
        // Implement Facebook OAuth login
        // For now, showing alert - replace with actual OAuth implementation
        alert('Facebook login will be implemented with OAuth 2.0. Please configure Facebook OAuth credentials.');
        // window.location.href = 'YOUR_BACKEND_URL/oauth2/authorization/facebook';
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Sign in to continue to Aurora Hotel</p>
            </div>

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                        <span className="input-icon">📧</span>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                        <span className="input-icon">🔒</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                </div>

                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                </div>

                {/* Social Login Buttons */}
                <div className="social-login-container">
                    <button
                        type="button"
                        className="social-login-btn google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <button
                        type="button"
                        className="social-login-btn facebook-btn"
                        onClick={handleFacebookLogin}
                    >
                        <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>Continue with Facebook</span>
                    </button>
                </div>

                <div className="auth-divider">
                    <span className="divider-line"></span>
                    <span className="divider-text">or</span>
                    <span className="divider-line"></span>
                </div>

                <button type="submit" className="auth-button">Login</button>
            </form>

            <p className="register-link">
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default LoginPage;
