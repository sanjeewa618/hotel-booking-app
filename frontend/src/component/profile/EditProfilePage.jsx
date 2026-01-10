import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import './EditProfilePage.css';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [passwordStrength, setPasswordStrength] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
                setFormData({
                    name: response.user.name || '',
                    email: response.user.email || '',
                    phoneNumber: response.user.phoneNumber || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                if (response.user.profilePicture) {
                    setPreviewUrl(response.user.profilePicture);
                }
            } catch (error) {
                setError(error.message);
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

            window.ScrollReveal().reveal(".edit-profile-header", {
                ...scrollRevealOption,
                origin: "top",
                delay: 100,
            });

            window.ScrollReveal().reveal(".profile-picture-section", {
                ...scrollRevealOption,
                origin: "left",
                delay: 200,
            });

            window.ScrollReveal().reveal(".edit-forms-section", {
                ...scrollRevealOption,
                origin: "right",
                delay: 300,
            });

            window.ScrollReveal().reveal(".danger-zone", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 400,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Check password strength
        if (name === 'newPassword') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength(null);
            return;
        }
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        if (strength <= 1) setPasswordStrength('weak');
        else if (strength <= 3) setPasswordStrength('medium');
        else setPasswordStrength('strong');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should be less than 5MB');
                return;
            }
            
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePicture = () => {
        setProfilePicture(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        // Validation
        if (!formData.name || !formData.email || !formData.phoneNumber) {
            setError('Please fill in all required fields');
            return;
        }
        
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        
        try {
            setLoading(true);
            
            // Update basic profile info
            const updateData = {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            };
            
            // Add password fields if changing password
            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }
            
            await ApiService.updateUser(user.id, updateData);
            
            // Upload profile picture if changed
            if (profilePicture) {
                const formDataPicture = new FormData();
                formDataPicture.append('profilePicture', profilePicture);
                // Assuming you have an endpoint for profile picture upload
                // await ApiService.uploadProfilePicture(user.id, formDataPicture);
            }
            
            setSuccess('Profile updated successfully!');
            
            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
            
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProfile = async () => {
        const confirmed = window.confirm(
            '⚠️ Are you absolutely sure you want to delete your account?\n\n' +
            'This action cannot be undone and will permanently delete:\n' +
            '• Your profile information\n' +
            '• All your bookings\n' +
            '• All your data\n\n' +
            'Type "DELETE" to confirm'
        );
        
        if (!confirmed) return;
        
        const confirmation = prompt('Please type "DELETE" to confirm account deletion:');
        if (confirmation !== 'DELETE') {
            alert('Account deletion cancelled. The text did not match.');
            return;
        }
        
        try {
            setLoading(true);
            await ApiService.deleteUser(user.id);
            alert('Your account has been successfully deleted.');
            navigate('/signup');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return names[0][0].toUpperCase() + names[1][0].toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <div className="edit-profile-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Updating your profile...</p>
                    </div>
                </div>
            )}
            
            <div className="edit-profile-wrapper">
                {/* Header */}
                <div className="edit-profile-header">
                    <div className="header-left">
                        <button className="back-button" onClick={() => navigate('/profile')}>
                            ←
                        </button>
                        <div>
                            <h1 className="page-title">Edit Profile</h1>
                            <p className="page-subtitle">Update your personal information and settings</p>
                        </div>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="success-message">
                        <span className="message-icon">✓</span>
                        <span>{success}</span>
                    </div>
                )}
                
                {error && (
                    <div className="error-message">
                        <span className="message-icon">⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* Grid Layout: Profile Picture + Edit Forms */}
                <div className="profile-content-grid">
                    {/* Profile Picture Section - Left Column */}
                    <div className="profile-picture-section">
                        <h2 className="section-title">
                            <span className="section-icon">📷</span>
                            Profile Picture
                        </h2>
                        <div className="picture-upload-area">
                            <div className="current-picture">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile" className="profile-picture-preview" />
                                ) : (
                                    <div className="picture-placeholder">
                                        {getInitials(formData.name)}
                                    </div>
                                )}
                            </div>
                            <div className="picture-actions">
                                <div className="picture-info">
                                    <h4>Update your profile picture</h4>
                                    <p>JPG, PNG or GIF. Max size 5MB.</p>
                                </div>
                                <div className="picture-buttons">
                                    <label htmlFor="profile-picture-input" className="upload-btn">
                                        📁 Choose Photo
                                    </label>
                                    <input
                                        id="profile-picture-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    {previewUrl && (
                                        <button className="remove-picture-btn" onClick={handleRemovePicture}>
                                            🗑️ Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Forms Section - Right Column */}
                    <form onSubmit={handleSubmit} className="edit-forms-section">
                    <h2 className="section-title">
                        <span className="section-icon">📝</span>
                        Personal Information
                    </h2>
                    
                    <div className="form-grid">
                        {/* Name */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">👤</span>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">📧</span>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">📱</span>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                    </div>

                   

                    {/* Password Change Section */}
                    <h2 className="section-title">
                        <span className="section-icon">🔒</span>
                        Change Password (Optional)
                    </h2>
                    
                    <div className="form-grid">
                        {/* Current Password */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">🔑</span>
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter current password"
                            />
                            <p className="input-hint">Leave blank if you don't want to change password</p>
                        </div>

                        {/* New Password */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">🔐</span>
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter new password"
                            />
                            {passwordStrength && (
                                <div className="password-strength">
                                    <div className="strength-bar">
                                        <div className={`strength-fill strength-${passwordStrength}`}></div>
                                    </div>
                                    <p className={`strength-text strength-${passwordStrength}-text`}>
                                        Password strength: {passwordStrength.toUpperCase()}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">✓</span>
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button type="submit" className="save-button" disabled={loading}>
                            💾 Save Changes
                        </button>
                        <button type="button" className="cancel-button" onClick={() => navigate('/profile')}>
                            ✕ Cancel
                        </button>
                    </div>
                </form>
                </div>

                {/* Danger Zone - Full Width Below Grid */}
                <div className="danger-zone">
                    <h2 className="section-title">
                        <span className="section-icon">⚠️</span>
                        Danger Zone
                    </h2>
                    <div className="danger-zone-content">
                        <div className="danger-info">
                            <h4>Delete Account</h4>
                            <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                        </div>
                        <button className="delete-account-btn" onClick={handleDeleteProfile}>
                            🗑️ Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
