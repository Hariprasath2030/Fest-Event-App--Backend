const Customer = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Customer signup controller
const customerSignup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Basic validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Organiser already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer
        const newCustomer = new Customer({ name, email, password: hashedPassword, phone, role: 'organiser' });
        await newCustomer.save();

        res.status(201).json({ message: 'Organiser registered successfully', customer: newCustomer });
    } catch (error) {
        console.error('Error in customerSignup:', error);
        res.status(500).json({ message: 'Error in customer signup', error: error.message });
    }
};

// Customer login controller
const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ message: 'Organiser not found' });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: customer._id, role: customer.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Organiser logged in successfully',
            token,
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                role: customer.role,
            },
        });
    } catch (error) {
        console.error('Error during customer login:', error);
        res.status(500).json({ message: 'Error in customer login', error: error.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        console.log('Requested ID:', req.params.id); // Log the requested ID
        const organiser = await Customer.findById(req.params.id).lean();
        if (!organiser) {
            console.log('Organiser not found'); // Debug message for not found
            return res.status(404).json({ message: 'Organiser not found' });
        }
        res.status(200).json({ organiser });
    } catch (error) {
        console.error('Error getting organiser by ID:', error);
        res.status(500).json({ message: 'Error retrieving organiser', error: error.message });
    }
};

// Update organiser details
const updateCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const updatedOrganiser = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true, runValidators: true }
        );

        if (!updatedOrganiser) {
            return res.status(404).json({ message: 'Organiser not found' });
        }

        res.status(200).json({ message: 'Organiser updated successfully', organiser: updatedOrganiser });
    } catch (error) {
        console.error('Error updating organiser:', error);
        res.status(500).json({ message: 'Error updating organiser', error: error.message });
    }
};

// Delete organiser
const deleteCustomer = async (req, res) => {
    try {
        const deletedOrganiser = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedOrganiser) {
            return res.status(404).json({ message: 'Organiser not found' });
        }
        res.status(200).json({ message: 'Organiser deleted successfully' });
    } catch (error) {
        console.error('Error deleting organiser:', error);
        res.status(500).json({ message: 'Error deleting organiser', error: error.message });
    }
};

module.exports = {
    customerSignup,
    customerLogin,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
