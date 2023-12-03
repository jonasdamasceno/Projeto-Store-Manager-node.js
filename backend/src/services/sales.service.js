const { getAllSales, getSalesById } = require('../models/sales.model');
// const getAllSales = async () => {
//   const sales = await getAllSales();
//   if
// }

const getAllSalesService = async () => {
  const sales = await getAllSales();

  if (!sales) return { status: 'NOT_FOUND', data: { message: 'Not found sales' } };
  return { status: 'SUCCES', data: sales };
};

const getSaleByIdService = async (id) => {
  const sales = await getSalesById(id);
  if (sales.length === 0) { 
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 
  }
  return { status: 'SUCCES', data: sales };
};

// const getAllSalesService = async (req, res) => {
//   const sales = await getAllSales();
//   res.status(200).json(sales);
// };

// const getSaleByIdService = async (req, res) => {
//   const { id } = await req.params;
//   const sales = await getSalesById(id);
//   if (!sales.length) return res.status(404).json({ message: 'Sale not found' });
//   res.status(200).json(sales);
// };

module.exports = {
  getAllSalesService,
  getSaleByIdService,
};
