const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetQuestionnaire with undefined QuestionnaireID', function() {
    it('When QuestionnaireID is undefined it should respond with status 400 (Bad request) and error message.', function(done) {
        request(app)
        .get('/intelliq_api/questionnaire/')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Bad request: questionnaireID undefined') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});

describe('GetQuestion with undefined QuestionID', function() {
    it('When QuestionID is undefined it should respond with status 400 (Bad request) and error message.', function(done) {
        request(app)
        .get('/intelliq_api/question/1/')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Bad request: questionID undefined') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});

describe('GetQuestion with undefined QuestionnaireID', function() {
    it('When QuestionnaireID is undefined it should respond with status 400 (Bad request) and error message.', function(done) {
        request(app)
        .get('/intelliq_api/question//1')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Bad request: questionaireID undefined') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});

describe('GetQuestion with undefined QuestionnaireID & QuestionID', function() {
    it('When both, QuestionnaireID and QuestionID, are undefined it should respond with status 400 (Bad request) and error message.', function(done) {
        request(app)
        .get('/intelliq_api/question//')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            if (response.status === 'failed' && response.message === 'Bad request: questionaireID and questionID undefined') {
                done();
            } else {
                done(new Error('Response does not match expected result.'));
            }
        });
    });
});