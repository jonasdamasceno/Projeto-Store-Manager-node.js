const connection = require('./connection');

const getAllProducts = async () => {
  const [resultProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return resultProducts;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const create = async (newName) => {
  const query = `
    INSERT INTO products (name) values (?)
  `;
  const name = newName;
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const updateProduct = async (update, id) => {
  const { name } = update;
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  return connection.execute(query, [name, id]);
};

const deleteProductById = async (id) => {
  const query = 'DELETE FROM products WHERE id = (?) ';
  return connection.execute(query, [id]);
};

const searchProducts = async (q) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name LIKE ?', [`%${q}%`]);
  return result;
};

module.exports = {
  getAllProducts,
  create,
  getProductsById,
  deleteProductById,
  updateProduct,
  searchProducts,
};
