const express = require('express');
const router = express.Router();
const { customerSignup, customerLogin, getCustomerById, updateCustomer, deleteCustomer } = require('../controllers/authController');

// Define the route for customer signup
router.post('/customerSignup', customerSignup);

// Define the route for customer login
router.post('/customerLogin', customerLogin);

// Route for customer operations
router.get('/', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
module.exports = router;
