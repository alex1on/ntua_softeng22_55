const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('GET /intelliq_api/getsessionanswers/:questionnaireID/:session', function() {
    
    /*
    Case1:  Invalid parameters
            Status code 400 (Bad Request)
            Expected returned json object:
            {
                    "status": "failed",
                    "message": "Bad Request: Invalid parameters"
            }
    Case2:  No data
            Status code 204 (No data)
    
    Case3:   Data exist
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

    it('It should return a JSON object with properly formatted session answers data or Bad request message in case of invalid parameters.', function(done) {
        
        const questionnaireID = 'QQ001';
        const session = 'ab11';

        // Define desired format QQxxx for QuestionnaireID
        const questionnaireIDFormat = /^QQ\d{3}$/;

        // Case1 --> Invalid parameters
        // Check for desired format and proper length
        if((!questionnaireIDFormat.test(questionnaireID)) || Buffer.byteLength(session, "utf-8")!= 4) {
            request(app)
                .get(`/intelliq_api/getsessionanswers/${questionnaireID}/${session}`)
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
             // Execute SQL query to figure out if there are data or not
             const query = `SELECT * FROM Answer WHERE QuestionnaireID = '${questionnaireID}' AND Session = '${session}'`;
             pool.getConnection((err, conn) => {
                conn.promise().query(query)
                    .then(([rows, fields]) => {

                        // Case2 --> No data
                        if(rows.length == 0) {
                            pool.releaseConnection(conn);
                            request(app)
                                .get(`/intelliq_api/getsessionanswers/${questionnaireID}/${session}`)
                                .expect(204)
                                .end(function(err, res) {
                                    if (err) {
                                        return done(err);
                                    }
                                    else {
                                        if (res.status !== 204) {
                                            done(new Error('Expected status 204 (No data) but got ' + res.status));
                                        }
                                        else {
                                            return done();
                                        }
                                    }
                                })
                        }
                        else {
                            // Case3 --> Check for desired JSON object format
                            request(app)
                                .get(`/intelliq_api/getsessionanswers/${questionnaireID}/${session}`)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    if (err) return done(err);
                                    const data = JSON.parse(res.text);

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
                                    return done();
                                });
                        }
                    })
                    .catch((err) => {
                        pool.releaseConnection(conn);
                        return done(new Error(`Error in querying the database ${err.message}`));
                    });
             });
        }
    });
});