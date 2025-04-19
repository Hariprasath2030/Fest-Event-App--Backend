const express = require('express');
const router = express.Router();
const { customerSignup, customerLogin, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/authController');

// Define the route for customer signup
router.post('/customerSignup', customerSignup);

// Define the route for customer login
router.post('/customerLogin', customerLogin);

// Define the route for getting a customer by ID (GET)
router.get('/', getCustomerById);

// Define the route for updating a customer (PUT)
router.put('/', updateCustomer);

// Define the route for deleting a customer (DELETE)
router.delete('/', deleteCustomer);

module.exports = router;
