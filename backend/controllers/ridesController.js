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

exports.getAllRides = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter

    const rides = await Ride.findAll({
      where: { status: 'active' },
      include: [
        { model: User, as: 'driver', attributes: ['name'] },
        { model: RideStop, as: 'stops', attributes: ['stop_name', 'stop_order'] },
        { model: Car, as: 'car', attributes: ['model', 'color', 'license_plate'] },
        {
          model: RideRequest, // Include the RideRequest to check if the user has requested this ride
          as: 'requests',
          where: { passenger_id: userId },
          required: false, // Makes the join optional (if no request exists for this ride)
          attributes: ['status'] // Get the status of the user's request
        }
      ],
      attributes: ['start_time', 'date', 'total_seats', 'available_seats']
    });

    // Transform the data
    const cleanRides = rides.map(ride => {
      const requestStatus = ride.requests?.[0]?.status || null; // If no request, default to null

      return {
        driver: ride.driver.name,
        car: ride.car,
        start_time: ride.start_time,
        date: ride.date,
        total_seats: ride.total_seats,
        available_seats: ride.available_seats,
        stops: ride.stops
          .sort((a, b) => a.stop_order - b.stop_order)
          .map(stop => stop.stop_name),
        request_status: requestStatus // Add the request status to the response
      };
    });

    res.status(200).json(cleanRides); // Return the transformed ride data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

