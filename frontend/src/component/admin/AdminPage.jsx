import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import './AdminPage.css';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const [stats, setStats] = useState({
        totalRooms: 0,
        totalBookings: 0,
        totalUsers: 0,
        availableRooms: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch admin profile
                const profileResponse = await ApiService.getUserProfile();
                console.log('Admin Profile:', profileResponse);
                setAdminName(profileResponse.user.name);

                // Fetch all rooms
                const roomsResponse = await ApiService.getAllRooms();
                const allRooms = roomsResponse.roomList || [];
                console.log('All Rooms Response:', roomsResponse);
                console.log('Total Rooms:', allRooms.length);

                // Fetch all bookings
                const bookingsResponse = await ApiService.getAllBookings();
                console.log('All Bookings Response:', bookingsResponse);
                const allBookings = bookingsResponse.bookingList || [];
                console.log('Total Bookings:', allBookings.length);
                console.log('Bookings:', allBookings);

                // Fetch all users
                const usersResponse = await ApiService.getAllUsers();
                const allUsers = usersResponse.userList || [];
                console.log('Total Users:', allUsers.length);

                // Fetch available rooms
                const availableRoomsResponse = await ApiService.getAllAvailableRooms();
                const availableRooms = availableRoomsResponse.roomList || [];
                console.log('Available Rooms:', availableRooms.length);

                // Set statistics
                const statsData = {
                    totalRooms: allRooms.length,
                    totalBookings: allBookings.length,
                    totalUsers: allUsers.length,
                    availableRooms: availableRooms.length
                };
                console.log('Stats Data:', statsData);
                setStats(statsData);

                // Get recent bookings (last 5)
                const sortedBookings = allBookings
                    .sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate))
                    .slice(0, 5);
                setRecentBookings(sortedBookings);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                console.error('Error details:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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

            window.ScrollReveal().reveal(".admin-header", {
                ...scrollRevealOption,
                origin: "top",
                delay: 200,
            });

            window.ScrollReveal().reveal(".stat-card", {
                ...scrollRevealOption,
                origin: "bottom",
                interval: 150,
                delay: 400,
            });

            window.ScrollReveal().reveal(".quick-actions", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 600,
            });

            window.ScrollReveal().reveal(".recent-bookings", {
                ...scrollRevealOption,
                origin: "bottom",
                delay: 800,
            });
        }
    }, [loading]);

    // Derived stats
    const occupiedRooms = stats.totalRooms - stats.availableRooms;
    const occupancyRate = stats.totalRooms > 0 ? Math.round((occupiedRooms / stats.totalRooms) * 100) : 0;

    // Chart calculations (Donut)
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (occupancyRate / 100) * circumference;

    if (loading) {
        return (
            <div className="loading-container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo-container">
                    <div className="logo-icon">AH</div>
                    <div className="brand-text">
                        <h2>AuroraHotel</h2>
                        <p>Admin Console</p>
                    </div>
                </div>

                <div className="nav-menu">
                    <div className="nav-item">
                        <div className="nav-link active">
                            <span>📊</span> Dashboard
                        </div>
                    </div>
                    <div className="nav-item">
                        <div className="nav-link" onClick={() => navigate('/admin/manage-bookings')}>
                            <span>📅</span> Bookings
                        </div>
                    </div>
                    <div className="nav-item">
                        <div className="nav-link" onClick={() => navigate('/admin/manage-rooms')}>
                            <span>🛏️</span> Rooms
                        </div>
                    </div>
                    <div className="nav-item">
                        <div className="nav-link" onClick={() => navigate('/admin/manage-users')}>
                            <span>👥</span> Guests
                        </div>
                    </div>

                    <div className="nav-section-title">SETTINGS</div>

                    <div className="nav-item">
                        <div className="nav-link">
                            <span>⚙️</span> Configuration
                        </div>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">AM</div>
                        <div className="user-info">
                            <h4>{adminName}</h4>
                            <p>Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="search-bar">
                        <span className="search-icon">🔍</span>
                        <input type="text" className="search-input" placeholder="Search bookings, rooms, or guests..." />
                    </div>
                    <div className="top-actions">
                        <button className="btn-secondary" onClick={() => navigate('/admin/add-room')}>
                            <span>+</span> New Room
                        </button>
                        <button className="btn-primary" onClick={() => navigate('/rooms')}>
                            <span>🔑</span> Check In
                        </button>
                    </div>
                </div>

                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <h1>Good Morning, {adminName}</h1>
                    <p>Here's what's happening at the hotel today.</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Total Bookings</span>
                            <div className="stat-icon-wrapper" style={{ backgroundColor: '#E0F7F8', color: '#007F86' }}>📅</div>
                        </div>
                        <h3 className="stat-value">{stats.totalBookings}</h3>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill" style={{ width: '70%', backgroundColor: '#007F86' }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Occupancy Rate</span>
                            <div className="stat-icon-wrapper" style={{ backgroundColor: '#EDE9FE', color: '#7C3AED' }}>📊</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <h3 className="stat-value">{occupancyRate}%</h3>
                            <span className="stat-trend trend-up">+5%</span>
                        </div>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill" style={{ width: `${occupancyRate}%`, backgroundColor: '#7C3AED' }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Available Rooms</span>
                            <div className="stat-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>🏨</div>
                        </div>
                        <h3 className="stat-value">{stats.availableRooms}</h3>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill" style={{ width: '45%', backgroundColor: '#D97706' }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Total Revenue</span>
                            <div className="stat-icon-wrapper" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>💰</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <h3 className="stat-value">$12.4k</h3>
                            <span className="stat-trend trend-up">+12%</span>
                        </div>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill" style={{ width: '85%', backgroundColor: '#059669' }}></div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="content-grid">
                    {/* Recent Bookings */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3 className="card-title">Recent Bookings</h3>
                            <span className="view-all" onClick={() => navigate('/admin/manage-bookings')}>View All</span>
                        </div>
                        <div className="table-container">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Guest</th>
                                        <th>Code</th>
                                        <th>Dates</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar" style={{ backgroundColor: '#E0E7FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                                        {booking.user?.name?.charAt(0) || 'G'}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '500' }}>{booking.user?.name || 'Guest'}</div>
                                                        <div style={{ fontSize: '12px', color: '#6B7280' }}>ID: #{booking.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{booking.bookingConfirmationCode}</td>
                                            <td>
                                                {new Date(booking.checkInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} -
                                                {new Date(booking.checkOutDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </td>
                                            <td>
                                                <span className="status-badge status-confirmed">Confirmed</span>
                                            </td>
                                            <td>
                                                <div className="action-menu" onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}>⋮</div>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentBookings.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No recent bookings</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Room Status Charts Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Room Status Donut */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h3 className="card-title">Room Status</h3>
                                <span className="view-all">See Details</span>
                            </div>
                            <div className="chart-container">
                                <div className="donut-chart">
                                    <svg width="160" height="160" viewBox="0 0 160 160">
                                        <circle cx="80" cy="80" r="70" fill="none" stroke="#F3F4F6" strokeWidth="12" />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            fill="none"
                                            stroke="#007F86"
                                            strokeWidth="12"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            transform="rotate(-90 80 80)"
                                        />
                                    </svg>
                                    <div className="donut-center">
                                        <h2>{stats.totalRooms}</h2>
                                        <span>Total Rooms</span>
                                    </div>
                                </div>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <div className="legend-label">
                                            <div className="dot" style={{ backgroundColor: '#007F86' }}></div>
                                            <span>Occupied</span>
                                        </div>
                                        <span>{occupiedRooms} ({occupancyRate}%)</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="legend-label">
                                            <div className="dot" style={{ backgroundColor: '#F3F4F6' }}></div>
                                            <span>Available</span>
                                        </div>
                                        <span>{stats.availableRooms} ({100 - occupancyRate}%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Weekly Availability Bar Chart */}
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h3 className="card-title">Weekly Availability</h3>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', color: '#6B7280', cursor: 'pointer' }}>{'<'}</span>
                                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Oct 24 - Oct 30</span>
                                    <span style={{ fontSize: '12px', color: '#6B7280', cursor: 'pointer' }}>{'>'}</span>
                                </div>
                            </div>
                            <div className="bar-chart">
                                {[
                                    { day: 'Mon', h: '40%' },
                                    { day: 'Tue', h: '60%' },
                                    { day: 'Wed', h: '30%' },
                                    { day: 'Thu', h: '50%', active: true },
                                    { day: 'Fri', h: '80%', highlight: true },
                                    { day: 'Sat', h: '90%', highlight: true },
                                    { day: 'Sun', h: '70%' },
                                ].map((item, index) => (
                                    <div className="bar-group" key={index}>
                                        <div
                                            className={`bar ${item.active ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                                            style={{ height: item.h }}
                                        ></div>
                                        <span className="bar-label">{item.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
