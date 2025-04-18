const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); 

// Import models
const User = require('./Users');
const Car = require('./Cars');
const Ride = require('./Rides');
const RideStop = require('./RideStops');
const RideRequest = require('./RideRequests');
const Rating = require('./Ratings');
const Notification = require('./Notifications');

// Define associations
User.hasMany(Car, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Car.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Ride, { foreignKey: 'driver_id', onDelete: 'CASCADE' });
Ride.belongsTo(User, { foreignKey: 'driver_id' });

Ride.hasMany(RideStop, { foreignKey: 'ride_id', onDelete: 'CASCADE' });
RideStop.belongsTo(Ride, { foreignKey: 'ride_id' });

Ride.hasMany(RideRequest, { foreignKey: 'ride_id', onDelete: 'CASCADE' });
RideRequest.belongsTo(Ride, { foreignKey: 'ride_id' });

User.hasMany(RideRequest, { foreignKey: 'passenger_id', onDelete: 'CASCADE' });
RideRequest.belongsTo(User, { foreignKey: 'passenger_id' });

RideStop.hasMany(RideRequest, { foreignKey: 'stop_id', onDelete: 'SET NULL' });
RideRequest.belongsTo(RideStop, { foreignKey: 'stop_id' });

User.hasMany(Rating, { foreignKey: 'reviewer_id', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'reviewer_id' });

User.hasMany(Rating, { foreignKey: 'reviewee_id', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'reviewee_id' });

User.hasMany(Notification, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

// Ensure Ride and Car are associated properly
Ride.belongsTo(Car, { foreignKey: 'car_id', onDelete: 'SET NULL' });
Car.hasMany(Ride, { foreignKey: 'car_id' });

// Export models
module.exports = { sequelize, User, Car, Ride, RideStop, RideRequest, Rating, Notification };
