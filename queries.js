const { pool, psqlPromise } = require('./database/psql');
const poolPromise = psqlPromise(pool);

const getUsers = async (request, response) => {
  try {
    const result = await poolPromise.query(
      'SELECT * FROM users ORDER BY id ASC'
    );
    response.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const result = await poolPromise.query(
      `SELECT * FROM users WHERE id = ${id}`
    );
    response.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2)',
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      // response.status(201).send(`User added with ID: ${result}`);
      response.status(200).json(result);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;
  console.log([name, email, request.body]);

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
