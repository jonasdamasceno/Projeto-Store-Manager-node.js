const { products } = require('../models');

const getAllProducts = async () => products.getAllProducts();
const getProductsById = async (productId) => products.getProductsById(productId);
const create = async (name) => {
  const id = await products.create(name);
  return { id, name };
};

module.exports = {
  getAllProducts,
  getProductsById,
  create,
};
