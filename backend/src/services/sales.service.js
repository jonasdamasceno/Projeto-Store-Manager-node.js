const { salesModel } = require('../models');
// const getAllSales = async () => {
//   const sales = await getAllSales();
//   if
// }

const getAllSalesService = async () => {
  const sales = await salesModel.getAllSales();

  if (!sales) return { status: 'NOT_FOUND', data: { message: 'Not found sales' } };
  return { status: 'SUCCES', data: sales };
};

const getSaleByIdService = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) { 
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 
  }
  return { status: 'SUCCES', data: sales };
};

const createSales = async (sales) => {
  const data = salesModel.saveSalesProductsInDatabase(sales);
  return { status: 'CREATED', data };
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  createSales,
};