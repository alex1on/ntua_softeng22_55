const express = require('express');
const intelliq_apiController = require('../controllers/intelliq_api');
const login = require('./routes/login');
const logout = require('./routes/logout');
const admin = require('./routes/admin');
const router = express.Router();

router.get('/', intelliq_apiController.getHome);
router.get('/login', login);
router.get('/logout', logout);
router.get('/admin', admin);

module.exports = router;