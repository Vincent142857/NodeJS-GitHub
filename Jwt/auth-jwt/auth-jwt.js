// - Step 1: Import necessary modules
import express from 'express';
import jwt from 'jsonwebtoken';

// - Step 2: Secret key sign the JWT
const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret';
app.use(express.json());

// - Step 3: Simulated user "database"
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// - Step 4: Login route - returns JWT if credentials are validate
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // - Step 5: Validate user
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // - Step 6: Create token payload
  const payload = { id: user.id, username: user.username };

  // - Step 7: Sign and return token (expires in 1 hour)
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// - Step 8: Middleware to verify JWT
const verifyToken = (req, res, next) => {
  // - Step 9: Get token from Authorization header: "Bearer `token`"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];

  // - Step 10: Verify token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // - Step 11: Attach user info to request
    req.user = decoded;
    next();
  });
}

// - Step 12: Protected route - requires valid JWT
app.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted to protected route',
    // @ts-ignore
    user: req.user
  });
});

// - Step 13: Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});