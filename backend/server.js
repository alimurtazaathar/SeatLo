// backend/server.js

const express = require('express');
const app = express();
const port = 5000;  // You can choose any available port

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Carpool App Backend Running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
