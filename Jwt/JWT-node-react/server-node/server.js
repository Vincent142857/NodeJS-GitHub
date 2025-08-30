const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Giả lập database
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("123456", 8), role: "admin" },
  { id: 2, username: "user", password: bcrypt.hashSync("123456", 8), role: "user" },
];

// Secret keys
const ACCESS_SECRET = "ACCESS_SECRET_KEY";
const REFRESH_SECRET = "REFRESH_SECRET_KEY";

// Lưu refresh tokens (demo dùng memory, thực tế nên lưu DB)
let refreshTokens = [];

// ---------------- Đăng nhập ----------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: "User not found" });
  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) return res.status(401).json({ message: "Invalid password" });

  // Tạo access & refresh token
  const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id, role: user.role }, REFRESH_SECRET, { expiresIn: "7d" });

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

// ---------------- Refresh Token ----------------
app.post("/refresh", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No token provided" });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid refresh token" });

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
    res.json({ accessToken });
  });
});

// ---------------- Middleware ----------------
function verifyAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No access token" });

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid/Expired access token" });
    req.user = user;
    next();
  });
}

// ---------------- API ----------------
app.get("/profile", verifyAccessToken, (req, res) => {
  res.json({ message: "Your profile info", user: req.user });
});

app.get("/admin", verifyAccessToken, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Require Admin Role!" });
  res.json({ message: "Welcome Admin!", user: req.user });
});

// ---------------- Logout ----------------
app.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out successfully" });
});

app.listen(4000, () => console.log("Server running at http://localhost:4000"));
