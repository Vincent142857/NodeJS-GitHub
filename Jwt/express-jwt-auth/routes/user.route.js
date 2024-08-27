const express = require('express');
const route = express.Router();

const { userValidate } = require('../helpers/validation');
const { verifyAccessToken } = require('../helpers/jwt_service');

const { register, refreshToken, login, logout, getList } = require('../controllers/user.controller');

route.post('/register', register);

route.post('/refresh-token', refreshToken);

route.post('/login', login);

route.delete('/logout', logout);

route.get('/get-list', verifyAccessToken, getList);


module.exports = route;