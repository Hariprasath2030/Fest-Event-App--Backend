const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventImage: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
