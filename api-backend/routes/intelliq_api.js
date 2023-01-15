const express = require('express');
const intelliq_apiController = require('../controllers/intelliq_api');
const router = express.Router();

router.get('/', intelliq_apiController.getHome);
router.get('/questionnaire/:questionnaireID', intelliq_apiController.getQuestionnaire);
router.get('/question/:questionnaireID/:questionID', intelliq_apiController.getQuestion);
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', intelliq_apiController.doAnswer);
router.get('/getsessionanswers/:questionnaireID/:session', intelliq_apiController.getSessionAnswers);
router.get('/getquestionanswers/:questionnaireID/:questionID', intelliq_apiController.getQuestionAnswers)

module.exports = router;