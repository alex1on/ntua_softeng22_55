const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetQuestionAnswers Format', function() {
    
    /*
    Question Answers JSON Object Format
    {
        "Question Answers": {
            "questionnaireID": Questionnaire ID (string),
            "questionID": Question ID (string),
            "answers": [] list/array of answer json objects each of which has the following format
                {
                    "session": (string of length four),
                    "ans": (string),
                }
        }
}
    */

    it('It should return a JSON object with Question\'s asnwers data formatted as above!', function(done) {
        request(app)
        .get('/intelliq_api/getquestionanswers/1/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const data = JSON.parse(res.text);
            // No data? Status code 204 should have been returned
            if (!data['Question Answers']) {
                return done(new Error('Response does not contain data. Status code 204 should have been returned.'));
            }

            // Check for unexpected fields in the Question Answers json object
            const extraFields = Object.keys(data['Question Answers']).filter(key => key !== 'questionnaireID' && key !== 'questionID' && key !== 'answers');
            if (extraFields.length > 0) {
                return done(new Error(`Unexpected fields in Question Answer with QuestionID = ${data['Question Answers']['questionID']} and QuestionnaireID = ${data['Question Answers']['questionnaireID']}. Extra fields: ${extraFields.join(', ')}`));
            }  

            const Question_Answers = data['Question Answers'];
            // QuestionnaireID must be a string
            if (typeof Question_Answers.questionnaireID !== 'string') {
                return done(new Error('questionnaireID should be a string'));
            }
            
            // QuestionID must be a string
            if (typeof Question_Answers.questionID !== 'string') {
                return done(new Error('questionID should be a string'));
            }
            
            // answers field must be an array/list of answer json objects formatted as mentioned before 
            if (!Array.isArray(Question_Answers.answers)) {
                return done(new Error('answers should be an array/list'));
            }

            Question_Answers.answers.forEach(answer => {

                // session must be a string of length four
                if (typeof answer.session !== 'string' || answer.session.length != 4) {
                    return done(new Error('session should be a string of length four'));
                }
                // ans must be a string
                if (typeof answer.ans !== 'string') {
                    return done(new Error('ans should be a string'));
                }

                // Check for unexpected fields in the answer json object
                const extraFields = Object.keys(answer).filter(key => key !== 'session' && key !== 'ans');
                if (extraFields.length > 0) {
                    return done(new Error(`Unexpected fields in answer session = ${answer.session}, ans = ${answer.ans}: Extra fields: ${extraFields.join(', ')}`));
                }
            });
            done();
        });
    });
});
  