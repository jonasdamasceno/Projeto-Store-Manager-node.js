const { salesModel } = require('../models');
// const getAllSales = async () => {
//   const sales = await getAllSales();
//   if
// }

const getAllSalesService = async () => {
  const sales = await salesModel.getAllSales();

  if (!sales) return { status: 'NOT_FOUND', data: { message: 'Not found sales' } };
  return { status: 'SUCCESS', data: sales };
};

const getSaleByIdService = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) { 
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 
  }
  return { status: 'SUCCESS', data: sales };
};

const createAndInsertSales = async (sales) => ({
  status: 'CREATED',
  data: await salesModel.createAndSaveNewSale(sales),
});

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  createAndInsertSales,
};