import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/index.css";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  /* ================= LOAD DATA FROM BACKEND ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await API.get("/api/requests");
        setRequests(res.data || []);
      } catch (err) {
        console.error("Dashboard API error:", err);
      }
    };

    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ================= UPDATE STATUS (REAL FIX) ================= */
  const updateStatus = async (index, status) => {
    const request = requests[index];
    if (!request) return;

    try {
      // 🔥 UPDATE IN DATABASE
      await API.put(`/api/requests/${request.id}/status`, {
        status: status.toLowerCase(),
      });

      // 🔄 REFRESH DATA FROM BACKEND
      const res = await API.get("/api/requests");
      setRequests(res.data);

      // ✅ ACTIVITY LOG (PROFESSIONAL)
      const statusEmoji =
        status === "approved" ? "✅" :
        status === "rejected" ? "❌" : "⏳";

      const statusLabel =
        status.charAt(0).toUpperCase() + status.slice(1);

      const newActivity = {
        text: `${statusEmoji} ${statusLabel} request for ${request.patient_name} (${request.blood_group})`,
        status,
        time: window.Date.now(),
      };

      const updatedActivities = [newActivity, ...activities].slice(0, 5);
      setActivities(updatedActivities);
      localStorage.setItem("activities", JSON.stringify(updatedActivities));

    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update request status");
    }
  };

  /* ================= STATS ================= */
  const approved = requests.filter(
    (r) => r.status?.toLowerCase() === "approved"
  ).length;

  const pending = requests.filter(
    (r) => r.status?.toLowerCase() === "pending"
  ).length;

  const cities = new Set(
    requests.map((r) => r.city).filter(Boolean)
  ).size;

  return (
    <div className="container fade">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* ================= STATS ================= */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>{requests.length}</h3>
          <p>Total Requests</p>
        </div>

        <div className="stat-card approved">
          <h3>{approved}</h3>
          <p>Approved</p>
        </div>

        <div className="stat-card pending">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card city">
          <h3>{cities}</h3>
          <p>Cities</p>
        </div>
      </div>

      {/* ================= BAR ================= */}
      <div className="simple-chart">
        <div className="bar approved" style={{ width: `${approved * 30}px` }}>
          Approved ({approved})
        </div>
        <div className="bar pending" style={{ width: `${pending * 30}px` }}>
          Pending ({pending})
        </div>
      </div>

      {/* ================= ADMIN MANAGEMENT ================= */}
      <div className="admin-management">
        <h3 className="section-title">Admin Management</h3>

        <div className="admin-management-grid">
          <div
            className="admin-manage-card"
            onClick={() => navigate("/admin/requests")}
          >
            <h4>🩸 Manage Requests</h4>
            <p>Approve, reject and track blood requests</p>
          </div>

          <div
            className="admin-manage-card"
            onClick={() => navigate("/admin/donors")}
          >
            <h4>👥 Manage Donors</h4>
            <p>View, edit and manage donor records</p>
          </div>

          <div
            className="admin-manage-card"
            onClick={() => navigate("/admin/inventory")}
          >
            <h4>🏥 Manage Inventory</h4>
            <p>Track blood stock and availability</p>
          </div>
        </div>
      </div>

      {/* ================= REQUEST TABLE ================= */}
      <div className="card">
        <h3>🩸 Donation Requests</h3>

        {requests.length === 0 ? (
          <p>No donation requests</p>
        ) : (
          <table className="donation-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Blood</th>
                <th>Hospital</th>
                <th>City</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r, i) => (
                <tr key={r.id}>
                  <td>{r.patient_name}</td>
                  <td>{r.blood_group}</td>
                  <td>{r.hospital}</td>
                  <td>{r.city}</td>
                  <td>
                    <span className={`status-badge ${r.status}`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(i, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="admin-activity">
        <h3>Recent Activity</h3>

        {activities.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          <ul>
            {activities.map((a, i) => (
              <li key={i} className={`activity-item ${a.status}`}>
                <span>{a.text}</span>
                <span>
                  {Math.floor((window.Date.now() - a.time) / 60000)} min ago
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
