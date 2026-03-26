import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("userRole"); // "user" | "admin"
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="brand">🩸 Blood Donation System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/donors">Donors</Link>

        {/* 👤 USER INVENTORY */}
        {isLoggedIn && role === "user" && (
          <Link to="/inventory">Inventory</Link>
        )}

        {/* 🛠 ADMIN INVENTORY */}
        {isLoggedIn && role === "admin" && (
          <Link to="/admin/inventory">Inventory</Link>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {/* USER DROPDOWN */}
        {isLoggedIn && role === "user" && (
          <div className="user-dropdown">
            <span className="user-name">
              👤 {userName || "User"} ▾
            </span>

            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}

        {/* ADMIN LOGOUT */}
        {isLoggedIn && role === "admin" && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
