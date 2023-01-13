const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/intelliq_api/login', loginController.checkCredentials);

module.exports = router;