const { Pool } = require('pg');

const PG_URI =
  'postgres://tnzvofio:iwFLscv4M6yJCGsLfOHYxE-QHuZy0KF4@cornelius.db.elephantsql.com/tnzvofio';

const pool = new Pool({
  connectionString: PG_URI,
});



module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
