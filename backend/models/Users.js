const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nu_id: { 
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  phone_number: { 
    type: DataTypes.STRING(15),
    allowNull: false
  },
  otp_code: { 
    type: DataTypes.STRING(6),
    allowNull: true
  },
  otp_verified: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  name: { 
    type: DataTypes.STRING(100),
    allowNull: true
  },
  gender: { 
    type: DataTypes.STRING(10),
    allowNull: true
  },
  profile_picture: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  last_role_used: { 
    type: DataTypes.STRING(10),
    defaultValue: 'passenger'
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = User;
