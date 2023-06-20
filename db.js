const Pool = require("pg").Pool;

//! Connect to database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "data1245base",
  port: 5432,
});

//! Export pool
module.exports = pool;
