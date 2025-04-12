const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection
const Ride = require('./Rides'); // Ride model for foreign key relation
const User = require('./Users'); // User model for foreign key relation
const RideStop = require('./RideStops'); // RideStop model for foreign key relation

const RideRequest = sequelize.define('RideRequest', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ride_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: Ride,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  passenger_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  stop_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: RideStop,
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  seats_requested: { 
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  status: { 
    type: DataTypes.STRING(20),
    defaultValue: 'pending'
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'ride_requests', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = RideRequest;
