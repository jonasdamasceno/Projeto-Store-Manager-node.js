const camelize = require('camelize');
const connection = require('./connection');

const generateDate = () => {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = data.getMonth();
  const dia = data.getDay();
  const horas = data.getHours();
  const minutos = data.getMinutes();
  const segundos = data.getSeconds();
  const formated = `${ano}-${mes + 1}-${dia} ${horas}:${minutos}:${segundos}`;
  return formated;
};

const findAllSales = async () => {
  const [sales] = await connection.execute(`SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
   FROM sales_products sp 
   INNER JOIN sales s 
   ON sp.sale_id = s.id`);
  return camelize(sales);
};
  
const findSalesById = async (id) => {
  const [sales] = await connection.execute(`SELECT sp.product_id, sp.quantity, s.date
     FROM sales_products sp
      INNER JOIN sales s 
      ON sp.sale_id = s.id 
      WHERE sale_id = (?)`, [id]);
  return camelize(sales);
};

const saveSalesProducts = async (sales, insertId) => {
  let salesProducts = [];
  salesProducts = sales.map(({ productId, quantity }) => connection
    .execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity) 
      VALUES (?, ?, ?)`, 
      [insertId, productId, quantity],
    ));
  await Promise.all(salesProducts);
};

const insertNewSales = async (sales) => {
  const date = generateDate();
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUES (?);', [date]);
  await saveSalesProducts(sales, insertId);
  return insertId;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  return connection.execute(query, [id]);
};

const updateQuantitySalesProduct = async (saleid, productid, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  return connection.execute(query, [quantity, saleid, productid]);
};
module.exports = {
  findAllSales,
  findSalesById,
  insertNewSales,
  deleteSale,
  updateQuantitySalesProduct,
};