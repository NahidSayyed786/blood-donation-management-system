import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/index.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>🩸 Admin Panel</h3>

        <Link to="/admin/requests">Dashboard</Link>
        <Link to="/admin/donors">Donors</Link>
        <Link to="/admin/inventory">Inventory</Link>

        <button onClick={logout}>Logout</button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
