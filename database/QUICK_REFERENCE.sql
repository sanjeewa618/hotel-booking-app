-- ============================================
-- QUICK REFERENCE: Aurora Hotel Database
-- ============================================

-- DATABASE INFO
-- Name: mydb
-- Host: localhost:3306
-- User: root
-- Pass: Sandaru18@

-- ============================================
-- QUICK COMMANDS
-- ============================================

-- Connect to database
USE mydb;

-- Show all tables
SHOW TABLES;

-- Count all records
SELECT 'Users' AS Table_Name, COUNT(*) AS Count FROM users
UNION ALL SELECT 'Rooms', COUNT(*) FROM rooms
UNION ALL SELECT 'Bookings', COUNT(*) FROM bookings;

-- ============================================
-- VIEW DATA
-- ============================================

-- All users
SELECT id, email, name, role FROM users;

-- All rooms by type
SELECT room_type, COUNT(*) as total, room_price 
FROM rooms 
GROUP BY room_type, room_price 
ORDER BY room_price DESC;

-- All bookings
SELECT 
    b.booking_confirmation_code,
    u.name as guest,
    r.room_type,
    b.check_in_date,
    b.check_out_date
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN rooms r ON b.room_id = r.id;

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Find user by email
SELECT * FROM users WHERE email = 'john.doe@example.com';

-- Find available rooms (no bookings)
SELECT r.* FROM rooms r
LEFT JOIN bookings b ON r.id = b.room_id
WHERE b.id IS NULL;

-- Find booking by confirmation code
SELECT * FROM bookings WHERE booking_confirmation_code = 'CONF-2025-001-ABC';

-- Get user's bookings
SELECT b.*, r.room_type, r.room_price
FROM bookings b
JOIN rooms r ON b.room_id = r.id
WHERE b.user_id = 2;

-- ============================================
-- ADMIN QUERIES
-- ============================================

-- Add new room
INSERT INTO rooms (room_type, room_price, room_photo_url, room_description)
VALUES ('Deluxe', 199.99, 'https://example.com/photo.jpg', 'Beautiful deluxe room');

-- Update room price
UPDATE rooms SET room_price = 219.99 WHERE id = 1;

-- Delete booking
DELETE FROM bookings WHERE id = 1;

-- Make user admin
UPDATE users SET role = 'ADMIN' WHERE email = 'user@example.com';

-- ============================================
-- MAINTENANCE
-- ============================================

-- Clear all bookings
DELETE FROM bookings;

-- Clear all data (keep structure)
DELETE FROM bookings;
DELETE FROM users;
DELETE FROM rooms;

-- Reset auto-increment
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE rooms AUTO_INCREMENT = 1;
ALTER TABLE bookings AUTO_INCREMENT = 1;

-- ============================================
-- BACKUP & RESTORE
-- ============================================

-- Backup database (run in PowerShell)
-- mysqldump -u root -p"Sandaru18@" mydb > backup.sql

-- Restore database (run in PowerShell)
-- mysql -u root -p"Sandaru18@" mydb < backup.sql
