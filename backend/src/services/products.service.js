const { products } = require('../models');

const validateUpdateProduct = async (update, id) => {
  const BAD_REQUEST_NAME_REQUIRED = {
    status: 'BAD_REQUEST',
    data: { message: '"name" is required' },
  };
  const INVALID_VALUE_NAME_LENGTH = {
    status: 'INVALID_VALUE',
    data: { message: '"name" length must be at least 5 characters long' },
  };
  const NOT_FOUND = {
    status: 'NOT_FOUND', data: { message: 'Product not found' },
  };
  const { name } = update;
  if (!name) return BAD_REQUEST_NAME_REQUIRED;
  if (name.length < 5) return INVALID_VALUE_NAME_LENGTH;
  const allProducts = await products.getAllProducts();
  const confirmationProductExists = allProducts.some((product) => Number(id) === product.id);
  if (!confirmationProductExists) return NOT_FOUND;
};

const getAllProducts = async () => products.getAllProducts();
// const getProductsById = async (productId) => products.getProductsById(productId);
const getProductsById = async (id) => {
  const product = await products.getProductsById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESS', data: product };
};
const create = async (newName) => {
  const { name } = newName;
  const BAD_REQUEST_NAME_REQUIRED = {
    status: 'BAD_REQUEST',
    data: { message: '"name" is required' },
  };
  const INVALID_VALUE_NAME_LENGTH = {
    status: 'INVALID_VALUE',
    data: { message: '"name" length must be at least 5 characters long' },
  };
  if (!name) {
    return BAD_REQUEST_NAME_REQUIRED;
  }
  if (name.length < 5) {
    return INVALID_VALUE_NAME_LENGTH;
  }
  const id = await products.create(name);
  return { status: 'CREATED', data: { id, name } };
};

const updateProductService = async (update, id) => {
  const error = await validateUpdateProduct(update, id);
  if (error) return error;
  const { name } = update;
  await products.updateProduct(update, id);
  return { status: 'SUCCESS', data: { id, name } };
};

// const deleteProductById = async (id) => {
//   await products.deleteProductById(id);
// };
const deleteProductById = async (id) => {
  await products.deleteProductById(id);
};

const searchProductsService = async (q) => {
  const filteredProducts = await products.searchProducts(q);
  return filteredProducts;
};

module.exports = {
  getAllProducts,
  create,
  // createNewProduct,
  getProductsById,
  deleteProductById,
  updateProductService,
  searchProductsService,
};
