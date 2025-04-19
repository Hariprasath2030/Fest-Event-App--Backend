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

module.exports = router;
