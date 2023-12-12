const { salesModel } = require('../models');

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity < 1) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  next();
};

const validateSale = async (req, res, next) => {
  const { saleId, productId } = req.params;
  const allSales = await salesModel.getAllSales();
  const isSaleFound = allSales.some((sale) => Number(saleId) === sale.saleId);
  const isProductInSale = allSales.some((sale) => Number(productId) === sale.productId);
  if (!isSaleFound) return res.status(404).json({ message: 'Sale not found' });
  if (!isProductInSale) return res.status(404).json({ message: 'Product not found in sale' });
  next();
};

module.exports = {
  validateQuantity,
  validateSale,
};