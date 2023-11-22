const connection = require('../connection/connection');

const getAllProducts = async () => {
  const [resultProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return resultProducts;
};

const getProductsById = async (productId) => {
  const [[resultProductsById]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return resultProductsById;
};

const create = async (name) => {
  const query = `
    INSERT INTO products (name) values (?)
  `;
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductsById,
  create,
};
