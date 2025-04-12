// routes/ridesRoutes.js

const express = require('express');
const router = express.Router();
const ridesController = require('../controllers/ridesController');

// Create a new ride
router.post('/create', ridesController.createRide);

// Get all available rides
router.get('/all', ridesController.getAllRides);

module.exports = router;
