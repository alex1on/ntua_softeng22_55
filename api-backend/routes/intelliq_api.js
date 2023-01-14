const express = require('express');
const intelliq_apiController = require('../controllers/intelliq_api');
//const login = require('./routes/login');
//const logout = require('./routes/logout');
//const admin = require('./routes/admin');
const router = express.Router();

router.get('/', intelliq_apiController.getHome);
//router.get('/login', login);
//router.get('/logout', logout);
//router.get('/admin', admin);
router.get('/questionnaire/:questionnaireID', intelliq_apiController.getQuestionnaire);
router.get('/question/:questionnaireID/:questionID', intelliq_apiController.getQuestion);
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', intelliq_apiController.doAnswer);
router.get('/getsessionanswers/:questionnaireID/:session', intelliq_apiController.getSessionAnswers);
router.get('/getquestionanswers/:questionnaireID/:questionID', intelliq_apiController.getQuestionAnswers)

module.exports = router;