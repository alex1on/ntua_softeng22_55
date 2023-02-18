const express = require('express');
const adminController = require('../controllers/admin');
//const { route } = require('./intelliq_api');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.get('/', adminController.getAdminHome);
router.get('/healthcheck', adminController.getHealthCheck);
router.post('/questionnaire_upd', upload.single('file'), adminController.postQuestionnaire_upd); 
// Multer middleware and precicely the .single function parses the 
// multipart/form-data information of the http POST request and adds 
// them to the req body so that the controller can access the .json data.

router.post('/resetall', adminController.postResetall);
router.post('/resetq/:questionnaireID', adminController.postResetq);
router.post('/usermod/:username/:password', adminController.postUsermod);
router.get('/users/:username', adminController.getUser);


module.exports = router;