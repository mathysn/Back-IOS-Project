const { addClient, findClientByEmail } = require('../services/auth.service');

exports.registerClient = async (req, res) => {
    try {
        const { firstName, lastName, email, address } = req.body;

        // Vérifier si l'email existe déjà
        const existingClient = await findClientByEmail(email);
        if (existingClient) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Ajouter le client
        const newClient = await addClient({ firstName, lastName, email, address });
        res.status(201).json({ message: 'Client registered successfully', client: newClient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginClient = async (req, res) => {
    try {
        const { email } = req.body;

        // Vérifier si le client existe
        const client = await findClientByEmail(email);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ message: 'Login successful', client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};