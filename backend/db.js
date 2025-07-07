const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // change if you created a custom user
  host: 'localhost',
  database: 'dpgs_auth',
  password: 'Hi427*dv', // <-- replace with your actual password
  port: 5432,
});

module.exports = pool; 