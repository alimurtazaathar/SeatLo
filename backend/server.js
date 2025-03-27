const express = require('express');
const sequelize = require('./config/database');
PORT = 5000

const app = express();
app.use(express.json()); // JSON middleware

// API to Get All Users (Using Raw SQL)
app.get('/viewusers', async (req, res) => {
  try {
    const [users] = await sequelize.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => console.log('🚀 Server running on port 5000'));
