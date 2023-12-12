const { salesModel, productsModel } = require('../models');

const verifyProductId = async (sales) => {
  const allProducts = await productsModel.findAll();
  
  const findProductId = sales.some((sale) => (!sale.productId));
  if (findProductId) return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };
  const exists = sales.filter((element) => {
    const find = allProducts.some((item) => item.id === element.productId);
    return find;
  });
  if (exists.length !== sales.length) { 
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
  }
};
const verifyQuantity = async (sales) => {
  const findQuantity = sales.some((sale) => (sale.quantity === undefined));
  const quantityValue = sales.some((sale) => (sale.quantity <= 0));
  if (findQuantity) return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
  if (quantityValue) {
    return { status: 'INVALID_VALUE', 
      data: { message: '"quantity" must be greater than or equal to 1' } }; 
  }
};

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCES', data: sales };
};

const findSalesById = async (id) => {
  const sale = await salesModel.findSalesById(id);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCES', data: sale };
};

const insertSales = async (sales) => {
  const quantity = await verifyQuantity(sales);
  const productId = await verifyProductId(sales);
  if (productId) return productId;
  if (quantity) return quantity;
  const insertId = await salesModel.insertNewSales(sales);
  return { status: 'CREATED', data: { id: insertId, itemsSold: sales } };
};

const deleteSalesId = async (id) => {
  await salesModel.deleteSale(id);
};

const updateProductSales = async (updateInfos) => {
  const { saleId, productId, quantity } = updateInfos;
  const findBySaleId = await salesModel.findSalesById(saleId);
  const filtredByProductId = (findBySaleId
    .filter((sale) => sale.productId === Number(productId)))[0];
  await salesModel.updateQuantitySalesProduct(saleId, productId, quantity);
  const data = { saleId: Number(saleId),
    productId: Number(productId),
    quantity,
    date: filtredByProductId.date };
  return { status: 'SUCCES', data };
}; 
module.exports = {
  findSalesById,
  findAllSales,
  insertSales,
  deleteSalesId,
  updateProductSales,
};