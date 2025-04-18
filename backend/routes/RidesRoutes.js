// routes/ridesRoutes.js

const express = require('express');
const router = express.Router();
const ridesController = require('../controllers/ridesController');

// Create a new ride
router.post('/create', ridesController.createRide);

// Get all available rides
router.get('/all', ridesController.getAllRides);

// Get specific ride details
router.get('/:rideId', ridesController.getRideDetails);


// send a ride request
router.post('/rides/:rideId/request/:userId', ridesController.createRideRequest);

router.post('/test', (req, res) => res.json({ message: "POST works!" }));

  
module.exports = router;
