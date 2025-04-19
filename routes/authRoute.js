const express = require('express');
const router = express.Router();
const { customerLogin } = require('../controllers/authController');
const { customerSignup } = require('../controllers/authController');

// Define the route for customer signup
router.post('/customerSignup', customerSignup);

// Define the route for customer login
router.post('/customerLogin', customerLogin);


module.exports = router;
