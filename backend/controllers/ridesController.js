// controllers/ridesController.js
const sequelize = require('../config/database');
const { Ride, RideStop, User, Car, RideRequest, Rating } = require('../models'); // Import all models from index.js

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
        { model: User, 
          attributes: ['name'] },
        { model: RideStop, 
          attributes: ['stop_name', 'stop_order'] },
        { model: Car, 
          attributes: ['model', 'color', 'license_plate'] },
        {
          model: RideRequest, // Include the RideRequest to check if the user has requested this ride
          where: { passenger_id: userId },
          required: false, // Makes the join optional (if no request exists for this ride)
          attributes: ['status'] // Get the status of the user's request
        }
      ],
      attributes: ['start_time', 'date', 'total_seats', 'available_seats']
    });

    // Transform the data
    const cleanRides = rides.map(ride => {
      const requestStatus = ride.RideRequests?.[0]?.status || null; // If no request, default to null

      return {
        driver: ride.User?.name, // Accessing driver using the default alias 'User'
        car: ride.Car, // Accessing car using the default alias 'Car'
        start_time: ride.start_time,
        date: ride.date,
        total_seats: ride.total_seats,
        available_seats: ride.available_seats,
        stops: ride.RideStops
          .sort((a, b) => a.stop_order - b.stop_order)
          .map(stop => stop.stop_name), // Accessing stops using the default alias 'RideStops'
        request_status: requestStatus // Add the request status to the response
      };
    });

    res.status(200).json(cleanRides); // Return the transformed ride data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get ride details
exports.getRideDetails = async (req, res) => {
  try {
    const rideId = req.params.rideId; // Assuming rideId is passed as a URL parameter

    const ride = await Ride.findOne({
      where: { id: rideId },
      include: [
        {
          model: User, // Including the driver (user)
          attributes: ['name', 'profile_picture'], // Including the driver's name and profile picture
        },
        {
          model: RideStop, // Including ride stops (sorted by stop order)
          attributes: ['stop_name', 'stop_order'],
        },
        {
          model: Car, // Including car details
          attributes: ['model', 'color', 'license_plate'],
        },
        {
          model: RideRequest, // Including ride requests to check if the user has requested this ride
          where: { status: 'accepted' },
          required: false, // Makes the join optional (if no request exists for this ride)
          attributes: ['id', 'passenger_id', 'status'], // Get the request status and passenger details
          include: [
            {
              model: User, // Including user details of the passenger
              attributes: ['name'], // Get the passenger's name
            },
          ],
        },
      ],
      attributes: ['start_time', 'date', 'total_seats', 'available_seats'], // Including ride-specific details
    });

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    // Transform the ride data
    const rideDetails = {
      id: ride.id,
      start_time: ride.start_time,
      date: ride.date,
      total_seats: ride.total_seats,
      available_seats: ride.available_seats,
      driver: ride.User, // Driver details
      car: ride.Car, // Car details
      stops: ride.RideStops.sort((a, b) => a.stop_order - b.stop_order).map(stop => stop.stop_name), // Sorted stops
      ride_request: ride.RideRequests.length > 0 ? {
        status: ride.RideRequests[0].status, // Request status
        passenger_name: ride.RideRequests[0].User.name, // Passenger's name
      } : null, // If no request, set it as null
    };

    res.status(200).json(rideDetails); // Return the ride details

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};


exports.createRideRequest = async (req, res) => {
  try {
    const { rideId, userId } = req.params;  // Getting rideId and userId from the URL
    const { status } = req.body; // Getting status from the body of the request

    // Find if the ride exists
    const ride = await Ride.findByPk(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Find if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new ride request
    const rideRequest = await RideRequest.create({
      ride_id: rideId,
      passenger_id: userId,
      status: status,  // Assuming status is provided in the body
    });

    // Return the created ride request
    res.status(201).json({ message: 'Ride request created successfully', rideRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};