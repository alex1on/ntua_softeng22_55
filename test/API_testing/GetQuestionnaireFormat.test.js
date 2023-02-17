const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetQuestionnaire Format', function() {
    
    /*
    Questionnaire JSON Object Format
    {
        "questionnaire": {
            "questionnaireID": Questionnaire ID (string),
            "questionnaireTitle": Questionnaire Title (string),
            "keywords": []  list/array of keywords (each keyword (i.e element) is a string) 
            "questions": [] list/array of question json objects each of which have they following format
                {
                    "QuestionID": Question ID (string),
                    "QText": Question Text (string),
                    "Q_Required": Required or not question (values 'true' or 'false' as a string),
                    "Q_Type": Question's type (values 'Personal' or 'Reasearch' as a string)
                }
        }
    }
    */

    it('It should return a JSON object with questionnaire data formatted as above:', function(done) {
        request(app)
        .get('/intelliq_api/questionnaire/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const data = JSON.parse(res.text);
            // No data? Status code 204 should have been returned
            if (!data.questionnaire) {
                return done(new Error('Response does not contain questionnaire data. Status code 204 should have been returned.'));
            }
            // QuestionnaireID must be a string
            if (typeof data.questionnaire.questionnaireID !== 'string') {
                return done(new Error('questionnaireID should be a string'));
            }
            // QuestionnaireTitle must be a string
            if (typeof data.questionnaire.questionnaireTitle !== 'string') {
                return done(new Error('questionnaireTitle should be a string'));
            }
            // keywords field must be an array/list of string
            if (!Array.isArray(data.questionnaire.keywords)) {
                return done(new Error('keywords should be an array/list'));
            }
            data.questionnaire.keywords.forEach( keyword => {
                if(typeof keyword !== 'string') {
                    return done(new Error('keywords\'s elements must be strings'));
                }
            });
            // questions field must be an array/list of json objects formatted as mentioned before 
            if (!Array.isArray(data.questionnaire.questions)) {
                return done(new Error('questions should be an array/list'));
            }
            data.questionnaire.questions.forEach(question => {
                // QuestionID must be a string
                if (typeof question.QuestionID !== 'string') {
                    return done(new Error('QuestionID should be a string'));
                }
                // QText must be a string
                if (typeof question.QText !== 'string') {
                    return done(new Error('QText should be a string'));
                }
                // Q_Required must be 'true' or 'false'
                if (question.Q_Required !== 'true' && question.Q_Required !== 'false') {
                    return done(new Error('Q_Required should be "true" or "false"'));
                }
                // Q_Type must be 'Personal' or 'Research'
                if (question.Q_Type !== 'Personal' && question.Q_Type !== 'Research') {
                    return done(new Error('Q_Type should be "Personal" or "Research"'));
                }
            });
            done();
        });
    });
});
  