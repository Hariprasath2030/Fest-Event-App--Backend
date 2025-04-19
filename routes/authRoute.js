const express = require('express');
const router = express.Router();
const { customerSignup, customerLogin, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/authController');

// Define the route for customer signup
router.post('/customerSignup', customerSignup);

// Define the route for customer login
router.post('/customerLogin', customerLogin);

// Route for getting a specific customer by ID
router.get('/:id', getCustomerById);

// Route for updating a customer by ID
router.put('/:id', updateCustomer);

// Route for deleting a customer by ID
router.delete('/:id', deleteCustomer);

module.exports = router;
