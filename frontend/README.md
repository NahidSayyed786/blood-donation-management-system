🩸 Blood Donation System

A full-stack Blood Donation Management System that connects donors, patients, and administrators.
The system allows users to view blood availability, request blood, and donate, while administrators manage requests, donors, and inventory through a protected admin panel.

🚀 Features
👤 User Features

User registration & login

View available blood inventory (read-only)

Request blood

Donate blood

View donor list

Profile management

🛠 Admin Features (Protected)

Admin login

Dashboard overview

Manage blood requests (Approve / Reject)

Manage donors

Manage blood inventory (Add / Update / Delete stock)

Role-based access control (Admin only)

🔐 Role-Based Access Control
Role	Access
User	/inventory, /donors, /request-blood, /donate
Admin	/admin/* (dashboard, requests, donors, inventory)
Guest	Home, Login, Register

All admin routes are protected using a single ProtectedAdmin wrapper.

🧭 Routing Structure
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

🗂 Project Structure (Frontend)
frontend/
├── src/
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── ProtectedAdmin.jsx
│   │   └── ProtectedUser.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Inventory.jsx
│   │   ├── DonorList.jsx
│   │   ├── RequestBlood.jsx
│   │   ├── Donate.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminRequests.jsx
│   │   ├── AdminDonors.jsx
│   │   └── AdminInventory.jsx
│   └── styles/
├── public/
├── package.json
└── vite.config.js

🛠 Tech Stack
Frontend

React (Vite)

React Router DOM

Axios

CSS

Backend

Node.js

Express.js

MySQL

CORS

dotenv

🧪 Inventory Logic

Inventory data is stored in localStorage under the key:

bloodInventory


Admin updates inventory

User inventory reads the same data (read-only)

Both stay synchronized

▶️ How to Run the Project
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install
npm start

🔑 Default Roles (Example)
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userRole", "admin"); // or "user"

🧠 Viva Explanation (Important)

“The system uses role-based routing where all admin pages are grouped under a protected layout. Users can only view inventory, while admins manage requests and stock. This ensures security, scalability, and clean architecture.”

📌 Future Enhancements

JWT-based authentication

Inventory stored in database

Real-time inventory updates

Admin analytics dashboard

Email / SMS notifications

👨‍💻 Developed By

Blood Donation System Project
Frontend + Backend Integrated
Academic & Practical Use