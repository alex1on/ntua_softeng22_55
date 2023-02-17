const { format } = require('path');
const { pool } = require('../db-init');

const format_handler = require('../format_handler')
const statistics = require('../statistics/statistics')
//const error_handler = require('./error_handler')

exports.getHome = (req, res, next) => {
    res.send("This is Home Page");
    //statistics.file_creator(1,"Manos",1);
    //statistics.AddKeyword(1,"Key1");
    //statistics.AddQuestion(1, 1, "Question1", "true", "Research");
    //statistics.AddQuestion(1, 2, "Question3", "true", "Research");
    //statistics.AddOption(1,1,1,"A",2);
    //statistics.AddOption(1,1,2,"B",2);
    //statistics.AddAnswer(1,1,"ab11",1);
    //statistics.AddAnswer(1,1,"session1",1);
    //statistics.AddAnswer(1,1,"session2",1);
    //statistics.AddAnswer(1,1,"session3",2);
    // const x = statistics.getQuestionnaireFile(1);
    // console.log(x);
    // HOME PAGE
}

// Handle get questionnaire request 
exports.getQuestionnaire = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const format = req.query.format;
    
    if (isNaN(questionnaireID)) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Invalid questionnaireID"
        });
        return;
    }

    pool.getConnection((err, conn) => {

        // SQL query to retrieve Questionnaire's Title
        var sqlFindTitle = `SELECT QuestionnaireTitle FROM Questionnaire WHERE QuestionnaireID = '${questionnaireID}'`;
        // SQL query to retrieve Questionnaire's Keywords
        var sqlFindKeywords = `SELECT Keywords.KeywordsText FROM Keywords WHERE QuestionnaireID = '${questionnaireID}'`;
        // SQL query to retrieve Questionnaire's Questions
        var sqlFindQuestions = `SELECT QuestionID, QText, Q_Required, Q_Type FROM Question 
                                WHERE QuestionnaireID = '${questionnaireID}'
                                ORDER BY QuestionID`; 

        var Title, Keywords, Questions;

        // Execute sqlFindTitle query
        conn.promise().query(sqlFindTitle)
            .then(([rows, fields]) => {

                if (rows.length == 0) {
                    pool.releaseConnection(conn);
                    res.status(204).json({
                        status: 'failed',
                        message: "No data found!"
                    });
                    return;
                }
                else {
                    Title = rows[0].QuestionnaireTitle;
                    
                    // Execute sqlFindKeywords query
                    conn.promise().query(sqlFindKeywords)
                        .then(([rows, fields]) => {
                            Keywords = rows.map(row => row.KeywordsText);
                        })
                        .catch((err) => {
                            pool.releaseConnection(conn);
                            res.status(500).json({
                                status: 'failed',
                                message: err.message
                            })
                            return;
                        })

                    // Execute sqlFindQuestions query
                    conn.promise().query(sqlFindQuestions)
                        .then(([rows, fields]) => {
                            Questions = rows.map(row => {
                                return {
                                    ...row,
                                    QuestionID: row.QuestionID.toString()
                                }
                            });
                            pool.releaseConnection(conn);
                            const filename = `questionnaire` + questionnaireID;
                            const formattedData = {
                                    "questionnaireID": questionnaireID,
                                    "questionnaireTitle": Title,
                                    "keywords": Keywords,
                                    "questions": Questions
                            }
                            format_handler(format, formattedData, filename, res, `questionnaire`);
                        })
                        .catch((err) => {
                            pool.releaseConnection(conn);
                            res.status(500).json({
                                status: 'failed',
                                message: err.message
                            })
                            return;
                        })
                }
            })
            .catch((err) => {
                pool.releaseConnection(conn);
                res.status(500).json({
                    status: 'failed',
                    message: err.message
                })
                return;
            })          
    });
};

// Handle get question request 
exports.getQuestion = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.query.format;

    if(isNaN(questionnaireID) || isNaN(questionID)) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Invalid questionnaireID or questionID"
        });
        return;
    }

    pool.getConnection((err, conn) => {

        // SQL query to retrieve Question's Text, Type and Required fields
        var sqlFind_TRT = `SELECT QText, Q_Required, Q_Type FROM Question WHERE 
                          QuestionnaireID = '${questionnaireID}' AND QuestionID = '${questionID}';`;

        // SQL query to retrieve Question's Options
        var sqlFindOptions = `SELECT O.OptionID, O.OptText, O.NextQID 
                              FROM Q_Option O INNER JOIN Question Q ON O.QuestionID = Q.QuestionID 
                              WHERE Q.QuestionnaireID = '${questionnaireID}' AND Q.QuestionID = '${questionID}'
                              ORDER BY O.OptionID`;

        var Text, Required, Type, Options;

        // Execute sqlFind_RTR query
        conn.promise().query(sqlFind_TRT)
            .then(([rows, fields]) => {

                if (rows.length == 0) {
                    pool.releaseConnection(conn);
                    res.status(204).json({
                        status: 'failed',
                        message: "No data found!"
                    });
                    return;
                }
                else {
                    Text = rows[0].QText;
                    Required = rows[0].Q_Required;
                    Type = rows[0].Q_Type;

                    // Execute sqlFindOptions query
                    conn.promise().query(sqlFindOptions)
                        .then(([rows, fields]) => {
                            Options = rows.map(row => {

                                // If it is the last question (i.e NextQID = null) then we cannot use toString for null value
                                if(row.NextQID != null) {
                                    return {
                                        ...row,
                                        OptionID: row.OptionID.toString(),
                                        NextQID: row.NextQID.toString()
                                    }
                                }
                                else {
                                    return {
                                        ...row,
                                        OptionID: row.OptionID.toString(),
                                        NextQID: row.NextQID
                                    }
                                }
                            });
                            

                            pool.releaseConnection(conn);
                            const filename = `question` + questionID;
                            const formattedData = {
                                "questionnaireID": questionnaireID, 
                                "questionID": questionID,
                                "qtext": Text,
                                "required": Required,
                                "type": Type, 
                                "options": Options
                            }
                            format_handler(format, formattedData, filename, res, `question`);
                        })
                        .catch((err) => {
                            pool.releaseConnection(conn);
                            res.status(500).json({
                                status: 'failed',
                                message: err.message
                            })
                            return;
                        })
                    }
            })
            .catch((err) => {
                pool.releaseConnection(conn);
                res.status(500).json({
                    status: 'failed',
                    message: err.message
                })
                return;
            })
    });
};

// Handle doAnswer post
exports.doAnswer = (req, res, next) => {
    const QuestionnaireID = req.params.questionnaireID;
    const QuestionID = req.params.questionID;
    const session = req.params.session;
    const OptionID = req.params.optionID;

    if(isNaN(QuestionnaireID) || isNaN(QuestionID) || isNaN(OptionID) || Buffer.byteLength(session, "utf-8")!= 4) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Invalid parameters"
        });
        return;
    }

    pool.getConnection((err, conn) => {

        // SQL query to insert the answer into the Answer table
        var sqlInsertAnswer = `INSERT INTO Answer (QuestionnaireID, QuestionID, Session, OptionID) VALUES 
                              ('${QuestionnaireID}','${QuestionID}','${session}','${OptionID}')`;

        // Execute the insert query
        conn.promise().query(sqlInsertAnswer)
            .then(() => {
                pool.releaseConnection(conn);
                res.status(200).json({
                    status: 'OK',
                    message: "Answer Inserted successfully"
                })
            })
            .catch((err) => {
                pool.releaseConnection(conn);
                res.status(500).json({
                    status: 'failed',
                    message: err.message
                })
            })
        //statistics.AddAnswer(QuestionnaireID, QuestionID, session, OptionID);
    })
};


// Handle get answers request 
exports.getSessionAnswers = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;
    const format = req.query.format;

    if(isNaN(questionnaireID) || Buffer.byteLength(session, "utf-8")!= 4) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Invalid parameters"
        });
        return;
    }

    pool.getConnection((err, conn) => {

        
        // SQL query to retrieve the session answers
        var sqlFindAnswers = `SELECT QuestionID, OptionID FROM Answer 
                              WHERE QuestionnaireID = '${questionnaireID}' AND SESSION = '${session}' 
                              ORDER BY QuestionID`;
        var Answers;

        // Execute sqlFindAnswers query
        conn.promise().query(sqlFindAnswers)
        .then(([rows, fields]) => {
            pool.releaseConnection(conn);

            if (rows.length == 0) {
                res.status(204).json({
                    message: "No data found!"
                })
            }
            else {
                Answers = rows.map(row => {

                    if(row.OptionID != null) {
                        return {
                            qID: row.QuestionID.toString(),
                            ans: row.OptionID.toString()
                        }
                    }
                    else {
                        return {
                            qID: row.QuestionID.toString(),
                            ans: row.OptionID
                        }
                    }
                })

                const filename = 'sessionAnswers' + session;
                const formattedData = {
                    "questionnaireID": questionnaireID,
                    "session": session,
                    "answers": Answers
                }
                format_handler(format, formattedData, filename, res, `Session Answers`);
            }
        })
        .catch((err) => {
            pool.releaseConnection(conn);
            res.status(500).json({
                status: 'failed',
                message: err.message
            })
            return;
        })
    });
};

// Handle get question answers request
exports.getQuestionAnswers = (req, res, next) => {
    const QuestionnaireID = req.params.questionnaireID;
    const QuestionID = req.params.questionID;
    const format = req.query.format;

    if(isNaN(QuestionnaireID) || isNaN(QuestionID)) {
        res.status(400).json({
            status: 'failed',
            message: "Bad Request: Invalid parameters"
        });
        return;
    }

    pool.getConnection((err, conn) => {

        // SQL query to retrieve the answers of the Question that belongs to the Questionnaire
        const sqlFindAnswers = `SELECT Session, OptionID FROM Answer
                                WHERE QuestionnaireID = '${QuestionnaireID}' AND QuestionID = '${QuestionID}'
                                ORDER BY Answer.last_update`;

        var Answers;

        // Execute the sqlFindAnswers query
        conn.promise().query(sqlFindAnswers)
        .then(([rows, fields]) => {
            pool.releaseConnection(conn);

            if (rows.length == 0) {
                res.status(204).json({
                    message: "No data found!"
                })
            }
            else {
                Answers = rows.map(row => {

                    if(row.OptionID != null) {
                        return {
                            session: row.Session,
                            ans: row.OptionID.toString()
                        }
                    }
                    else {
                        return {
                            session: row.Session,
                            ans: row.OptionID
                        }
                    }
                })
                
                const filename = `QuestionAnswers` + QuestionID;
                const formattedData = {
                    "questionnaireID": QuestionnaireID,
                    "questionID": QuestionID,
                    "answers": Answers
                }
                format_handler(format, formattedData, filename, res, `Question Answers`);
            }
        })
        .catch((err) => {
            pool.releaseConnection(conn);
            res.status(500).json({
                status: 'failed',
                message: err.message
            })
        })
    });
};