import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Static admin login
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("userRole", "admin");

      navigate("/admin/requests");
      window.location.reload(); // optional, but safe
    } else {
      alert("❌ Invalid Admin Credentials");
    }
  };

  return (
    <div className="container fade">
      <h2>🔐 Admin Login</h2>

      <form className="form-card" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn primary">Login</button>
      </form>
    </div>
  );
}
