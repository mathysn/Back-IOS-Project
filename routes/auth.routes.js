const express = require('express');
const { registerClient, loginClient } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', registerClient);
router.post('/login', loginClient);

module.exports = router;