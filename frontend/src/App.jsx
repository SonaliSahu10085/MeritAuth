import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components & Pages
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import { Toast } from "./components/Toast";

export default function App() {
  const [user, setUser] = useState(null); // Global user state
  const [toast, setToast] = useState(null);

  // Helper to show notifications
  const showNotification = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 8000);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200 transition-colors duration-300">
        <Navbar user={user} setUser={setUser} />

        <main className="container mx-auto py-8 px-4">
          {/* Global Toast Notifications */}
          {toast && <Toast message={toast.msg} type={toast.type} />}
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/profile" />
                ) : (
                  <Login setUser={setUser} notify={showNotification} />
                )
              }
            />
            <Route
              path="/signup"
              element={<Signup notify={showNotification} />}
            />

            {/* Protected Route: Any logged in user */}
            <Route
              path="/profile"
              element={
                user ? (
                  <ProfilePage
                    user={user}
                    notify={showNotification}
                    setUser={setUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Role-Based Route: Admin Only */}
            <Route
              path="/admin/dashboard"
              element={
                user?.role === "admin" ? (
                  <AdminDashboard notify={showNotification} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Default Redirect */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
