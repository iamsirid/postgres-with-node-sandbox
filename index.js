const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');
const { pool } = require('./database/psql');
const { cleanDB, testDBConnection } = require('./database/db-utill');

// Test pqsl connection
(async () => {
  try {
    await testDBConnection(pool);
  } catch (err) {
    if (err.message === 'no db') {
      try {
        await cleanDB();
      } catch (err) {
        throw err;
      }
    } else console.error(err);
  }
})();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
