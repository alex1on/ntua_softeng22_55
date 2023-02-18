const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetQuestionnaire with non existing QuestionnaireID', function() {
    it('When there are no data it should respond with status 204 (No data).', function(done) {
        request(app)
        .get('/intelliq_api/questionnaire/3446')
        .expect(204)
        .end(function(err, res) {
            if(err) {
                return done(err);
            }
            else {
                if (res.status != 204) {
                    done(new Error('Expected status 204 (No data) but got ' + res.status));
                }
                else {
                    done();
                }
            }
        });
    });
});


describe('GetQuestion with non existing QuestionID', function() {
    it('When there are no data it should respond with status 204 (No data).', function(done) {
        request(app)
        .get('/intelliq_api/question/1/12334')
        .expect(204)
        .end(function(err, res) {
            if(err) {
                return done(err);
            }
            else {
                if (res.status != 204) {
                    done(new Error('Expected status 204 (No data) but got ' + res.status));
                }
                else {
                    done();
                }
            }
        });
    });
});
