import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar"; 
import Home from "./pages/Home";
import Search from "./pages/SearchPage";
import Add from "./pages/AddProduct";
import Decrease from "./pages/DecreaseProduct";
import Increase from "./pages/IncreaseProduct";
import Login from "./pages/login";
import "./Apps.css"; // make sure background classes are here

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  const handleLogout = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <div className={isLoginPage ? "login-bg" : "app-bg"}>
      {!isLoginPage && <Navbar isLoggedIn={!!token} userRole={userRole} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/decrease" element={<Decrease />} />
        <Route path="/increase" element={<Increase />} />
        <Route 
          path="/add" 
          element={userRole === "admin" ? <Add /> : <Navigate to="/" />} 
        />
        <Route path="/login" element={<Login setToken={setToken} setUserRole={setUserRole} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
