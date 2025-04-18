const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/:userId/add-car', carController.addCarForUser);

router.get('/:userId/viewcars', carController.getCarsByUserId);


module.exports = router;
