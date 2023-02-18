const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('doAnswer testing', function() {

    
    var res;
    // Check if the answer already exists into the db
    const query = "SELECT * FROM Answer WHERE QuestionnaireID = '1' AND QuestionID = '1' AND Session = 'ab15' AND OptionID = '1'";
    
    pool.getConnection((err, conn) => {
        conn.promise().query(query)
            .then(([rows, fields]) => {

                if (rows.length == 0) {
                    pool.releaseConnection(conn);
                    res = 0;
                }
                else {
                    res = 1;
                }
            })
            .catch((err) => {
                pool.releaseConnection(conn);
                return done(new Error(`Error in querying the database ${err.message}`));
            })
    });

    it('Should insert answer data and return the expected output', function(done) {

        // If answer doesn't already exist, then it should be inserted successfully
        if(res === 0) {
            request(app)
            .post('/intelliq_api/doanswer/1/1/ab15/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const response = JSON.parse(res.text);
                // check for the expected response 
                if (response.status === 'OK' && response.message === 'Answer Inserted successfully') {
                    // If the response is the expected one, then check if the data was indeed inserted into the db
                    pool.getConnection((err, conn) => {
                        conn.promise().query(query)
                            .then(([rows, fields]) => {
                                // If data was not inserted into the db, then --> fail
                                if (rows.length == 0) {
                                    pool.releaseConnection(conn);
                                    return done(new Error('Data was not inserted into the database'));
                                }
                                else {
                                    // Otherwize --> pass
                                    return done();
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
                    done(new Error('Response does not match expected result. Response should have been \'Answer Inserted successfully\''));
                }
            });
        }
        else {
            // If answer already exists, then it shouldn't be inserted
            request(app)
            .post('/intelliq_api/doanswer/1/1/ab15/1')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                const response = JSON.parse(res.text);
                // Check for the expected response 
                if (response.status !== 'failed' || response.message !== 'Duplicate entry \'ab15-1-1-1\' for key \'PRIMARY\'') {
                    return done(new Error(`Response does not match expected result. It should have been 'Duplicate entry \'ab15-1-1-1\' for key \'PRIMARY\'`));
                }
                else {
                    done();
                }
            });
        }
    });
});