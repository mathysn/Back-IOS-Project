const express = require('express');
const { createOrder, getOrdersByClientId } = require('../controllers/order.controller');
const router = express.Router();

router.post('/', createOrder);
router.get('/client/:clientId', getOrdersByClientId);

module.exports = router;
