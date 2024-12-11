const { addOrder, fetchOrdersByClientId } = require('../services/order.service');

exports.createOrder = async (req, res) => {
    try {
        const orderId = await addOrder(req.body);
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrdersByClientId = async (req, res) => {
    try {
        const orders = await fetchOrdersByClientId(req.params.clientId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
