const request = require('supertest');
const app = require('../../api-backend/app');
const { pool } = require('../../api-backend/db-init');

describe('GET /intelliq_api/question/:questionnaireID/:questionID', function() {
    
    /*
    Case1:  Invalid QuestionnaireID or QuestionID or both
            Status code 400 (Bad Request)
            Expected returned json object:
            {
                    "status": "failed",
                    "message": "Bad Request: Invalid questionnaireID"
            }
    Case2:  No data
            Status code 204 (No data)
    
    Case3:  Data Exist
            Question JSON Object Format
            {
                "question": {
                    "questionnaireID": Questionnaire ID (string),
                    "questionID": Question ID (string),
                    "qtext": Question Text (string),
                    "required": Required or not question (values 'true' or 'false' as a string),
                    "type":  Question's type (values 'Personal' or 'Reasearch' as a string)
                    "options": [] list/array of options json objects each of which has the following format
                        {
                            "OptionID": Option ID (string),
                            "OptText": Option Text (string),
                            "NextQID": Next Questiond ID (string)
                        }
                }
            }
    */

    it('It should return a JSON object with properly formatted question data or Bad request message in case of invalid parameters.', function(done) {

        const questionnaireID = 'QQ001';
        const questionID = 'Q01';

        // Define desired format QQxxx for QuestionnaireID and Qxx for QuestionID
        const questionnaireIDFormat = /^QQ\d{3}$/;
        const questionIDFormat = /^Q\d{2}$/;

        // Case1 --> Invalid QuestionnaireID or QuestionID or both
        // Check for desired format
        if(!questionnaireIDFormat.test(questionnaireID) || !questionIDFormat.test(questionID)) {
            request(app)
                .get(`/intelliq_api/question/${questionnaireID}/${questionID}`)
                .expect('Content-Type', /json/)
                .expect(400)
                .end(function(err, res) {
                    if (err) return done(err);
                    const response = JSON.parse(res.text);
                    if (response.status === 'failed' && response.message === 'Bad Request: Invalid questionnaireID or questionID') {
                        return done();
                    } else {
                        return done(new Error(`Expected status: \'failed\' and message: \'Bad Request: Invalid questionnaireID or questionID\', but got status: ${response.status} and message: ${response.message}`));
                    }
                });
        }
        else {

            // Execute SQL query to figure out if there are data or not
            const query = `SELECT * FROM Question WHERE QuestionnaireID = '${questionnaireID}' AND QuestionID = '${questionID}'`;
            pool.getConnection((err, conn) => {
                conn.promise().query(query)
                    .then(([rows, fields]) => {

                        // Case2 --> No data
                        if(rows.length == 0) {
                            pool.releaseConnection(conn);
                            request(app)
                                .get(`/intelliq_api/question/${questionnaireID}/${questionID}`)
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
                                .get(`/intelliq_api/question/${questionnaireID}/${questionID}`)
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    if (err) return done(err);
                                    const data = JSON.parse(res.text);

                                    // Check for unexpected fields in the question json object
                                    const extraFields = Object.keys(data.question).filter(key => key !== 'questionnaireID' && key !== 'questionID' && key !== 'qtext' && key !== 'required' && key !== 'type' && key !== 'options');
                                    if (extraFields.length > 0) {
                                        return done(new Error(`Unexpected fields in question ${data.question.questionID}: ${extraFields.join(', ')}`));
                                    }  

                                    // QuestionnaireID must be a string
                                    if (typeof data.question.questionnaireID !== 'string') {
                                        return done(new Error('questionnaireID should be a string'));
                                    }

                                    // QuestionID must be a string
                                    if (typeof data.question.questionID !== 'string') {
                                        return done(new Error('questionID should be a string'));
                                    }

                                    // qtext must be a string
                                    if (typeof data.question.qtext !== 'string') {
                                        return done(new Error('qtext should be a string'));
                                    }

                                    // required must be 'true' or 'false'
                                    if (data.question.required !== 'true' && data.question.required !== 'false') {
                                        return done(new Error(`required should be "true" or "false" ${typeof data.question.required}`));
                                    }

                                    // type must be 'Personal' or 'Research'
                                    if (data.question.type !== 'Personal' && data.question.type !== 'Research') {
                                        return done(new Error('required should be "Personal" or "Research"'));
                                    }
                                    
                                    // options field must be an array/list of option json objects formatted as mentioned before 
                                    if (!Array.isArray(data.question.options)) {
                                        return done(new Error('options should be an array/list'));
                                    }
                                    data.question.options.forEach(option => {

                                        // OptionID must be a string
                                        if (typeof option.OptionID !== 'string') {
                                            return done(new Error('OptionID should be a string'));
                                        }
                                        // OptText must be a string
                                        if (typeof option.OptText !== 'string') {
                                            return done(new Error('OptText should be a string'));
                                        }
                                        // NextQID must be a string
                                        if (typeof option.NextQID !== 'string') {
                                            return done(new Error('NextQID should be a string'));
                                        }
                                        // Check for unexpected fields in the option json object
                                        const extraFields = Object.keys(option).filter(key => key !== 'OptionID' && key !== 'OptText' && key !== 'NextQID');
                                        if (extraFields.length > 0) {
                                            return done(new Error(`Unexpected fields in option ${option.OptionID}: ${extraFields.join(', ')}`));
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