const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetSessionAnswers Format', function() {
    
    /*
    Session Answers JSON Object Format
    {
        "Session Answers": {
            "questionnaireID": Questionnaire ID (string),
            "session": string of length 4,
            "answer": [] list/array of answer json objects each of which has the following format
                {
                    "qID": (string),
                    "ans": (string),
                }
        }
}
    */

    it('It should return a JSON object with Session\'s asnwers data formatted as above!', function(done) {
        request(app)
        .get('/intelliq_api/getsessionanswers/1/ab11')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const data = JSON.parse(res.text);
            // No data? Status code 204 should have been returned
            if (!data['Session Answers']) {
                return done(new Error('Response does not contain data. Status code 204 should have been returned.'));
            }

            // Check for unexpected fields in the Session Answers json object
            const extraFields = Object.keys(data['Session Answers']).filter(key => key !== 'questionnaireID' && key !== 'session' && key !== 'qtext' && key !== 'answers');
            if (extraFields.length > 0) {
                return done(new Error(`Unexpected fields in Session Answer with session = ${data['Session Answers']['session']} and QuestionnaireID = ${data['Session Answers']['questionnaireID']}. Extra fields: ${extraFields.join(', ')}`));
            }  

            const Session_Answers = data['Session Answers'];
            // QuestionnaireID must be a string
            if (typeof Session_Answers.questionnaireID !== 'string') {
                return done(new Error('questionnaireID should be a string'));
            }

            // Session must be a string of lenght four
            if (typeof Session_Answers.session !== 'string' || Session_Answers.session.length != 4) {
                return done(new Error(`questionID should be a string of four characters!`));
            }
            
            // answers field must be an array/list of answer json objects formatted as mentioned before 
            if (!Array.isArray(Session_Answers.answers)) {
                return done(new Error('answers should be an array/list'));
            }

            Session_Answers.answers.forEach(answer => {

                // qID must be a string
                if (typeof answer.qID !== 'string') {
                    return done(new Error('qID should be a string'));
                }
                // ans must be a string
                if (typeof answer.ans !== 'string') {
                    return done(new Error('ans should be a string'));
                }
                // Check for unexpected fields in the answer json object
                const extraFields = Object.keys(answer).filter(key => key !== 'qID' && key !== 'ans');
                if (extraFields.length > 0) {
                    return done(new Error(`Unexpected fields in answer qID = ${answer.qID}, ans = ${answer.ans}: Extra fields: ${extraFields.join(', ')}`));
                }
            });
            done();
        });
    });
});
  