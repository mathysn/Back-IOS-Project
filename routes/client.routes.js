const express = require('express');
const { getClientById, updateClient } = require('../controllers/client.controller');
const router = express.Router();

router.get('/:id', getClientById);
router.put('/:id', updateClient);

module.exports = router;
