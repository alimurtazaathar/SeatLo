const express = require('express');
const sequelize = require('./config/database');
const { User, Car, Ride, RideStop, RideRequest, Rating, Notification, RideHistory } = require('./models'); // Import all models

// Import custom route files
const rideRoutes = require('./routes/RidesRoutes');
const carRoutes = require('./routes/CarRoutes');
const usersRoutes = require('./routes/usersRoutes'); // Adjust the path if needed


const PORT = 5000;
const app = express();

app.use(express.json()); // JSON middleware

// So `/api/rides/all` will hit the GET all rides route
app.use('/api/rides', rideRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', usersRoutes);



// API to Get All Users (Using Raw SQL)
app.get('/viewusers', async (req, res) => {
  try {
    const [users] = await sequelize.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Don't sync the database, just start the server
// (You can comment the sync code if you don't need it right now)
// sequelize.sync({ force: false }) 
//   .then(() => {
//     console.log('✅ Database synced successfully!');
//   })
//   .catch((err) => {
//     console.error('❌ Database sync failed:', err);
//   });

// Start the server directly without syncing models
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// Other API routes go here...
