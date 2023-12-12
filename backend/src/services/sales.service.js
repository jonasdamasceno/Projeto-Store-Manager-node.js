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

const deleteSaleById = async (id) => {
  await salesModel.deleteSaleById(id);
};

const updateProductSales = async (updateInfos) => {
  const { saleId, productId, quantity } = updateInfos;
  const findBySaleId = await salesModel.getSalesById(saleId);
  const filtredByProductId = (findBySaleId
    .filter((sale) => sale.productId === Number(productId)))[0];
  await salesModel.updateSalesProductQuantity(saleId, productId, quantity);
  const data = { saleId: Number(saleId),
    productId: Number(productId),
    quantity,
    date: filtredByProductId.date };
  return { status: 'SUCCESS', data };
}; 
module.exports = {
  getAllSalesService,
  getSaleByIdService,
  createAndInsertSales,
  deleteSaleById,
  updateProductSales,
};