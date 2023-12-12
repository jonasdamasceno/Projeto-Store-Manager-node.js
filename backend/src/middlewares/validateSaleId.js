const { salesModel } = require('../models');

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  const allSales = await salesModel.findAllSales();
  const exist = allSales.some((sale) => Number(id) === sale.saleId);
  if (!exist) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = {
  validateSaleId,
};