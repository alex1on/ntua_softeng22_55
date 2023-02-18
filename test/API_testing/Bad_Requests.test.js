const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetQuestionnaire with invalid QuestionnaireID', function() {
    it('When QuestionnaireID is invalid it should respond with status 400 (Bad request) and error message.', function(done) {
        request(app)
        .get('/intelliq_api/questionnaire/ab3')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Bad Request: Invalid questionnaireID') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});

describe('GetSessionAnswers with invalid session parameter', function() {
    it('When session is invalid (i.e its length is not 4 characters) it should respond with status 400 (Bad request) and error message.', function(done) {
        request(app)
        .get('/intelliq_api/getsessionanswers/1/ab1143')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Bad Request: Invalid parameters') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});