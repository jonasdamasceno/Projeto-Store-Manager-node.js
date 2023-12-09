const connection = require('../connection/connection');

const getAllProducts = async () => {
  const [resultProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return resultProducts;
};

// const getProductsById = async (id) => {
//   const [[resultProductsById]] = await connection.execute(
//     'SELECT * FROM StoreManager.products WHERE id = ?',
//     [id],
//   );
//   return resultProductsById;
// };

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

// const create = async (name) => {
//   const query = `
//     INSERT INTO products (name) values (?)
//   `;
//   const [{ insertId }] = await connection.execute(query, [name]);
//   return insertId;
// };

// const insertNewProduct = async (newProduct) => {
//   const name = newProduct;
//   const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
//   return insertId;
// };

module.exports = {
  getAllProducts,
  // getProductsById,
  create,
  // insertNewProduct,
  getProductsById,
};
