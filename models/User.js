const mongoose = require('mongoose');

// Define the Customer schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: Number, required: [true, 'Phone number is required'] }, // New phone field
    role: { type: String, default: 'organiser' },
});

module.exports = mongoose.model('organiser', customerSchema);
