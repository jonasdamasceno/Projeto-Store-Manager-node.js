const salesService = require('../services');
const HTTPMap = require('../utils/generetaHTTPStatus');

const getAllSales = async (req, res) => {
  const result = await salesService.getAllSales();
  res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSaleById(id);
  return res.status(HTTPMap(status)).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
};