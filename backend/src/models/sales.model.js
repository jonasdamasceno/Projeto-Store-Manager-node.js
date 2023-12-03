const connection = require('../connection/connection');

const getAllSales = async () => {
  const query = `SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
FROM sales_products AS SP
JOIN sales AS S ON SP.sale_id = S.id;`;
  const [resposta] = await connection.execute(query);
  return resposta;
};

const getSalesById = async (id) => {
  const [resposta] = await connection.execute(`SELECT sp.product_id, sp.quantity, s.date
    FROM sales_products sp
      INNER JOIN sales s 
      ON sp.sale_id = s.id 
      WHERE sale_id = (?)`, [id]);
  return resposta;
};

module.exports = { getAllSales, getSalesById };