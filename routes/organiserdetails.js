const express = require("express");
const router = express.Router();
const Organiser = require("../models/organiserdetails");

// Create organiser
router.post("/", async (req, res) => {
  try {
    const { name, phone, address, eventId, eventName, imageUrls } = req.body;

    // Basic validation
    if (!name || !phone || !address || !eventId || !eventName || !imageUrls || !imageUrls.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrganiser = new Organiser({
      name,
      phone,
      address,
      eventId,
      eventName,
      imageUrls,
    });

    const savedOrganiser = await newOrganiser.save();
    res.status(201).json(savedOrganiser);
  } catch (error) {
    console.error("Error creating organiser:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all organisers
router.get("/", async (req, res) => {
  try {
    const organisers = await Organiser.find();
    res.status(200).json(organisers);
  } catch (error) {
    console.error("Error fetching organisers:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// PUT update organiser
router.put('/:id', async (req, res) => {
  try {
      const updated = await Organiser.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Organiser not found' });
      res.json(updated);
  } catch (err) {
      res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// DELETE organiser
router.delete('/:id', async (req, res) => {
  try {
      const deleted = await Organiser.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Organiser not found' });
      res.json({ message: 'Organiser deleted successfully' });
  } catch (err) {
      res.status(400).json({ message: 'Delete failed', error: err.message });
  }
});


module.exports = router;
