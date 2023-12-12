const { products } = require('../services');
const { updateProductService, searchProductsService } = require('../services/products.service');
const HTTPMap = require('../utils/generetaHTTPStatus');

const getAllProducts = async (req, res) => {
  const result = await products.getAllProducts();
  res.status(200).json(result);
};

const getProductsById = async (req, res) => {
  console.log('chegamos aqui');
  const { id } = req.params;
  const { status, data } = await products.getProductsById(id);
  res.status(HTTPMap(status)).json(data);
};
const create = async (req, res) => {
  const name = req.body;
  const { status, data } = await products.create(name);
  res.status(HTTPMap(status)).json(data);
};

const updateProductController = async (req, res) => {
  const update = req.body;
  const { id } = req.params;
  const { status, data } = await updateProductService(update, Number(id));
  res.status(HTTPMap(status)).json(data);
};

// const removeProduct = async (req, res) => {
//   const { id } = req.body;
//   await products.deleteProductById(Number(id));
//   res.status(204).end();
// };

const productDelete = async (req, res) => {
  const { id } = req.params;
  await products.deleteProductById(Number(id));
  res.status(204).send();
};

const searchProductsController = async (req, res) => {
  const { q } = req.query;
  const serviceResponse = await searchProductsService(q);
  res.status(200).json(serviceResponse);
};

module.exports = {
  getAllProducts,
  create,
  getProductsById,
  // removeProduct,
  updateProductController,
  productDelete,
  searchProductsController,
};
