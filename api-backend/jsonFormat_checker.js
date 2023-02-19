function format_check(Questionnaire, res) {
    // This function checks if the format of .json file passed to postQuestionnaire_upd
    // corresponds to a correct questionnaire format 
    
    // Define desired format QQxxx for QuestionnaireID
    const questionnaireIDFormat = /^QQ\d{3}$/;

    // Check for desired format
    if(!questionnaireIDFormat.test(Questionnaire.questionnaireID)) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Invalid questionnaireID"
        });
        return;
    }
    // Check for unexpected fields in the questionnaire json object
    const extraFields = Object.keys(Questionnaire).filter(key => key !== 'questionnaireID' && key !== 'questionnaireTitle' && key !== 'keywords' && key !== 'questions');
    if (extraFields.length > 0) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Questionnaire json object has some unexpected fields"
        });
        return;
    } 
    const requiredFields = ['questionnaireID', 'questionnaireTitle', 'keywords', 'questions'];
    // Check for missing fields in the questionnaire json object
    if (!requiredFields.every(field => Questionnaire.hasOwnProperty(field))) {
        res.status(400).json({
          status: 'failed',
          message: "Bad Request: Questionnaire json object is missing some required fields"
        });
        return;
    }
    
    // QuestionnaireID must be a string
    if (typeof Questionnaire.questionnaireID !== 'string') {
        res.status(400).json({
            status: 'failed',
            message: "questionnaireID should be a string"
          });
          return;
    }

    // QuestionnaireTitle must be a string
    if (typeof Questionnaire.questionnaireTitle !== 'string') {
        res.status(400).json({
            status: 'failed',
            message: "questionnaireTitle should be a string"
          });
          return;
    }

    // keywords field must be an array/list of string
    if (!Array.isArray(Questionnaire.keywords)) {
        res.status(400).json({
            status: 'failed',
            message: "keywords should be an array/list"
          });
          return;
    }
    Questionnaire.keywords.forEach(keyword => {
        if(typeof keyword !== 'string') {
            res.status(400).json({
                status: 'failed',
                message: "keywords\'s elements must be strings"
              });
              return;
        }
    });

    // questions field must be an array/list of json objects formatted as below:
    /*
    {
        "QuestionID": Question ID (string),
        "QText": Question Text (string),
        "Q_Required": Required or not question (values 'true' or 'false' as a string),
        "Q_Type": Question's type (values 'Personal' or 'Reasearch' as a string)
    }
    */ 
    if (!Array.isArray(Questionnaire.questions)) {
        res.status(400).json({
            status: 'failed',
            message: "questions should be an array/list"
          });
          return;
    }

    // Define desired format Qxx for QuestionID
    const questionIDFormat = /^Q\d{2}$/;
    Questionnaire.questions.forEach(question => {

        // QuestionID format must be Qxx
        if(!questionIDFormat.test((question.qID))) {
            res.status(400).json({
                status: 'failed',
                message: `Question with qID = '${question.qID}' has wrong format`
              });
              return;
        }

        // QuestionID must be a string
        if (typeof question.qID !== 'string') {
            res.status(400).json({
                status: 'failed',
                message: `Question with qID = '${question.qID}' should be a string`
              });
              return;
        }
        // QText must be a string
        if (typeof question.qtext !== 'string') {
            res.status(400).json({
                status: 'failed',
                message: `QText for question with qID = '${question.qID}'  should be a string`
              });
              return;
        }
        // Q_Required must be 'true' or 'false'
        if (question.required !== 'true' && question.required !== 'false') {
            res.status(400).json({
                status: 'failed',
                message: `Q_Required for question with qID = '${question.qID}' should be "true" or "false"`
              });
              return;

        }
        // Q_Type must be 'Personal' or 'Research'
        if (question.type !== 'Personal' && question.type !== 'Research') {
            res.status(400).json({
                status: 'failed',
                message: `Q_Type for Question with qID = '${question.qID}' should be 'Personal' or 'Research'`
              });
              return;
        }
        // Check for unexpected fields in the question json object
        const extraFields = Object.keys(question).filter(key => key !== 'qID' && key !== 'qtext' && key !== 'required' && key !== 'type' && key !== 'options');
        if (extraFields.length > 0) {
            res.status(400).json({
                status: 'failed',
                message: `Unexpected fields in question ${question.qID}: ${extraFields.join(', ')}`
              });
        }
        const QuestionrequiredFields = ['qID', 'qtext', 'required', 'type', 'options'];
        // Check for missing fields in the question json object
        if (!QuestionrequiredFields.every(field => question.hasOwnProperty(field))) {
            res.status(400).json({
            status: 'failed',
            message: `Bad Request: In Questionnaire json object, question json object with qID = '${question.qID}' is missing some required fields`
            });
            return;
        }
    });
}

module.exports = format_check;