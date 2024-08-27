const express = require('express');
const route = express.Router();
const { authPage, authCourse, authUser } = require('../middleware/basicAuth');

route.get('/get-lists', authUser, authPage(['ADMIN', 'MOD']), (req, res, next) => {
  res.send("Get list student");
});

route.get('/:number', authUser, authCourse, (req, res, next) => {
  res.send("You have access to this course!");
})

module.exports = route;