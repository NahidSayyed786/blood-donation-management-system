CREATE DATABASE IF NOT EXISTS bloodbank;
USE bloodbank;

-- =========================
-- DONORS TABLE
-- =========================
CREATE TABLE blood_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(15),
  blood_group VARCHAR(5),
  units INT,
  hospital VARCHAR(150),
  city VARCHAR(100),
  emergency_level VARCHAR(20),
  request_type VARCHAR(20), -- Donate / Request
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- REQUESTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  units INT NOT NULL,
  hospital VARCHAR(150) NOT NULL,
  city VARCHAR(100),
  status ENUM('pending','fulfilled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
