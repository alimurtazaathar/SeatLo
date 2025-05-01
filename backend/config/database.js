const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,
});


// Connect to PostgreSQL using existing database
/*const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,  
    dialect: process.env.DB_DIALECT,  
    port: process.env.DB_PORT,
    logging: console.log,  // Set to false to disable SQL logs
  }
);
*/
// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL successfully!'))
  .catch(err => console.error('❌ Connection failed:', err));

module.exports = sequelize;
