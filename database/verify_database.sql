-- ============================================
-- Aurora Hotel Database Verification Script
-- ============================================
-- Run this to verify your database setup
-- ============================================

USE mydb;

-- Show all tables
SHOW TABLES;

-- Count records in each table
SELECT 'USERS' AS TableName, COUNT(*) AS TotalRecords FROM users
UNION ALL
SELECT 'ROOMS', COUNT(*) FROM rooms
UNION ALL
SELECT 'BOOKINGS', COUNT(*) FROM bookings;

-- Show all users
SELECT id, email, name, role FROM users ORDER BY id;

-- Show rooms summary by type
SELECT 
    room_type AS RoomType,
    COUNT(*) AS TotalRooms,
    room_price AS PricePerNight
FROM rooms
GROUP BY room_type, room_price
ORDER BY room_price DESC;

-- Show all bookings with details
SELECT 
    b.id AS BookingID,
    b.booking_confirmation_code AS ConfirmationCode,
    u.name AS GuestName,
    r.room_type AS RoomType,
    b.check_in_date AS CheckIn,
    b.check_out_date AS CheckOut,
    b.total_num_of_guest AS Guests
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN rooms r ON b.room_id = r.id
ORDER BY b.check_in_date;
