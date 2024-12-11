const { fetchComponents, fetchComponentById } = require('../services/component.service');

exports.getComponents = async (req, res) => {
    try {
        const components = await fetchComponents();
        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getComponentById = async (req, res) => {
    try {
        const component = await fetchComponentById(req.params.id);
        if (!component) {
            res.status(404).json({ error: 'Component not found' });
        } else {
            res.status(200).json(component);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
