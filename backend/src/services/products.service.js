const { products } = require('../models');

const getAllProducts = async () => products.getAllProducts();
// const getProductsById = async (productId) => products.getProductsById(productId);
const getProductsById = async (id) => {
  const product = await products.getProductsById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCES', data: product };
};
const create = async (name) => {
  const id = await products.create(name);
  return { id, name };
};

module.exports = {
  getAllProducts,
  create,
  getProductsById,
};
