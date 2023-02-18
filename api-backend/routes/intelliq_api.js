const express = require('express');
const intelliq_apiController = require('../controllers/intelliq_api');
const router = express.Router();

router.get('/', intelliq_apiController.getHome);
router.get('/questionnaire/:questionnaireID', intelliq_apiController.getQuestionnaire);
router.get('/question/:questionnaireID/:questionID', intelliq_apiController.getQuestion);
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', intelliq_apiController.doAnswer);
router.get('/getsessionanswers/:questionnaireID/:session', intelliq_apiController.getSessionAnswers);
router.get('/getquestionanswers/:questionnaireID/:questionID', intelliq_apiController.getQuestionAnswers)

// Special Cases for undefined parameters ---> bad implementation

// getQuestionnaire

// https://localhost:9103/intelliq_api/questionnaire/  (missing questionnaireID)
router.get('/questionnaire/', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionnaireID undefined'
    });
});

// getQuestion

//https://localhost:9103/intelliq_api/question/1/ (missing questionID)
router.get('/question/:questionnaireID/', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionID undefined'
    });
});

//https://localhost:9103/intelliq_api/question//1 (missing questionnaireID)
router.get('/question//:questionID', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionaireID undefined'
    });
});


//https://localhost:9103/intelliq_api/question// (missing questionnaireID and questionID)
router.get('/question//', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionaireID and questionID undefined'
    });
});

// getSessionAnswers

//https://localhost:9103/intelliq_api/getsessionanswers/1/  (missing session)
router.get('/getsessionanswers/:questionnaireID/', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: session undefined'
    });
});


//https://localhost:9103/intelliq_api/getsessionanswers//ab11  (missing session)
router.get('/getsessionanswers//:session', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionnaireID undefined'
    });
});

//https://localhost:9103/intelliq_api/getsessionanswers//  (missing questionnaireID and session)
router.get('/getsessionanswers//', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionnaireID and session undefined'
    });
});

// getQuestionAnswers

//https://localhost:9103/intelliq_api/getquestionanswers/1/ (missing questionID)
router.get('/getquestionanswers/:questionnaireID/', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionID undefined'
    });
});


//https://localhost:9103/intelliq_api/getquestionanswers//1 (missing questionnaireID)
router.get('/getquestionanswers//:questionID', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionnaireID undefined'
    });
});

//https://localhost:9103/intelliq_api/getquestionanswers// (missing questionnaireID and questionID)
router.get('/getquestionanswers//', (req, res) => {
    res.status(400).json({
        status: 'failed',
        message: 'Bad request: questionnaireID and questionID undefined'
    });
});

// doAnswer

module.exports = router;