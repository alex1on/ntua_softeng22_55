const express = require('express');
const statisticsController = require('../controllers/statistics');
const router = express.Router();

router.get('/', statisticsController.getStatisticsHome);

module.exports = router;