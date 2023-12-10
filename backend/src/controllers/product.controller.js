const { products } = require('../services');
const HTTPMap = require('../utils/generetaHTTPStatus');

const getAllProducts = async (req, res) => {
  const result = await products.getAllProducts();
  res.status(200).json(result);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await products.getProductsById(id);
  res.status(HTTPMap(status)).json(data);
};
const create = async (req, res) => {
  const name = req.body;
  const { status, data } = await products.create(name);
  res.status(HTTPMap(status)).json(data);
};

module.exports = {
  getAllProducts,
  create,
  getProductsById,
};
