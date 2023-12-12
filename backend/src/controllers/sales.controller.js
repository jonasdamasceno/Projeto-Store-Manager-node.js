const { salesService } = require('../services');
const HTTPMap = require('../utils/generetaHTTPStatus');

const getAllSales = async (req, res) => {
  const { status, data } = await salesService.findAllSales();
  return res.status(HTTPMap(status)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findSalesById(id);
  return res.status(HTTPMap(status)).json(data);
};

const insertNewSales = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesService.insertSales(sales);
  res.status(HTTPMap(status)).json(data);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  await salesService.deleteSalesId(id);
  res.status(204).end();
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await salesService.updateProductSales({ saleId, productId, quantity });
  res.status(HTTPMap(status)).json(data);
};
module.exports = {
  getAllSales,
  getSaleById,
  insertNewSales,
  deleteSales,
  updateQuantity,
};