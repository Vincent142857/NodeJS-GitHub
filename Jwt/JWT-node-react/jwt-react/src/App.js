import React, { useState } from "react";
import api from "./api/api.js";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setMessage("Login success!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed!");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setMessage(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setMessage(err.response?.data?.message || "Error fetching profile!");
    }
  };

  const fetchAdmin = async () => {
    try {
      const res = await api.get("/admin");
      setMessage(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setMessage(err.response?.data?.message || "Error fetching admin data!");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout", { token: localStorage.getItem("refreshToken") });
    } catch (e) { }
    localStorage.clear();
    setMessage("Logged out!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>JWT Demo (Access + Refresh)</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={fetchProfile}>Get Profile</button>
      <button onClick={fetchAdmin}>Get Admin</button>
      <button onClick={handleLogout}>Logout</button>

      <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        {message}
      </pre>
    </div>
  );
}

export default App;
