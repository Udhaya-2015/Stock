import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginRegister.css";

export default function Login({ setUserRole, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const adminUser = { username: "admin", password: "1234" };
    const normalUser = { username: "user", password: "abcd" };

    if (username === adminUser.username && password === adminUser.password) {
      setToken("fake-token-admin");
      setUserRole("admin");
      localStorage.setItem("token", "fake-token-admin");
      localStorage.setItem("role", "admin");
      navigate("/dashboard"); // redirect
    } 
    else if (username === normalUser.username && password === normalUser.password) {
      setToken("fake-token-user");
      setUserRole("user");
      localStorage.setItem("token", "fake-token-user");
      localStorage.setItem("role", "user");
      navigate("/dashboard"); // redirect
    } 
    else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
