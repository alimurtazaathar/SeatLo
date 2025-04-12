const express = require('express');
const sequelize = require('./config/database');
const { User, Car, Ride, RideStop, RideRequest, Rating, Notification, RideHistory } = require('./models'); // Import all models

const PORT = 5000;
const app = express();

app.use(express.json()); // JSON middleware

// Sync Sequelize models with the database
sequelize.sync({ force: false }) // Change `force: true` to `false` in production
  .then(() => {
    console.log('✅ Database synced successfully!');
    
    // Start Server only after the database is synced
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database sync failed:', err);
  });

// API to Get All Users (Using Raw SQL)
app.get('/viewusers', async (req, res) => {
  try {
    const [users] = await sequelize.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Other API routes go here...

