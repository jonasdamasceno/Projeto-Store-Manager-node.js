const connection = require('../connection/connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};
const getById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const create = async (name) => {
  const query = `
    INSERT INTO products (name) values (?)
  `;
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

module.exports = {
  getAll,
  getById,
  create,
};
