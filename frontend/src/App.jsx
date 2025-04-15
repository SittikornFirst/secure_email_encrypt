import { BrowserRouter as Router, Routes, Route,  /*useLocation*/ } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Compose from "./Compose";
import AdminView from "./AdminView"; 
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("email"));
  // const location = useLocation();

  // ฟังการเปลี่ยนแปลงของ localStorage ผ่าน window event
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("email"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ฟังการเปลี่ยนแปลงของ route แล้วเช็คอีกที
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("email"));
  }, []);

  return (
    <Router>
      {isLoggedIn && (
        <button 
          className="absolute top-4 right-4 text-red-600 hover:underline z-50"
          onClick={() => {
            localStorage.removeItem("email");
            setIsLoggedIn(false); // อัปเดตทันที
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/admin/logs" element={<AdminView />} />
      </Routes>
    </Router>
  );
}
