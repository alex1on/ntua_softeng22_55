const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/:Username/:Password', loginController.checkCredentials);
//checkCredentials
module.exports = router;

//test