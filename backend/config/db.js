const Pool = require("pg").Pool;

// Connection Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database:process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;
