const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection
const User = require('./Users'); // User model for foreign key relation
const Car = require('./Cars'); // Car model for foreign key relation

const Ride = sequelize.define('Ride', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  driver_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
  },
  car_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: Car,
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  start_time: { 
    type: DataTypes.DATE,
    allowNull: false
  },
  date: { 
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  total_seats: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available_seats: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: { 
    type: DataTypes.STRING(20),
    defaultValue: 'active'
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'rides', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = Ride;
