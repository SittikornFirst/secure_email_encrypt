import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Compose from "./Compose";
import AdminView from "./AdminView";
import "./App.css";

// 🧠 Wrap App in Router so hooks like useNavigate can work
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // 🔁 New state

  useEffect(() => {
    const syncAuth = () => {
      const storedEmail = localStorage.getItem("email");
      const storedRole = localStorage.getItem("role");
      setEmail(storedEmail);
      setRole(storedRole);
      setLoading(false);
    };

    syncAuth(); // ✅ initial load
    window.addEventListener("storage", syncAuth); // ✅ catch changes from Login.jsx

    return () => window.removeEventListener("storage", syncAuth);
  }, []);


  const isLoggedIn = !!email;
  const isAdmin = role === "admin";

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setEmail(null);
    setRole(null);
    navigate("/");
  };

  const PrivateRoute = ({ children }) => {
    if (loading) return null; // 🔁 Wait until loaded
    if (!isLoggedIn || isAdmin) {
      alert("Login to access this page");
      return <Navigate to="/" />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (loading) return null; // 🔁 Wait until loaded
    if (!isLoggedIn || !isAdmin) {
      alert("Only Admin can access");
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      {email && !loading && (
        <button
          className="absolute top-4 right-4 text-red-600 hover:underline z-50"
          onClick={logout}
        >
          Logout
        </button>
      )}
      {!loading && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/compose" element={<PrivateRoute><Compose /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminView /></AdminRoute>} />
        </Routes>
      )}
    </>
  );
}
