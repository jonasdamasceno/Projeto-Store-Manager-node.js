const { products } = require('../models');

const verifyProductExists = async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await products.getAllProducts();
  
  const productExists = allProducts.some((product) => product.id === Number(id));
  
  if (!productExists) return res.status(404).json({ message: 'Product not found' });
  
  next();
};

module.exports = {
  verifyProductExists,
};
