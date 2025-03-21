const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to create a new event
router.post('/', eventController.createEvent);

// Route to get all events
router.get('/', eventController.getAllEvents);

module.exports = router;
