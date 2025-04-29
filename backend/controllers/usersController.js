const { Op } = require('sequelize');
const sequelize = require('../config/database');


//const { User, Car, Rating, Ride, Notification } = require('../models'); // Import all models
const { User, Car, Rating, Ride, RideStop, RideRequest, Notification } = require('../models'); // Added RideStop here

// Get minimal user info for sidebar (name, nuid, profile_picture)
exports.getSidebarInfo = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findByPk(userId, {
        attributes: ['name', 'nu_id', 'profile_picture']
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



// Get full user info
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        'id',
        'nu_id',
        'phone_number',
        'name',
        'gender',
        'profile_picture',
        'last_role_used',
        'created_at'
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.editUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, gender, phone_number } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the allowed fields
    user.name = name ?? user.name;
    user.gender = gender ?? user.gender;
    user.phone_number = phone_number ?? user.phone_number;

    await user.save();

    res.status(200).json({ message: 'User info updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverRideHistory = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const rides = await Ride.findAll({
        where: {
          driver_id: userId,
          status: 'completed' // Only completed rides
        },
        include: [
          {
            model: RideStop,
            attributes: ['stop_name', 'stop_order']
          },
          {
            model: Car,
            attributes: ['model', 'color', 'license_plate']
          }
        ],
        order: [['date', 'DESC']]
      });
  
      const formattedRides = rides.map(ride => ({
        id: ride.id,
        date: ride.date,
        start_time: ride.start_time,
        total_seats: ride.total_seats,
        available_seats: ride.available_seats,
        booked_seats: ride.total_seats - ride.available_seats,
        car: ride.Car,
        stops: ride.RideStops
          ?.sort((a, b) => a.stop_order - b.stop_order)
          .map(stop => stop.stop_name)
      }));
  
      res.status(200).json({ role: 'driver', rides: formattedRides });
    } catch (error) {
      console.error('Error fetching driver ride history:', error);
      res.status(500).json({ error: error.message });
    }
  };



// Function to get passenger's ride history
exports.getPassengerRideHistory = async (req, res) => {
  try {
    const { userId } = req.params; // Extract passenger userId

    // Fetch accepted ride requests
    const rideRequests = await RideRequest.findAll({
      where: {
        passenger_id: userId,
        status: 'accepted',
      },
      include: [
        {
          model: Ride,
          include: [
            {
              model: Car, // No alias used
              attributes: ['model', 'color', 'license_plate'], // your car fields
            },
            {
              model: User, // No alias used
              attributes: ['name', 'profile_picture'], // driver fields
            },
          ],
          attributes: [
            'id',
            'start_time',
            'status',
            'available_seats',
            'total_seats',
            'date'
          ],
        },
        {
          model: RideStop, // Include pickup stop also if needed
          attributes: ['stop_name'],
        }
      ],
    });

    if (!rideRequests || rideRequests.length === 0) {
      return res.status(404).json({ message: 'No accepted rides found for this passenger.' });
    }

    // Format results
    const rideHistory = rideRequests.map(request => {
      const ride = request.Ride; // Notice: model names are Capitalized by default
      const car = ride?.Car;
      const driver = ride?.User;
      const stop = request?.RideStop;

      return {
        rideId: ride.id,
        pickupStop: stop ? stop.stop_name : null,
        startTime: ride.start_time,
        rideStatus: ride.status,
        carModel: car?.model,
        carColor: car?.color,
        carLicensePlate: car?.license_plate,
        driverName: driver?.name,
        driverProfilePicture: driver?.profile_picture,
      };
    });

    return res.status(200).json({ rideHistory });
  } catch (error) {
    console.error('Error fetching passenger ride history:', error);
    return res.status(500).json({ error: 'An error occurred while fetching ride history.' });
  }
};


// Get user's profile picture
exports.getProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId, {
      attributes: ['profile_picture'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ profile_picture: user.profile_picture });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload or update user's profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { profile_picture } = req.body; // <-- from the body, not file!

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile_picture = profile_picture; // simple text update
    await user.save();

    res.status(200).json({ 
      message: 'Profile picture updated successfully', 
      profile_picture: user.profile_picture 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get user ratings
exports.getUserRatings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ratings = await Rating.findAll({
      where: { reviewee_id: userId },
      attributes: ['id', 'role', 'rating', 'comment', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['name'],
          required: false,
          on: {
            '$Rating.reviewer_id$': { [Op.col]: 'User.id' }
          }
        },
        {
          model: Ride,
          attributes: ['id', 'date'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






/*
// Get user's cars
exports.getUserCars = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cars = await Car.findAll({
      where: { user_id: userId },
      attributes: ['model', 'color', 'license_plate'],
    });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a car for the user
exports.addCar = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { model, color, license_plate } = req.body;

    const car = await Car.create({
      user_id: userId,
      model,
      color,
      license_plate,
    });

    res.status(201).json({ message: 'Car added successfully', car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user's car details
exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const { model, color, license_plate } = req.body;

    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.model = model || car.model;
    car.color = color || car.color;
    car.license_plate = license_plate || car.license_plate;

    await car.save();

    res.status(200).json({ message: 'Car details updated successfully', car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user's car
exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.destroy();

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/

// Log out the user (optional)
exports.logout = async (req, res) => {
  try {
    // In this case, we'll just clear the session or JWT token
    // Assuming you're using JWT or sessions for authentication
    // This logic depends on how you've implemented the authentication

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
