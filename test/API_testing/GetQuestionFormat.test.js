const request = require('supertest');
const app = require('../../api-backend/app');

describe('GetQuestion Format', function() {
    
    /*
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

    it('It should return a JSON object with question data formatted as above!', function(done) {
        request(app)
        .get('/intelliq_api/question/1/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            const data = JSON.parse(res.text);
            // No data? Status code 204 should have been returned
            if (!data.question) {
                return done(new Error('Response does not contain question data. Status code 204 should have been returned.'));
            }

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
            done();
        });
    });
});
  