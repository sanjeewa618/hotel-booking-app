-- ============================================
-- Aurora Hotel Database Schema
-- ============================================
-- This script creates the complete database structure for the Aurora Hotel application
-- Database: mydb
-- Tables: users, rooms, bookings
-- ============================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mydb;

-- Use the database
USE mydb;

-- ============================================
-- Drop existing tables (if recreating)
-- ============================================
-- Uncomment these lines if you want to recreate the tables from scratch
-- DROP TABLE IF EXISTS bookings;
-- DROP TABLE IF EXISTS rooms;
-- DROP TABLE IF EXISTS users;

-- ============================================
-- Table: users
-- ============================================
-- Stores user information and authentication details
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    
    -- Indexes for better query performance
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: rooms
-- ============================================
-- Stores hotel room information
CREATE TABLE IF NOT EXISTS rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_type VARCHAR(100) NOT NULL,
    room_price DECIMAL(10, 2) NOT NULL,
    room_photo_url VARCHAR(500),
    room_description TEXT,
    
    -- Indexes for better query performance
    INDEX idx_room_type (room_type),
    INDEX idx_room_price (room_price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: bookings
-- ============================================
-- Stores booking information with relationships to users and rooms
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    num_of_adults INT NOT NULL DEFAULT 1,
    num_of_children INT NOT NULL DEFAULT 0,
    total_num_of_guest INT NOT NULL,
    booking_confirmation_code VARCHAR(100) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    
    -- Foreign key constraints
    CONSTRAINT fk_booking_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_booking_room 
        FOREIGN KEY (room_id) 
        REFERENCES rooms(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Check constraints
    CONSTRAINT chk_num_of_adults CHECK (num_of_adults >= 1),
    CONSTRAINT chk_num_of_children CHECK (num_of_children >= 0),
    CONSTRAINT chk_dates CHECK (check_out_date > check_in_date),
    
    -- Indexes for better query performance
    INDEX idx_confirmation_code (booking_confirmation_code),
    INDEX idx_check_in_date (check_in_date),
    INDEX idx_check_out_date (check_out_date),
    INDEX idx_user_id (user_id),
    INDEX idx_room_id (room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Display table structure
-- ============================================
SHOW TABLES;

-- Display users table structure
DESCRIBE users;

-- Display rooms table structure
DESCRIBE rooms;

-- Display bookings table structure
DESCRIBE bookings;
