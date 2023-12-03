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

module.exports = {
  getAllSales,
  getSaleById,
};
