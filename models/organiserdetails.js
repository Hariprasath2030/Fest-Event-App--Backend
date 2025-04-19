const mongoose = require("mongoose");

const organiserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event" },
  eventName: { type: String, required: true },
  imageUrls: [{ type: String }],
});

module.exports = mongoose.model("Organiser", organiserSchema);
