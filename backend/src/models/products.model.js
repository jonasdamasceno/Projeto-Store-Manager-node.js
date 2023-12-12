const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const insertNewProduct = async (newProduct) => {
  const { name } = newProduct;
  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return insertId;
};

const updateNewProduct = async (update, id) => {
  const { name } = update;
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  return connection.execute(query, [name, id]);
};
const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = (?) ';
  return connection.execute(query, [id]);
};

const filterProduct = async (q) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`]);
  return result;
};

module.exports = { 
  findAll,
  findById,
  insertNewProduct,
  updateNewProduct,
  deleteProduct,
  filterProduct,
};