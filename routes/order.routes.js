const express = require('express');
const { createOrder, getOrdersByClientId, getOrderById, updateOrder, deleteOrder, getClientOrdersSummary } = require('../controllers/order.controller');
const router = express.Router();

router.post('/', createOrder);
router.get('/client/:clientId', getOrdersByClientId);
router.get('/:id', getOrderById);
router.put('/edit/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/summary/client/:clientId', getClientOrdersSummary);

module.exports = router;
