// controllers/ridesController.js

const { Ride, RideStop, User, Car } = require('../models');

// Create a ride
exports.createRide = async (req, res) => {
  try {
    const { driver_id, car_id, start_time, date, total_seats, stops } = req.body;

    const ride = await Ride.create({
      driver_id,
      car_id,
      start_time,
      date,
      total_seats,
      available_seats: total_seats,
    });

    // Save stops if provided
    if (Array.isArray(stops)) {
      const stopData = stops.map((stop, index) => ({
        ride_id: ride.id,
        stop_name: stop,
        stop_order: index + 1
      }));
      await RideStop.bulkCreate(stopData);
    }

    res.status(201).json({ message: 'Ride created successfully', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all available rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.findAll({
      where: { status: 'active' },
      include: [
        { model: User, as: 'driver', attributes: ['id', 'name'] },  // Alias 'driver'
        { model: RideStop, as: 'stops' },  // Alias 'stops'
        { model: Car, as: 'car' },  // Alias 'car'
      ],
    });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};