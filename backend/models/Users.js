const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'users', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = User;
