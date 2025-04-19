const mongoose = require("mongoose");

const organiserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    eventId: { type: Number, required: true }, // Changed from Integer to Number
    eventName: { type: String, required: true },
    imageUrls: { type: [String], required: true }, // Array of image URLs
});

module.exports = mongoose.model("Organiserdetails", organiserSchema);
