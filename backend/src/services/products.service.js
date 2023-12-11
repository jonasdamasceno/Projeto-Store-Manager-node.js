const { products } = require('../models');

const getAllProducts = async () => products.getAllProducts();
// const getProductsById = async (productId) => products.getProductsById(productId);
const getProductsById = async (id) => {
  const product = await products.getProductsById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCES', data: product };
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

// const createNewProduct = async (newProduct) => {
//   const { name } = newProduct;
//   if (!name) return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
//   if (name.length < 5) { 
//     return { status: 'INVALID_VALUE', 
//       data: { message: '"name" length must be at least 5 characters long' },
//     }; 
//   }
//   const id = await products.insertNewProduct(newProduct);
//   return { status: 'CREATED', data: { id, name } };
// };

const deleteProductById = async (id) => {
  await products.deleteProductById(id);
};

module.exports = {
  getAllProducts,
  create,
  // createNewProduct,
  getProductsById,
  deleteProductById,
};
