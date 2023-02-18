const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('GET /intelliq_api/questionnaire/:questionnaireID', function() {
    
    /*
    Case1:  Invalid QuestionnaireID
            Status code 400 (Bad Request)
            Expected returned json object:
            {
                    "status": "failed",
                    "message": "Bad Request: Invalid questionnaireID"
            }
    Case2:  No data
            Status code 204 (No data)

    Case3:  Data exist
            Questionnaire JSON Object Format
            {
                "questionnaire": {
                    "questionnaireID": Questionnaire ID (string),
                    "questionnaireTitle": Questionnaire Title (string),
                    "keywords": []  list/array of keywords (each keyword (i.e element) is a string) 
                    "questions": [] list/array of question json objects each of which has the following format
                        {
                            "QuestionID": Question ID (string),
                            "QText": Question Text (string),
                            "Q_Required": Required or not question (values 'true' or 'false' as a string),
                            "Q_Type": Question's type (values 'Personal' or 'Reasearch' as a string)
                        }
                }
            }    
    */

    it('It should return a JSON object with properly formatted questionnaire data or Bad request message in case of invalid QuestionnaireID.', function(done) {

        const id = 'QQ001';        
        // Define desired format QQxxx for QuestionnaireID
        const questionnaireIDFormat = /^QQ\d{3}$/;

        // Case1 --> Invalid QuestionnaireID
        // Check for desired format
        if (!questionnaireIDFormat.test(id)) {
            request(app)
                .get(`/intelliq_api/questionnaire/${id}`)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    const response = JSON.parse(res.text);
                    if (response.status === 'failed' && response.message === 'Bad Request: Invalid questionnaireID') {
                        return done();
                    } else {
                        return done(new Error(`Expected status: \'failed\' and message: \'Bad Request: Invalid questionnaireID\', but got status: ${response.status} and message: ${response.message}`));
                    }
                });
        }
        else {

            // Execute SQL query to figure out if there are data or not
            const query = `SELECT * FROM Questionnaire WHERE QuestionnaireID = '${id}'`;
            pool.getConnection((err, conn) => {
                conn.promise().query(query)
                    .then(([rows, fields]) => {

                        // Case2 --> No data
                        if(rows.length == 0) {
                            pool.releaseConnection(conn);
                            request(app)
                                .get(`/intelliq_api/questionnaire/${id}`)
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
                            pool.releaseConnection(conn);
                            request(app)
                                .get(`/intelliq_api/questionnaire/${id}`)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    if (err) {
                                        return done(err);
                                    }
                                    const data = JSON.parse(res.text);

                                    // Check for unexpected fields in the questionnaire json object
                                    const extraFields = Object.keys(data.questionnaire).filter(key => key !== 'questionnaireID' && key !== 'questionnaireTitle' && key !== 'keywords' && key !== 'questions');
                                    if (extraFields.length > 0) {
                                        return done(new Error(`Unexpected fields in questionnaire ${data.questionnaire.questionnaireID}: ${extraFields.join(', ')}`));
                                    }  

                                    // QuestionnaireID must be a string
                                    if (typeof data.questionnaire.questionnaireID !== 'string') {
                                        return done(new Error('questionnaireID should be a string'));
                                    }

                                    // QuestionnaireTitle must be a string
                                    if (typeof data.questionnaire.questionnaireTitle !== 'string') {
                                        return done(new Error('questionnaireTitle should be a string'));
                                    }

                                    // keywords field must be an array/list of string
                                    if (!Array.isArray(data.questionnaire.keywords)) {
                                        return done(new Error('keywords should be an array/list'));
                                    }
                                    data.questionnaire.keywords.forEach( keyword => {
                                        if(typeof keyword !== 'string') {
                                            return done(new Error('keywords\'s elements must be strings'));
                                        }
                                    });

                                    // questions field must be an array/list of json objects formatted as mentioned before 
                                    if (!Array.isArray(data.questionnaire.questions)) {
                                        return done(new Error('questions should be an array/list'));
                                    }
                                    data.questionnaire.questions.forEach(question => {

                                        // QuestionID must be a string
                                        if (typeof question.QuestionID !== 'string') {
                                            return done(new Error('QuestionID should be a string'));
                                        }
                                        // QText must be a string
                                        if (typeof question.QText !== 'string') {
                                            return done(new Error('QText should be a string'));
                                        }
                                        // Q_Required must be 'true' or 'false'
                                        if (question.Q_Required !== 'true' && question.Q_Required !== 'false') {
                                            return done(new Error('Q_Required should be "true" or "false"'));
                                        }
                                        // Q_Type must be 'Personal' or 'Research'
                                        if (question.Q_Type !== 'Personal' && question.Q_Type !== 'Research') {
                                            return done(new Error('Q_Type should be "Personal" or "Research"'));
                                        }
                                        // Check for unexpected fields in the question json object
                                        const extraFields = Object.keys(question).filter(key => key !== 'QuestionID' && key !== 'QText' && key !== 'Q_Required' && key !== 'Q_Type');
                                        if (extraFields.length > 0) {
                                            return done(new Error(`Unexpected fields in question ${question.QuestionID}: ${extraFields.join(', ')}`));
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