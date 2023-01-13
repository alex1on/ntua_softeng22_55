const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();

router.get('/intelliq_api', homeController.getHome);

module.exports = router;