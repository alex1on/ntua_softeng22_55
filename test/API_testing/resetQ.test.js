const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('POST /intelliq_api/admin/resetq/:questionnaireID', function() {

    /*
    Case --> success 
            {
                "status": "OK"
            }   
    Case --> 0 rows affected
           {
                "status": "failed",
                "reason": "0 rows affected"
           } 
    Case --> invalid parameter
            {
                "status": "failed",
                "reason": "Bad Request: Invalid questionnaireID format"
            }    
    */

    it('Should delete all answers data and return the expected output', function(done) {

        const questionnaireID = 'QQ001';
        const questionnaireIDFormat = /^QQ\d{3}$/;
        
        // Case --> Invalid parameter
        // Check for desired format
        if(!questionnaireIDFormat.test(questionnaireID)) {
            // Wrong QuestionnaireID format
            request(app)
                .post(`/intelliq_api/admin/resetq/${questionnaireID}`)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    const response = JSON.parse(res.text);
                    if (response.status === 'failed' && response.reason === 'Bad Request: Invalid questionnaireID format') {
                        return done();
                    } else {
                        return done(new Error(`Expected status: \'failed\' and reason: \'Bad Request: Invalid questionnaireID format\', but got status: ${response.status} and reason: ${response.reason}`));
                    }
                });
        }
        else {
            // Execute SQL query to figure out if data already exist or not
            const query = `SELECT * FROM Answer WHERE QuestionnaireID = '${questionnaireID}'`;
            pool.getConnection((err, conn) => {
                conn.promise().query(query)
                .then(([rows, fields]) => {
                    // if there are no data already --> 0 rows affected
                    if (rows.length == 0) {
                        pool.releaseConnection(conn);
                        request(app)
                            .post(`/intelliq_api/admin/resetq/${questionnaireID}`)
                            .expect('Content-Type', /json/)
                            .expect(400)
                            .end(function(err, res) {
                                if (err) return done(err);
                                const response = JSON.parse(res.text);
                                // Check for the expected response
                                if (response.status !== 'failed' || response.reason !== '0 rows affected') {
                                    return done(new Error('Response does not match expected result. It should have been: status: \'failed\' and reason: \' 0 rows affected\''))
                                }
                                else {
                                    return done();
                                }
                            })
                    }
                    else {
                        // if data already exist, then they must be deleted
                        pool.releaseConnection(conn);
                        request(app)
                            .post(`/intelliq_api/admin/resetq/${questionnaireID}`)
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .end(function(err, res) {
                                const response = JSON.parse(res.text);
                                // Check for the expected response
                                if (response.status === 'OK') {
                                    // If the response is the expected one, then check if the desired data were indeed deleted from the db
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
                                                    pool.releaseConnection(conn);
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
                            })
                    }
                })
            })
        }
    });
});