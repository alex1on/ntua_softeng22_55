const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('GET /intelliq_api/getsessionanswers/:questionnaireID/:questionID', function() {
    
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
    
    Case3:  Data Exist   
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

    it('It should return a JSON object with properly formatted question answers data or Bad request message in case of invalid parameters.', function(done) {
       
        const questionnaireID = 'QQ001';
        const questionID = 'Q011';

        // Define desired format QQxxx for QuestionnaireID and Qxx for QuestionID
        const questionnaireIDFormat = /^QQ\d{3}$/;
        const questionIDFormat = /^Q\d{2}$/;

        // Case1 --> Invalid QuestionnaireID or QuestionID or both
        // Check for desired format
        if(!questionnaireIDFormat.test(questionnaireID) || !questionIDFormat.test(questionID)) {
            request(app)
                .get(`/intelliq_api/getquestionanswers/${questionnaireID}/${questionID}`)
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
            const query = `SELECT * FROM Answer WHERE QuestionnaireID = '${questionnaireID}' AND QuestionID = '${questionID}'`;
            pool.getConnection((err, conn) => {
                conn.promise().query(query)
                    .then(([rows, fields]) => {

                        // Case2 --> No data
                        if(rows.length == 0) {
                            pool.releaseConnection(conn);
                            request(app)
                                .get(`/intelliq_api/getquestionanswers/${questionnaireID}/${questionID}`)
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
                                            done();
                                        }
                                    }
                                })
                        }
                        else {
                            // Case3 --> Check for desired JSON object format
                            request(app)
                                .get(`/intelliq_api/getquestionanswers/${questionnaireID}/${questionID}`)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    if (err) return done(err);
                                    const data = JSON.parse(res.text);

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