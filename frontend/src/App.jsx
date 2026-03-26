import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

/* ===== PROTECTED ROUTES ===== */
import ProtectedAdmin from "./components/protected/ProtectedAdmin";
import ProtectedUser from "./components/protected/ProtectedUser";

/* ===== USER PAGES ===== */
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Profile from "./pages/donor/Profile";
import DonorRegister from "./pages/donor/DonorRegister";
import DonorList from "./pages/donor/DonorList";
import RequestBlood from "./pages/auth/RequestBlood";
import Donate from "./pages/donor/Donate";
import BloodForm from "./pages/blood/BloodForm"; // ✅ ADDED
import Inventory from "./pages/donor/Inventory";

/* ===== ADMIN PAGES ===== */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminDonors from "./pages/admin/AdminDonors";
import AdminInventory from "./pages/admin/AdminInventory";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<DonorRegister />} />
        <Route path="/donors" element={<DonorList />} />

        {/* ✅ GOOGLE FORM PAGE */}
        <Route path="/blood-form" element={<BloodForm />} />

        {/* ===== USER PROTECTED ===== */}
        <Route
          path="/profile"
          element={
            <Profile />
          } />

        <Route
          path="/request-blood"
          element={
            <RequestBlood />
          }  />

        <Route
          path="/donate"
          element={
            <Donate />
          } />
        <Route 
          path="/inventory" 
          element={
            <Inventory />
          } />

        {/* ===== ADMIN ===== */}
        <Route 
        path="/admin/login" 
        element={
          <AdminLogin />
        } />

        <Route
          path="/admin"
          element={
            <AdminDashboard />
          } />

        <Route
          path="/admin/requests"
          element={
            <AdminRequests />
          } />

        <Route
          path="/admin/donors"
          element={
            <AdminDonors />
          } />

        <Route
          path="/admin/inventory"
          element={
            <ProtectedAdmin>
            <AdminInventory />
            </ProtectedAdmin>
          } />

        {/* ===== 404 ===== */}
        <Route
          path="*"
          element={<h2 style={{ padding: 40 }}>404 – Page Not Found</h2>}
        />
      </Routes>
      <Footer />
    </>
  );
}
