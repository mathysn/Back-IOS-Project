const { fetchClientById, modifyClient } = require('../services/client.service');

exports.getClientById = async (req, res) => {
    try {
        const client = await fetchClientById(req.params.id);
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
        } else {
            res.status(200).json(client);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        await modifyClient(req.params.id, req.body);
        res.status(200).json({ message: 'Client updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};