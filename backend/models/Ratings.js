const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection
const Ride = require('./Rides'); // Ride model for foreign key relation
const User = require('./Users'); // User model for foreign key relation

const Rating = sequelize.define('Rating', {
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
  reviewer_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  reviewee_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  role: { 
    type: DataTypes.STRING(10),
    allowNull: true
  },
  rating: { 
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: true
  },
  comment: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'ratings', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = Rating;
