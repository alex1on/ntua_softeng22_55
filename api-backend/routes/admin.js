const express = require('express');
const adminController = require('../controllers/admin');
//const { route } = require('./intelliq_api');
const router = express.Router();

router.get('/', adminController.getAdminHome);
router.get('/healthcheck', adminController.getHealthCheck);
router.post('/questionnaire_upd', adminController.postQuestionnaire_upd);
router.post('/resetall', adminController.postResetall);
router.post('/resetq/:questionnaireID', adminController.postResetq);
router.post('/usermod/:username/:password', adminController.postUsermod);
router.get('/users/:username', adminController.getUser);


module.exports = router;