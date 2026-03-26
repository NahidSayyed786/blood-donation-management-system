🩸 Blood Donation System

A full-stack Blood Donation Management System that connects donors, patients, and administrators.
The system allows users to view blood availability, request blood, and donate, while administrators manage requests, donors, and inventory through a secure admin panel.

This project is developed for academic and practical use, following clean architecture and role-based access control.

📁 Project Structure
blood-donation-system-SOLVED/
├── backend/        # Node.js + Express + MySQL APIs
├── frontend/       # React (Vite) frontend application
├── database/       # SQL files / database schema
└── README.md       # Project documentation (this file)

🚀 Features
👤 User Features

User registration & login

View blood inventory (read-only)

Request blood

Donate blood

View donor list

Profile management

🛠 Admin Features (Protected)

Admin login

Admin dashboard

Approve / reject blood requests

Manage donors

Manage blood inventory

Role-based route protection

🔐 Role-Based Access Control
Role	Access
User	Inventory, Donors, Request Blood, Donate
Admin	All /admin/* routes
Guest	Home, Login, Register

All admin routes are protected using a single ProtectedAdmin wrapper in the frontend.

🧭 Application Routes
User Routes
/                   → Home
/login              → User Login
/register           → Donor Registration
/donors             → Donor List
/inventory          → Blood Inventory (Read-only)
/request-blood      → Request Blood
/donate             → Donate Blood
/profile            → User Profile

Admin Routes (Protected)
/admin/login        → Admin Login
/admin              → Admin Dashboard
/admin/requests     → Manage Blood Requests
/admin/donors       → Manage Donors
/admin/inventory    → Manage Blood Inventory

🛠 Technology Stack
Frontend
React (Vite)
React Router DOM
Axios
CSS

Backend
Node.js
Express.js
MySQL
mysql2
dotenv
cors

Database
MySQL
SQL schema stored in database/ folder

🗄 Database Overview
Main Tables
donors
blood_requests

Request Status Values
Pending
Approved
Rejected

▶️ How to Run the Project
1️⃣ Backend Setup
cd backend
npm install
npm start

Backend runs on:
http://localhost:5003

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

3️⃣ Database Setup
Create a MySQL database
Import SQL files from the database/ folder
Update database credentials in:
backend/.env

🔄 Inventory Logic
Blood inventory is stored in localStorage
Admin manages inventory
User inventory reads the same data (read-only)
Both views stay synchronized

🧪 Health Check API
GET /api/health


Response:

{
  "status": "OK",
  "message": "Blood Donation Backend is running 🚀"
}

🧠 Viva Explanation (Project Summary)

“The Blood Donation System is a full-stack application using React and Node.js. It implements role-based access control where users can view inventory and request blood, while admins manage donors, requests, and inventory through protected routes.”

📌 Future Enhancements

JWT-based authentication

Inventory stored in database instead of localStorage

Real-time updates

Admin analytics dashboard

Email / SMS notifications

👨‍💻 Developed For

Blood Donation System Project
Frontend + Backend + Database
Academic & Practical Use