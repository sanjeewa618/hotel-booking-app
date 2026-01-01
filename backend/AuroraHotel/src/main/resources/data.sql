-- ============================================
-- Aurora Hotel Sample Data
-- ============================================
-- This script inserts sample data for testing the Aurora Hotel application
-- Run this AFTER running aurora_hotel_schema.sql
-- ============================================

-- USE mydb; -- Removed for Spring Boot data.sql compatibility

-- ============================================
-- Insert Sample Users
-- ============================================
-- Note: Passwords are BCrypt hashed
-- Password for all test accounts: password123
-- BCrypt hash: $2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW

-- Admin User (email: admin@aurorahotel.com, password: password123)
INSERT IGNORE INTO users (email, name, phone_number, password, role) VALUES
('admin@aurorahotel.com', 'Admin User', '+1234567890', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW', 'ADMIN');

-- Regular Users (password for all: password123)
INSERT IGNORE INTO users (email, name, phone_number, password, role) VALUES
('sanjeewasandaruwan477@gmail.com', 'Sanjeewa Sandaruwan', '+94771234567', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW', 'USER'),
('john.doe@example.com', 'John Doe', '+1234567891', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW', 'USER'),
('jane.smith@example.com', 'Jane Smith', '+1234567892', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW', 'USER'),
('mike.wilson@example.com', 'Mike Wilson', '+1234567893', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW', 'USER'),
('sarah.johnson@example.com', 'Sarah Johnson', '+1234567894', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW', 'USER');

-- ============================================
-- Insert Sample Rooms
-- ============================================

-- Deluxe Rooms
INSERT IGNORE INTO rooms (room_type, room_price, room_photo_url, room_description) VALUES
('Deluxe', 199.99, 'https://example.com/photos/deluxe-room-1.jpg', 'Spacious deluxe room with king-size bed, city view, and modern amenities. Perfect for couples or business travelers.'),
('Deluxe', 199.99, 'https://example.com/photos/deluxe-room-2.jpg', 'Elegant deluxe room featuring premium bedding, work desk, and complimentary Wi-Fi. Ideal for extended stays.'),
('Deluxe', 199.99, 'https://example.com/photos/deluxe-room-3.jpg', 'Luxurious deluxe accommodation with contemporary design, mini-bar, and stunning views.');

-- Suite Rooms
INSERT IGNORE INTO rooms (room_type, room_price, room_photo_url, room_description) VALUES
('Suite', 349.99, 'https://example.com/photos/suite-room-1.jpg', 'Premium suite with separate living area, king-size bed, and panoramic city views. Includes access to executive lounge.'),
('Suite', 349.99, 'https://example.com/photos/suite-room-2.jpg', 'Spacious suite featuring luxury furnishings, marble bathroom, and private balcony. Perfect for special occasions.'),
('Suite', 349.99, 'https://example.com/photos/suite-room-3.jpg', 'Executive suite with modern amenities, workspace, and premium entertainment system.');

-- Standard Rooms
INSERT IGNORE INTO rooms (room_type, room_price, room_photo_url, room_description) VALUES
('Standard', 129.99, 'https://example.com/photos/standard-room-1.jpg', 'Comfortable standard room with queen-size bed and essential amenities. Great value for budget-conscious travelers.'),
('Standard', 129.99, 'https://example.com/photos/standard-room-2.jpg', 'Cozy standard accommodation with modern decor and all basic facilities for a pleasant stay.'),
('Standard', 129.99, 'https://example.com/photos/standard-room-3.jpg', 'Well-appointed standard room offering comfort and convenience at an affordable price.'),
('Standard', 129.99, 'https://example.com/photos/standard-room-4.jpg', 'Clean and comfortable standard room perfect for short stays and solo travelers.');

-- Family Rooms
INSERT IGNORE INTO rooms (room_type, room_price, room_photo_url, room_description) VALUES
('Family', 279.99, 'https://example.com/photos/family-room-1.jpg', 'Spacious family room with two queen beds, accommodating up to 4 guests. Includes children-friendly amenities.'),
('Family', 279.99, 'https://example.com/photos/family-room-2.jpg', 'Large family suite with separate sleeping areas and entertainment options for kids. Perfect for family vacations.');

-- Presidential Suite
INSERT IGNORE INTO rooms (room_type, room_price, room_photo_url, room_description) VALUES
('Presidential', 599.99, 'https://example.com/photos/presidential-suite-1.jpg', 'Ultimate luxury presidential suite with multiple rooms, private dining area, and exclusive concierge service. The pinnacle of elegance and comfort.');

-- ============================================
-- Insert Sample Bookings
-- ============================================

-- Booking 1: John Doe - Deluxe Room
INSERT IGNORE INTO bookings (check_in_date, check_out_date, num_of_adults, num_of_children, total_num_of_guest, booking_confirmation_code, user_id, room_id) VALUES
('2025-12-10', '2025-12-15', 2, 0, 2, 'CONF-2025-001-ABC', 2, 1);

-- Booking 2: Jane Smith - Suite
INSERT IGNORE INTO bookings (check_in_date, check_out_date, num_of_adults, num_of_children, total_num_of_guest, booking_confirmation_code, user_id, room_id) VALUES
('2025-12-12', '2025-12-14', 2, 1, 3, 'CONF-2025-002-DEF', 3, 4);

-- Booking 3: Mike Wilson - Standard Room
INSERT IGNORE INTO bookings (check_in_date, check_out_date, num_of_adults, num_of_children, total_num_of_guest, booking_confirmation_code, user_id, room_id) VALUES
('2025-12-08', '2025-12-11', 1, 0, 1, 'CONF-2025-003-GHI', 4, 7);

-- Booking 4: Sarah Johnson - Family Room
INSERT IGNORE INTO bookings (check_in_date, check_out_date, num_of_adults, num_of_children, total_num_of_guest, booking_confirmation_code, user_id, room_id) VALUES
('2025-12-20', '2025-12-27', 2, 2, 4, 'CONF-2025-004-JKL', 5, 11);

-- Booking 5: John Doe - Presidential Suite (Future booking)
INSERT IGNORE INTO bookings (check_in_date, check_out_date, num_of_adults, num_of_children, total_num_of_guest, booking_confirmation_code, user_id, room_id) VALUES
('2026-01-15', '2026-01-20', 2, 0, 2, 'CONF-2026-005-MNO', 2, 13);
