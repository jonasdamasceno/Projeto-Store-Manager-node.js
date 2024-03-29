const { salesService } = require('../services');
const HTTPMap = require('../utils/generetaHTTPStatus');

const getAllSales = async (req, res) => {
  const { status, data } = await salesService.getAllSalesService();
  return res.status(HTTPMap(status)).json(data);
};

// const getSaleById = async (req, res) => {
//   const { id } = req.params;
//   const result = await salesService.getSaleById(id);
//   if (!result.length) return res.status(404).json({ message: 'Sale not found' });
//   res.status(200).json(result);
// };

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSaleByIdService(id);
  return res.status(HTTPMap(status)).json(data);
};

const handleSalesInsertion = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesService.createAndInsertSales(sales);
  res.status(HTTPMap(status)).json(data);
};

const removesale = async (req, res) => {
  const { id } = req.params;
  await salesService.deleteSaleById(id);
  return res.status(204).end();
};

const updateSalesProductQuantityHandler = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await salesService.updateProductSales({ saleId, productId, quantity });
  res.status(HTTPMap(status)).json(data);
};
module.exports = {
  getAllSales,
  getSaleById,
  handleSalesInsertion,
  removesale,
  updateSalesProductQuantityHandler,
};
