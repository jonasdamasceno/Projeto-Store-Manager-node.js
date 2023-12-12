const HTTPMap = require('../utils/generetaHTTPStatus');
const { productService } = require('../services');

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  res.status(HTTPMap(status)).json(data);
};

const insertNewProduct = async (req, res) => {
  const newProduct = req.body;
  const { status, data } = await productService.createNewProduct(newProduct);
  res.status(HTTPMap(status)).json(data);
};

const updateProductName = async (req, res) => {
  const update = req.body;
  const { id } = req.params;
  const { status, data } = await productService.updateProduct(update, Number(id));
  res.status(HTTPMap(status)).json(data);
};

const productDelete = async (req, res) => {
  const { id } = req.params;
  await productService.deleteProductById(Number(id));
  res.status(204).end();
};

const filterProducts = async (req, res) => {
  const { q } = req.query;
  const serviceResponse = await productService.filterProducts(q);
  res.status(200).json(serviceResponse);
};

module.exports = {
  findById,
  insertNewProduct,
  updateProductName,
  productDelete,
  filterProducts,
};