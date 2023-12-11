const { salesModel } = require('../models');

const verifySaleExists = async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await salesModel.getAllSales();
  const productExists = allProducts.some((sale) => Number(id) === sale.saleId);
  if (!productExists) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = { verifySaleExists };