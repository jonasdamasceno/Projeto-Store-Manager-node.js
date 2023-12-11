const { salesModel, products } = require('../models');
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

const validateSalesProductIds = async (sales) => {
  const allProducts = await products.getAllProducts();
  const BAD_REQUEST_NAME_PRODUCTID_IS_REQUIRED = { status: 'BAD_REQUEST', 
    data: { message: '"productId" is required' }, 
  };
  const NOT_FOUND_PRODUCT_IS_NOT_FOUND = { status: 'NOT_FOUND', 
    data: { message: 'Product not found' }, 
  };
  const missingProductId = sales.some((sale) => (!sale.productId));
  if (missingProductId) {
    return BAD_REQUEST_NAME_PRODUCTID_IS_REQUIRED;
  } 
  
  const productIdExists = sales.every((element) => {
    const productExists = allProducts.some((item) => item.id === element.productId);
    return productExists;
  });
  if (!productIdExists) {
    return NOT_FOUND_PRODUCT_IS_NOT_FOUND;
  }
};

const validateSalesQuantities = (sales) => {
  const missingQuantity = sales.some((sale) => (sale.quantity === undefined));
  const invalidQuantityValue = sales.some((sale) => (sale.quantity <= 0));
  const BAD_REQUEST_QUANTITY_IS_REQUIRE = { 
    status: 'BAD_REQUEST', 
    data: { message: '"quantity" is required' },
  }; 
  const INVALID_VALUE_QUANTITY_MUST = {
    status: 'INVALID_VALUE',
    data: { message: '"quantity" must be greater than or equal to 1' },
  };
  if (missingQuantity) return BAD_REQUEST_QUANTITY_IS_REQUIRE;
  if (invalidQuantityValue) return INVALID_VALUE_QUANTITY_MUST;
};

const createAndInsertSales = async (sales) => {
  const productId = await validateSalesProductIds(sales);
  const quantity = validateSalesQuantities(sales);
  const insertId = await salesModel.createAndSaveNewSale(sales);
  if (productId) return productId;
  if (quantity) return quantity;
  return {
    status: 'CREATED',
    data: { id: insertId, itemsSold: sales } }; 
};

const deletesaleById = async (id) => {
  await salesModel.deleteSaleById(id);
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  createAndInsertSales,
  deletesaleById,
};