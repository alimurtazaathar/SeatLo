const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Database connection
const User = require('./Users'); // User model for foreign key relation

const Notification = sequelize.define('Notification', {
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
    onDelete: 'CASCADE'
  },
  type: { 
    type: DataTypes.STRING(50),
    allowNull: true
  },
  message: { 
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_read: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notifications', // ✅ Use existing table
  timestamps: false  // ✅ Don't add createdAt/updatedAt if not in table
});

module.exports = Notification;
