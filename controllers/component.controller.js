const { fetchComponents, fetchComponentById, createComponent, updateComponent, removeComponent } = require('../services/component.service');

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

exports.addComponent = async (req, res) => {
    try {
        const newComponent = await createComponent(req.body);
        res.status(201).json({ message: 'Component added successfully', component: newComponent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editComponent = async (req, res) => {
    try {
        await updateComponent(req.params.id, req.body);
        res.status(200).json({ message: 'Component updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComponent = async (req, res) => {
    try {
        await removeComponent(req.params.id);
        res.status(200).json({ message: 'Component deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};