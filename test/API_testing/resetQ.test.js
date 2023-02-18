const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('resetq (reset questionnaire\'s answers) testing', function() {

    it('Should delete all answers data and return the expected output', function(done) {
        request(app)
        .post('/intelliq_api/admin/resetq/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const response = JSON.parse(res.text);
            // check for the expected response 
            if (response.status === 'OK') {
                // If the response is the expected one, then check if the desired data were indeed deleted from the db
                const query = `SELECT * FROM Answer WHERE QuestionnaireID = 1`
                pool.getConnection((err, conn) => {
                    conn.promise().query(query)
                        .then(([rows, fields]) => {
                            // If data were deleted from the db, then --> pass
                            if (rows.length == 0) {
                                pool.releaseConnection(conn);
                                return done();
                            }
                            // Otherwise --> fail
                            else {
                                return done(new Error(`Desired data were not deleted from database`));
                            }
                        })
                        .catch((err) => {
                            pool.releaseConnection(conn);
                            return done(new Error(`Error in querying the database ${err.message}`));
                        })
                });
            } 
            else {
                // If the response is not the expected ---> FAIL
                done(new Error('Response does not match expected result. Status message should have been \'failed\''));
            }
        });
    });
});