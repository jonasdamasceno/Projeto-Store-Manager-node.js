const connection = require('../connection/connection');

const getAllProducts = async () => {
  const query = `SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
FROM sales_products AS SP
JOIN sales AS S ON SP.sale_id = S.id;`;
  const [resposta] = await connection.execute(query);
  return resposta;
};

// const getProductsById = async () => {
// const query = 
// };

module.exports = { getAllProducts };