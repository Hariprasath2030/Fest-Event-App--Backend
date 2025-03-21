const Event = require('../models/eventModel');

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const { name, email, eventName, eventDate, eventImage } = req.body;

    const newEvent = new Event({
      name,
      email,
      eventName,
      eventDate,
      eventImage,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events', error });
  }
};
