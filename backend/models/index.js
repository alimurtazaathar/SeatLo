const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');  // Import sequelize from database.js

// Import individual models
const User = require('./Users');
const Car = require('./Cars');
const Ride = require('./Rides');
const RideStop = require('./RideStops');
const RideRequest = require('./RideRequests');
const Rating = require('./Ratings');
const Notification = require('./Notifications');

// Test the connection to ensure it's working
sequelize.authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL successfully!'))
  .catch(err => console.error('❌ Connection failed:', err));

// Define associations between models
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

// Export sequelize and all models
module.exports = { sequelize, User, Car, Ride, RideStop, RideRequest, Rating, Notification };
