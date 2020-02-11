const { Pool } = require('pg');

const dbName = 'api';
const connectionOption = {
  user: 'postgres',
  host: 'localhost',
  database: dbName,
  password: 'password',
  port: 5431
};
const psqlPromise = type => ({
  query: q =>
    new Promise((resolve, reject) =>
      type.query(q, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      })
    )
});

const pool = new Pool(connectionOption);

module.exports = {
  connectionOption,
  pool,
  psqlPromise
};
