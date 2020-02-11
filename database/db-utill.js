const { connectionOption, pool, psqlPromise } = require('./psql');
const { Client } = require('pg');
const _ = require('lodash');

const poolPromise = psqlPromise(pool);

const testDBConnection = async type => {
  return new Promise((resolve, reject) =>
    type.connect((err, client, release) => {
      if (err) {
        if (
          _.includes(err.message, 'database') &&
          _.includes(err.message, 'does not exist')
        ) {
          reject(new Error('no db'));
        } else reject(err);
        return;
      }
      resolve('psql connected');
      console.log(
        `psql connected with connection type: ${
          type.constructor.name
        }, database: ${type.options && type.options.database}`
      );
      // console.log(type);
    })
  );
};

const addStructure = async () => {
  try {
    await poolPromise.query(`CREATE TABLE users (
      ID SERIAL PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(50)
    )`);
  } catch (err) {
    throw err;
  }
};

const dumpData = async () => {
  try {
    await poolPromise.query(`INSERT INTO users (name, email)
    VALUES ('rit', 'rit@email.com'), ('someoneelse', 'someoneelse@someamazingwebsite.com')`);
  } catch (err) {
    throw err;
  }
};

const cleanDB = async () => {
  const initialDBClient = new Client({
    ...connectionOption,
    database: 'postgres'
  });

  try {
    await testDBConnection(initialDBClient);

    const checkDBClientPromise = psqlPromise(initialDBClient);

    await checkDBClientPromise.query('DROP DATABASE IF EXISTS api');
    await checkDBClientPromise.query('CREATE DATABASE api');
    await testDBConnection(pool);
    await addStructure();
    await dumpData();
  } catch (err) {
    throw err;
  }
};
module.exports = {
  testDBConnection,
  cleanDB
};
