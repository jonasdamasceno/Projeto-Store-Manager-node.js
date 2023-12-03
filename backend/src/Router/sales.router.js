const { Router } = require('express');
const { getAllSales, getSaleById } = require('../controllers/sales.controller');

const router = Router();

router.get('/', getAllSales);
router.get('/:id', getSaleById);

module.exports = router;