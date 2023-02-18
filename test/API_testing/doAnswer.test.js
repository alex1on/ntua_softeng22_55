const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('POST /intelliq_api/doanswer/:questionnaireID/:questionID/:session/:optionID', function() {

    /*
    Case --> success 
            {
                "status": "OK",
                "message": "Answer Inserted successfully"
            }   
    Case --> dublicate or foreign key constraint failure
            {
                "status": "failed"
            }   
    Case --> invalid parameters
            {
                "status": "failed",
                "message": "Bad Request: Invalid parameters"
            }      
    */
    const questionnaireID = 'QQ01';
    const questionID = 'Q01';
    const session = 'ab15';
    const optionID = 'Q01A1';
    var res;

    // Check if the answer already exists into the db
    const query = `SELECT * FROM Answer WHERE QuestionnaireID = '${questionnaireID}' AND QuestionID = '${questionID}' AND Session = '${session}' AND OptionID = '${optionID}' `;
    
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

        // Define desired formats:
        // QQxxx for QuestionnaireID,
        // Qxx for QuestionID,
        // QxxA{1-9} for OptionID
        const questionnaireIDFormat = /^QQ\d{3}$/;
        const questionIDFormat = /^Q\d{2}$/;
        const optionIDFormat = /^Q\d{2}A\d$/;

        // Check for desired format
        if((!questionnaireIDFormat.test(questionnaireID)) || (!questionIDFormat.test(questionID)) || (!optionIDFormat.test(optionID)) || Buffer.byteLength(session, "utf-8")!= 4) {
            request(app)
                .post(`/intelliq_api/doanswer/${questionnaireID}/${questionID}/${session}/${optionID}`)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    const response = JSON.parse(res.text);
                    if (response.status === 'failed' && response.message === 'Bad Request: Invalid parameters') {
                        return done();
                    } else {
                        return done(new Error(`Expected status: \'failed\' and message: \'Bad Request: Invalid parameters\', but got status: ${response.status} and message: ${response.message}`));
                    }
                });
        }
        else {
            // If answer doesn't already exist, then it should be inserted successfully
            if(res === 0) {
                request(app)
                .post(`/intelliq_api/doanswer/${questionnaireID}/${questionID}/${session}/${optionID}`)
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
                                        return done(new Error('Data were not inserted into the database'));
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
                        return done(new Error('Response does not match expected result. Response should have been \'Answer Inserted successfully\''));
                    }
                });
            }
            else {
                // If answer already exists, then it shouldn't be inserted
                request(app)
                .post(`/intelliq_api/doanswer/${questionnaireID}/${questionID}/${session}/${optionID}`)
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function(err, res) {
                    if (err) return done(err);
                    const response = JSON.parse(res.text);
                    // Check for the expected response 
                    if (response.status !== 'failed') {
                        return done(new Error(`Response does not match expected result`));
                    }
                    else {
                        return done();
                    }
                });
            }
        }
    });
});