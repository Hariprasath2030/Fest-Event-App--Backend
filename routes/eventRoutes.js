const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Create a new event
router.post("/", async (req, res) => {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newEvent = new Event({ title, description, imageUrl });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update an event
router.put("/:id", async (req, res) => {
    const { title, description, imageUrl } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, imageUrl },
            { new: true }
        );

        if (!updatedEvent) return res.status(404).json({ error: "Event not found" });

        res.json(updatedEvent);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete an event
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ error: "Event not found" });

        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
