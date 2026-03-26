import React from "react";
import "../../styles/Profile.css";
import { Navigate } from "react-router-dom";

export default function Profile() {
  /* ================= LOAD SAVED PROFILE ================= */
  const savedProfile =
    JSON.parse(window.localStorage.getItem("userProfile")) || {};

  const [showEdit, setShowEdit] = React.useState(false);

  const [name, setName] = React.useState(
    savedProfile.name || localStorage.getItem("userName") || "User"
  );

  const [email, setEmail] = React.useState(
    savedProfile.email || localStorage.getItem("userEmail") || ""
  );

  /* ================= CHANGE PASSWORD STATES ================= */
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  /* 🚫 BLOCK ADMIN FROM USER PROFILE */
  if (localStorage.getItem("userRole") === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const requests =
    JSON.parse(localStorage.getItem("bloodRequests")) || [];

  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  /* ================= SAVE PROFILE (FIXED) ================= */
  const handleSaveProfile = () => {
    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    const profileData = { name, email };

    localStorage.setItem("userProfile", JSON.stringify(profileData));
    localStorage.setItem("userName", name);     // ✅ FIX
    localStorage.setItem("userEmail", email);   // ✅ FIX

    setShowEdit(false);
    alert("✅ Profile updated successfully");
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = () => {
    const savedPassword = localStorage.getItem("userPassword");

    if (!savedPassword) {
      alert("❌ No password found. Please login again.");
      return;
    }

    if (currentPassword !== savedPassword) {
      alert("❌ Current password is incorrect");
      return;
    }

    if (newPassword.length < 4) {
      alert("❌ Password must be at least 4 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    localStorage.setItem("userPassword", newPassword);
    alert("✅ Password changed successfully");

    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  /* ================= SAFE LOGOUT (FIXED) ================= */
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");   // ✅ FIX
    localStorage.removeItem("userEmail");  // ✅ FIX

    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      {/* ================= HEADER ================= */}
      <div className="profile-header-card">
        <div className="profile-left">
          <div className="profile-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{name}</h2>
            <p className="role">
              👤 User <span className="status-dot user"></span> Active
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-outline" onClick={() => setShowEdit(true)}>
            Edit Profile
          </button>

          <button
            className="btn-outline"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>

          <button className="btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="profile-grid">
        <div className="profile-card">
          <h3>Profile Information</h3>

          <div className="info-row">
            <span>Role</span>
            <strong>User</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>{email || "Not Provided"}</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <strong className="active-text">Active</strong>
          </div>
        </div>

        <div className="profile-card">
          <h3>Activity Summary</h3>

          <div className="summary-grid">
            <div className="summary-box">
              <strong>{requests.length}</strong>
              <span>Your Requests</span>
            </div>

            <div className="summary-box">
              <strong>0</strong>
              <span>Donations</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="profile-card full">
        <h3>Recent Activity</h3>

        {activities.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          <ul className="activity-list">
            {activities.map((a, i) => (
              <li key={i}>✔ {a.text}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Edit Profile</h3>

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setShowEdit(false)}>
                Cancel
              </button>

              <button className="btn-danger" onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Change Password</h3>

            <div className="input-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>

              <button className="btn-danger" onClick={handleChangePassword}>
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
