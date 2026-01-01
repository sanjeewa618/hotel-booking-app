-- ============================================
-- Aurora Hotel Database Cleanup Script
-- ============================================
-- This script removes all duplicate rooms and bookings
-- Run this to fix the pagination issue
-- ============================================

USE mydb;

-- Step 1: Delete all bookings (they reference rooms)
DELETE FROM bookings;

-- Step 2: Delete all rooms
DELETE FROM rooms;

-- Step 3: Reset auto-increment (optional, but recommended)
ALTER TABLE rooms AUTO_INCREMENT = 1;
ALTER TABLE bookings AUTO_INCREMENT = 1;

-- Verification queries
SELECT 'Rooms count after cleanup:' as Message, COUNT(*) as Count FROM rooms;
SELECT 'Bookings count after cleanup:' as Message, COUNT(*) as Count FROM bookings;

-- Note: After running this script, you need to:
-- 1. Temporarily change application.properties: spring.sql.init.mode=always
-- 2. Start the backend ONCE to repopulate data
-- 3. Change it back to: spring.sql.init.mode=never
