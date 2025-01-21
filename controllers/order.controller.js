const { addOrder, fetchOrdersByClientId, modifyOrder, removeOrder } = require('../services/order.service');

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

exports.updateOrder = async (req, res) => {
    try {
        await modifyOrder(req.params.id, req.body);
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await removeOrder(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
