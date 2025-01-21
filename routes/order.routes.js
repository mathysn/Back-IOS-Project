const express = require('express');
const { createOrder, getOrdersByClientId, updateOrder, deleteOrder } = require('../controllers/order.controller');
const router = express.Router();

router.post('/', createOrder);
router.get('/client/:clientId', getOrdersByClientId);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
