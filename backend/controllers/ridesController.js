// controllers/ridesController.js
const sequelize = require('../config/database');
const { Ride, RideStop, User, Car, RideRequest, Rating } = require('../models'); // Import all models from index.js

// Create a ride
exports.createRide = async (req, res) => {
  try {
    const { userId } = req.params;
    const { car_id, start_time, date, total_seats, stops } = req.body;

    const driver_id = parseInt(userId, 10);
    if (isNaN(driver_id)) {
      return res.status(400).json({ error: "Invalid driver ID" });
    }

    console.log({ driver_id, car_id, start_time, date, total_seats });

    const ride = await Ride.create({
      driver_id,
      car_id,
      start_time,
      date,
      total_seats,
      available_seats: total_seats
    });

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
    console.error(error);
    res.status(500).json({ error: error.message || 'Server Error' });
  }
};



// controllers/ridesController.js

exports.getAllRides = async (req, res) => {
  try {
    const userId = req.params.userId; // userId from route parameter

    const rides = await Ride.findAll({
      where: { status: 'active' },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: RideStop,
          attributes: ['stop_name', 'stop_order'],
        },
        {
          model: Car,
          attributes: ['model', 'color', 'license_plate'],
        },
        {
          model: RideRequest,
          where: { passenger_id: userId },
          required: false, // Allow rides without a request from this user
          attributes: ['status'],
        },
      ],
      attributes: ['id', 'start_time', 'date', 'total_seats', 'available_seats'],
    });

    const formattedRides = rides.map(ride => {
      const requestStatus = ride.RideRequests?.[0]?.status || null;

      return {
        id: ride.id,
        driver: ride.User?.name || 'Unknown',
        car: ride.Car || null,
        start_time: ride.start_time,
        date: ride.date,
        total_seats: ride.total_seats,
        available_seats: ride.available_seats,
        stops: (ride.RideStops || [])
          .sort((a, b) => a.stop_order - b.stop_order)
          .map(stop => stop.stop_name),
        request_status: requestStatus,
      };
    });

    res.status(200).json(formattedRides);
  } catch (error) {
    console.error('Error in getAllRides:', error);
    res.status(500).json({ error: error.message });
  }
};


// Controller function to get ride details
exports.getRideDetails = async (req, res) => {
  try {
    const rideId = req.params.rideId;

    const ride = await Ride.findOne({
      where: { id: rideId },
      include: [
        {
          model: User,
          attributes: ['name', 'profile_picture'],
        },
        {
          model: RideStop,
          attributes: ['id', 'stop_name', 'stop_order'],
        },
        {
          model: Car,
          attributes: ['model', 'color', 'license_plate'],
        },
        {
          model: RideRequest,
          where: { status: 'accepted' },
          required: false,
          attributes: ['id', 'passenger_id', 'status'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
      attributes: ['id', 'start_time', 'date', 'total_seats', 'available_seats'],
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
      driver: ride.User,
      car: ride.Car,
      stops: ride.RideStops
        .sort((a, b) => a.stop_order - b.stop_order)
        .map(stop => ({
          id: stop.id,
          stop_name: stop.stop_name,
          stop_order: stop.stop_order
        })),
      request_status: ride.RideRequests.length > 0 ? {
        status: ride.RideRequests[0].status,
        passenger_name: ride.RideRequests[0].User.name,
      } : null,
    };

    res.status(200).json(rideDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



// controllers/ridesController.js
exports.createRideRequest = async (req, res) => {
  try {
    const { rideId, userId } = req.params;
    const { stop_id, seats_requested } = req.body;

    // Fetch the ride to check availability
    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ error: "Ride not found" });

    // Check if enough seats are available
    if (seats_requested > ride.available_seats) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    // Prevent duplicate ride requests
    const existingRequest = await RideRequest.findOne({
      where: { ride_id: rideId, passenger_id: userId }
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Duplicate request not allowed" });
    }

    // Create the ride request
    const newRequest = await RideRequest.create({
      ride_id: rideId,
      passenger_id: userId,
      stop_id,
      seats_requested
    });

    // Optional: notify the driver
    // await Notification.create({ user_id: ride.driver_id, message: `New ride request from user ${userId}` });

    return res.status(201).json(newRequest);

  } catch (error) {
    console.error("❌ Ride request failed:", error); // This will show error in your terminal
    return res.status(500).json({ error: "Server error" });
  }
};



exports.viewActiveRideByDriver = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ride = await Ride.findOne({
      where: {
        driver_id: userId,
        status: 'active'
      },
      include: [
        {
          model: RideStop,
          attributes: ['id', 'stop_name', 'stop_order']
        },
        {
          model: Car,
          attributes: ['id', 'model', 'license_plate']
        },
        {
          model: RideRequest,
          where: {
            status: ['pending', 'accepted']
          },
          required: false,
          attributes: ['id', 'passenger_id', 'stop_id', 'seats_requested', 'status', 'created_at']
        }
      ],
      attributes: [
        'id', 'driver_id', 'car_id', 'start_time', 'date',
        'total_seats', 'available_seats', 'status', 'created_at'
      ]
    });

    if (!ride) {
      return res.status(404).json({ message: 'No active ride found for this driver.' });
    }

    return res.status(200).json(ride);
  } catch (error) {
    console.error('Error fetching active ride:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};






