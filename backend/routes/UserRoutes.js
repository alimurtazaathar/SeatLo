// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Profile & Profile Picture
router.get('/:userId', usersController.getUserProfile);
router.put('/:userId', usersController.updateUserProfile);
router.get('/:userId/profile-picture', usersController.getProfilePicture);
router.post('/:userId/profile-picture', usersController.uploadProfilePicture);

// Rides History
router.get('/:userId/rides-history', usersController.getRidesHistory);

// Ratings & Reviews
router.get('/:userId/ratings', usersController.getUserRatings);
router.post('/ratings', usersController.submitRating);

// Car Management
router.get('/:userId/cars', usersController.getUserCars);
router.post('/:userId/cars', usersController.addCar);
router.put('/cars/:carId', usersController.updateCar);
router.delete('/cars/:carId', usersController.deleteCar);

// Logout (optional)
router.post('/logout', usersController.logout);

module.exports = router;