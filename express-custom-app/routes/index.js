const express = require('express');
const router = express.Router();

// Import the controller
const indexController = require('../controllers/users.controller');
// Define the route for the index page
router.get('/', indexController.index);
// Export the router
module.exports = router;