const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const { verifyToken, signAccessToken, signRefreshToken } = require('./init_jwt');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

//api
app.get('/api/refreshToken', async (req, res) => {
  return res.status(200).json({
    status: 'success',
    elements: {
      // token: 'newAccessToken',
      // timeExpired: Date.now() + (60 * 1000)
      accessToken: await signAccessToken()
    }
  })
})

app.get('/api/users', verifyToken, (req, res) => {
  return res.status(200).json({
    status: 'success',
    elements: [{
      name: 'Hunter'
    }, {
      name: 'Vincent'
    }]
  })
})

app.get('/api/login', async (req, res) => {
  return res.status(200).json({
    status: 'success',
    elements: {
      accessToken: await signAccessToken(),
      refreshToken: await signRefreshToken(),
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running at >>> ${PORT}`);
})