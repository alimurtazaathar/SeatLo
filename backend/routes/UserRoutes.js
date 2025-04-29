// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/:userId/sidebar-info', usersController.getSidebarInfo);

router.get('/:userId/editinfo', usersController.getUserProfile);
router.put('/:userId/editinfo', usersController.editUserInfo);


// Profile & Profile Picture. NOt working as of now.
router.get('/:userId/profile-picture', usersController.getProfilePicture);
router.post('/:userId/profile-picture', usersController.uploadProfilePicture);

// Rides History
router.get('/:userId/ridehistory/driver', usersController.getDriverRideHistory);
router.get('/:userId/ridehistory/passenger', usersController.getPassengerRideHistory);

// Ratings & Reviews
router.get('/:userId/ratings', usersController.getUserRatings);


// Car Management
//router.get('/:userId/cars', usersController.getUserCars);
//router.post('/:userId/cars', usersController.addCar);
//router.put('/cars/:carId', usersController.updateCar);
//router.delete('/cars/:carId', usersController.deleteCar);

// Logout (optional)
router.post('/logout', usersController.logout);

module.exports = router;