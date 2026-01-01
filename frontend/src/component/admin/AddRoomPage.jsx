import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);


    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };
        fetchRoomTypes();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const addRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError('All room details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this room?')) {
            return
        }

        try {
            // Debug: Check token and user role
            const token = localStorage.getItem('token');
            const userRole = localStorage.getItem('role');
            console.log('Token exists:', !!token);
            console.log('User role from localStorage:', userRole);
            console.log('All localStorage items:', { token: token?.substring(0, 20) + '...', role: userRole });
            
            if (!token) {
                setError('You are not logged in. Please login again.');
                setTimeout(() => setError(''), 5000);
                return;
            }

            // Check if user is admin (be flexible with role check)
            const isAdmin = userRole === 'ADMIN' || userRole === 'admin';
            console.log('Is Admin:', isAdmin);
            
            if (!isAdmin) {
                setError(`Access denied. Current role: ${userRole}. Admin privileges required. Please logout and login with admin account.`);
                setTimeout(() => setError(''), 8000);
                return;
            }

            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            // Remove $ sign and any non-numeric characters except decimal point
            const cleanPrice = roomDetails.roomPrice.replace(/[^0-9.]/g, '');
            formData.append('roomPrice', cleanPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            console.log('Sending request to add room...');
            const result = await ApiService.addRoom(formData);
            console.log('Response:', result);
            
            if (result.statusCode === 200) {
                setSuccess('Room Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding room:', error);
            console.error('Error response:', error.response);
            
            if (error.response?.status === 403) {
                setError('Access Denied (403). Your session may have expired or you do not have admin privileges. Please logout and login again as Admin.');
            } else {
                setError(error.response?.data?.message || error.message);
            }
            setTimeout(() => setError(''), 8000);
        }
    };

    return (
        <div className="edit-room-container">
            <h2>Add New Room</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-room-form">
                <div className="form-group">
                    {preview && (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Type</label>
                    <select value={roomDetails.roomType} onChange={handleRoomTypeChange}>
                        <option value="">Select a room type</option>
                        {roomTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newRoomType && (
                        <input
                            type="text"
                            name="roomType"
                            placeholder="Enter new room type"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Room Price</label>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={addRoom}>Add Room</button>
            </div>
        </div>
    );
};

export default AddRoomPage;
