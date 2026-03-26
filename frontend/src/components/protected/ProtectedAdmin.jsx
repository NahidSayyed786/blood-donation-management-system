import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("userRole") === "admin";
  const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  // 🚫 Block access if not admin
  if (!isLoggedIn || !adminLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allow admin access
  return children;
}
