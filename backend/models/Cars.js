const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection
const User = require('./Users'); // User model for foreign key relation

const Car = sequelize.define('Car', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
  },
  model: { 
    type: DataTypes.STRING(100),
    allowNull: true
  },
  color: { 
    type: DataTypes.STRING(50),
    allowNull: true
  },
  license_plate: { 
    type: DataTypes.STRING(20),
    allowNull: true
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'cars', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = Car;
