const connection = require('../connection/connection');

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

const deleteProductById = (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  return connection.execute(query, [id]);
};  

module.exports = {
  getAllProducts,
  create,
  getProductsById,
  deleteProductById,
};
