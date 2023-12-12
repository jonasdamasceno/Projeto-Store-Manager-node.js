const { productsModel } = require('../models');

const verifyNameAndIdProduct = async (update, id) => {
  const { name } = update;
  if (!name) return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  if (name.length < 5) {
    return { status: 'INVALID_VALUE',
      data:
   { message: '"name" length must be at least 5 characters long' } }; 
  }
  const allProducts = await productsModel.findAll();
  const exist = allProducts.some((product) => Number(id) === product.id);
  if (!exist) {
    return { status: 'NOT_FOUND',
      data: { message: 'Product not found' } }; 
  }
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCES', data: product };
};

const createNewProduct = async (newProduct) => {
  const { name } = newProduct;
  if (!name) return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  if (name.length < 5) { 
    return { status: 'INVALID_VALUE', 
      data: { message: '"name" length must be at least 5 characters long' },
    }; 
  }
  const id = await productsModel.insertNewProduct(newProduct);
  return { status: 'CREATED', data: { id, name } };
};

const updateProduct = async (update, id) => {
  const error = await verifyNameAndIdProduct(update, id);
  if (error) return error;
  const { name } = update;
  await productsModel.updateNewProduct(update, id);
  return { status: 'SUCCES', data: { id, name } };
};

const deleteProductById = async (id) => {
  await productsModel.deleteProduct(id);
};

const filterProducts = async (q) => {
  const product = await productsModel.filterProduct(q);
  return product;
};

module.exports = {
  findById,
  createNewProduct,
  updateProduct,
  deleteProductById,
  filterProducts,
};