const { productsModel } = require('../models');

const verifyIdExist = async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await productsModel.findAll();
  const exist = allProducts.some((product) => Number(id) === product.id);
  if (!exist) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  verifyIdExist,
};