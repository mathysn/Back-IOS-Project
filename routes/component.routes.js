const express = require('express');
const { getComponents, getComponentById, addComponent, editComponent, deleteComponent } = require('../controllers/component.controller');
const router = express.Router();

router.get('/', getComponents);
router.get('/:id', getComponentById);
router.post('/', addComponent);
router.put('/:id', editComponent);
router.delete('/:id', deleteComponent);

module.exports = router;
