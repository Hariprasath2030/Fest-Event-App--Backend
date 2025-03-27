const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventImage: { type: String, required: true },
});

const Customer_events = mongoose.model('Customer_events', eventSchema);

module.exports = Customer_events;
