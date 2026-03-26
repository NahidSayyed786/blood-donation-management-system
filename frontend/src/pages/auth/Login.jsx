import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    /* ================= ADMIN LOGIN ================= */
    if (role === "admin") {
      if (!email || !password) {
        alert("Please enter admin email and password");
        return;
      }

      if (email === "nahidnsayyed786@gmail.com" && password === "N@hid786") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Admin");

        navigate("/admin"); // ✅ FIXED
      } else {
        alert("❌ Invalid Admin Credentials");
      }
      return;
    }

    /* ================= USER LOGIN ================= */
if (!email || !password) {
  alert("Please enter email and password");
  return;
}

const name = email.split("@")[0];

// ✅ USER FLAGS
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userRole", "user");
localStorage.setItem("userName", name);
localStorage.setItem("userEmail", email);

// 🔥 VERY IMPORTANT: REMOVE ADMIN FLAGS
localStorage.removeItem("adminLoggedIn");

// ✅ Save profile only first time
if (!localStorage.getItem("userProfile")) {
  localStorage.setItem(
    "userProfile",
    JSON.stringify({ name, email })
  );
}

alert("✅ User logged in successfully");

// ✅ USER ALWAYS GOES HOME
navigate("/", { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-curve"></div>

      <div className="login-card">
        <div className="login-header">
          <h1>BloodConnect</h1>
          <p>{role === "admin" ? "Admin Login" : "User Login"}</p>
        </div>

        {/* ROLE TABS */}
        <div className="login-tabs">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            👤 User
          </button>
          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            🧑‍💼 Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>{role === "admin" ? "Admin Email" : "User Email"}</label>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>

            <span
              className="show-hide"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="buttons">
            <button type="submit" className="login-btn">
              Login as {role === "admin" ? "Admin" : "User"}
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>

          {role === "admin"}
        </form>
      </div>
    </div>
  );
}
