const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection
const Ride = require('./Rides'); // Ride model for foreign key relation

const RideStop = sequelize.define('RideStop', {
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
  stop_name: { 
    type: DataTypes.STRING(100),
    allowNull: true
  },
  stop_order: { 
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'ride_stops', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = RideStop;
