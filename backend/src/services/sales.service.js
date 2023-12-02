const { salesModel } = require('../models/sales.model');

// const getAllSales = async () => {
//   const sales = await getAllSales();
//   if
// }

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  if (!sales.length) {
    return Promise.resolve({ status: 'NOT_FOUND', data: { message: 'No sales found' } });
  }

  return Promise.resolve({ status: 'SUCCESS', data: sales });
};

const getSalesById = async () => {
  const sales = await salesModel.getSalesById();
  if (sales.length === 0) { 
    return Promise.resolve({ status: 'NOT_FOUND', data: { message: 'sale not found' } }); 
  }
  return Promise.resolve({ status: 'SUCCES', data: sales });
};

module.exports = {
  getAllSales,
  getSalesById,
};
