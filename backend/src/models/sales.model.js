const camelize = require('camelize');
const connection = require('../connection/connection');
const generateDate = require('../utils/generationData');

const getAllSales = async () => {
  const query = `SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
FROM sales_products AS SP
JOIN sales AS S ON SP.sale_id = S.id;`;
  const [resposta] = await connection.execute(query);
  return camelize(resposta);
};

const getSalesById = async (id) => {
  const [resposta] = await connection.execute(`SELECT sp.product_id, sp.quantity, s.date
    FROM sales_products sp
      INNER JOIN sales s 
      ON sp.sale_id = s.id 
      WHERE sale_id = (?)`, [id]);
  return camelize(resposta);
};

const saveSalesProductsInDatabase = async (sales, insertId) => {
  if (insertId === undefined) {
    console.error('O parâmetro "insertId" está indefinido.');
    return;
  }

  let salesProductsQueries = [];
  if (sales && sales.length > 0) {
    const query = `INSERT INTO sales_products (sale_id, product_id, quantity) 
        VALUES (?, ?, ?);`;
    salesProductsQueries = sales.map(({ productId, quantity }) => connection
      .execute(query, [insertId, productId, quantity]));
    await Promise.all(salesProductsQueries);
  }
};

const createAndSaveNewSale = async (sales) => {
  const query = 'INSERT INTO sales (date) VALUES (?);';
  const [{ insertId }] = await connection.execute(query, [generateDate()]);
  await saveSalesProductsInDatabase(sales, insertId);
  return { id: insertId, itemsSold: sales };
};

module.exports = { 
  getAllSales, 
  getSalesById,
  createAndSaveNewSale,
};