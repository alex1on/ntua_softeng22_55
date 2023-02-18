const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logout');
const auth=require('../auth')

router.use(auth)
router.post('',logoutController.logout)
module.exports = router;