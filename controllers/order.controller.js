const { addOrder, fetchOrdersByClientId, fetchOrderById, modifyOrder, removeOrder, fetchOrderSummaryByClientId } = require('../services/order.service');

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

exports.getOrderById = async (req, res) => {
    try {
        const order = await fetchOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
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

exports.getClientOrdersSummary = async (req, res) => {
    try {
        const orders = await fetchOrderSummaryByClientId(req.params.clientId);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this client' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};