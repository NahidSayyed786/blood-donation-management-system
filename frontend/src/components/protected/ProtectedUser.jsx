import { Navigate } from "react-router-dom";

export default function ProtectedUser({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("userRole");

  // 🚫 Not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Admin trying to access user-only pages
  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // ✅ Allow user access
  return children;
}
