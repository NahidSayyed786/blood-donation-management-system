🩸 Blood Donation System – Backend

This is the backend server for the Blood Donation System.
It provides REST APIs for managing donors, blood requests, and request status updates, and connects to a MySQL database.

The backend is built using Node.js + Express.js and follows a clean MVC-style structure.

🚀 Features

RESTful API design

Donor management

Blood request management

Admin request approval system

MySQL database integration

CORS enabled for frontend connection

Environment-based configuration

🛠 Tech Stack

Node.js

Express.js

MySQL

mysql2

dotenv

cors

📁 Backend Folder Structure
backend/
├── src/
│   ├── app.js                # Main server file
│   ├── db.js                 # MySQL database connection
│   ├── models/
│   │   ├── Donor.js          # Donor database queries
│   │   └── Request.js        # Blood request database queries
│   ├── routes/
│   │   ├── donorRoutes.js    # Donor-related APIs
│   │   └── requestRoutes.js  # Blood request APIs
├── API.md                    # API documentation
├── package.json
├── package-lock.json
└── .gitignore

🔗 API Endpoints Overview
🧑‍🤝‍🧑 Donor APIs
Method	Endpoint	Description
GET	/donors	Get all donors
POST	/donors/add	Add a new donor
🩸 Blood Request APIs
Method	Endpoint	Description
GET	/api/requests	Get all blood requests
POST	/api/requests/add	Create a new blood request
PUT	/api/requests/:id/status	Update request status (Admin)
GET	/api/requests/:id/match-donors	Match donors by blood group
🔄 Request Status Flow

Allowed status values:

Pending
Approved
Rejected


Default status → Pending

Admin can update status → Approved or Rejected

🗄 Database Tables (Expected)
blood_requests
id
patient_name
phone
blood_group
city
units
hospital
status
created_at

donors
id
name
blood_group
phone
city
last_donation_date

▶️ How to Run Backend
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Configure Environment

Create a .env file in backend/:

PORT=5003
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blood_donation

3️⃣ Start Server
npm start


Server will run on:

http://localhost:5003

🧪 Health Check API
GET /api/health


Response:

{
  "status": "OK",
  "message": "Blood Donation Backend is running 🚀"
}

🔐 Security Notes

Admin role validation is handled on the frontend

Backend validates request data and status values

CORS enabled for frontend integration

🧠 Viva Explanation (Backend)

“The backend follows a modular structure using Express routes and models. Database logic is separated into model files, and REST APIs handle donor and blood request operations securely.”

📌 Future Improvements

JWT-based authentication

Admin authorization middleware

Inventory stored in database

Logging & error monitoring

Pagination & filtering

👨‍💻 Developed For

Blood Donation System Project
Backend – Node.js & MySQL
Academic & Practical Use