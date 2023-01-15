const { pool } = require('../db-init');

exports.getHome = (req, res, next) => {
    res.send("This is Home Page");
    // HOME PAGE
}

// Handle get questionnaire request 
exports.getQuestionnaire = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;

    pool.getConnection((err, conn) => {

        // SQL query to select the general information and questions of a questionnaire
        var sql = `SELECT Questionnaire.QuestionnaireID, Questionnaire.QuestionnaireTitle, Keywords.KeywordsText, 
                  Question.QuestionID, Question.QText, Question.Q_Required, Question.Q_Type 
                  FROM Questionnaire 
                  INNER JOIN Keywords ON Keywords.QuestionnaireID = Questionnaire.QuestionnaireID
                  INNER JOIN Question ON Question.QuestionnaireID = Questionnaire.QuestionnaireID
                  WHERE Questionnaire.QuestionnaireID = ${questionnaireID}
                  ORDER BY Question.QuestionID`;

        // Execute the SQL query
        conn.promise().query(sql)
            .then(([rows, fields]) => {
                pool.releaseConnection(conn);
                if (rows.length == 0) {
                    res.status(402).json({
                        message: "No data found!"
                    })
                }
                else {
                    res.status(200).json({
                        questionnaire: rows
                    })
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

// Handle get question request 
exports.getQuestion = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;

    pool.getConnection((err, conn) => {

        // SQL statement to select the question and its options
        var sql = `SELECT Questionnaire.QuestionnaireID, Question.QuestionID, Question.QText, Question.Q_Required, Question.Q_Type, 
                  Q_Option.OptionID, Q_Option.OptText, Q_Option.NextQID
                  FROM Questionnaire
                  INNER JOIN Question ON Questionnaire.QuestionnaireID = Question.QuestionnaireID
                  INNER JOIN Q_Option ON Question.QuestionID = Q_Option.OptionID
                  WHERE Questionnaire.QuestionnaireID = ${questionnaireID} AND Question.QuestionID = ${questionID}
                  ORDER BY Q_Option.OptionID`;

        // Execute the SQL query
        conn.promise().query(sql)
            .then(([rows, fields]) => {
                pool.releaseConnection(conn);
                if (rows.length == 0) {
                    res.status(402).json({
                        message: "No data found!"
                    })
                }
                else {
                    res.status(200).json({
                        question: rows
                    })
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

// Handle doAnswer post
exports.doAnswer = (req, res, next) => {
    const QuestionnaireID = req.params.questionnaireID;
    const QuestionID = req.params.questionID;
    const session = req.params.session;
    const OptionID = req.params.optionID;

    pool.getConnection((err, conn) => {

        // SQL query to find the UserID associated with the provided questionnaireID
        var sqlFindUser = `SELECT UserID FROM Questionnaire WHERE QuestionnaireID = ${QuestionnaireID}`;

        var UserID;
        // Execute the query to find the UserID
        conn.promise().query(sqlFindUser)
            .then(([rows, fields]) => {
                UserID = rows[0].UserID;

                // SQL query to insert the answer into the Answer table
                var sqlInsertAnswer = `INSERT INTO Answer (QuestionnaireID, QuestionID, UserID, Session, OptionID) VALUES 
                                      (${QuestionnaireID},${QuestionID},${UserID},'${session}',${OptionID})`;

                // Execute the insert query
                conn.promise().query(sqlInsertAnswer)
                    .then( () => {
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
        

// Handle get answers request 
exports.getSessionAnswers = (req, res, next) => {
    const QuestionnaireID = req.params.questionnaireID;
    const session = req.params.session;

    pool.getConnection((err, conn) => {

        // SQL query to select the answers of a session of a questionnaire
        var sql = `SELECT Questionnaire.QuestionnaireID, Answer.Session, Answer.QuestionID, Q_Option.OptText
                  FROM Questionnaire 
                  INNER JOIN Answer ON Answer.QuestionnaireID = Questionnaire.QuestionnaireID
                  INNER JOIN Q_Option ON Q_Option.OptionID = Answer.OptionID
                  WHERE Questionnaire.QuestionnaireID = ${QuestionnaireID} AND Answer.Session = '${session}'
                  ORDER BY Answer.QuestionID`;

        // Execute the SQL query
        conn.promise().query(sql)
        .then(([rows, fields]) => {
            pool.releaseConnection(conn);
            if (rows.length == 0) {
                res.status(402).json({
                    message: "No data found!"
                })
            }
            else {
                res.status(200).json({
                    answers: rows
                })
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

// Handle get question answers request
exports.getQuestionAnswers = (req, res, next) => {
    const QuestionnaireID = req.params.questionnaireID;
    const QuestionID = req.params.questionID;

    pool.getConnection((err, conn) => {

        // SQL query to select the answers for a specific question in a questionnaire
        const sql = `SELECT Answer.QuestionnaireID, Answer.QuestionID, Answer.Session, Q_Option.OptText
                    FROM Answer
                    INNER JOIN Q_Option ON Q_Option.OptionID = Answer.OptionID
                    WHERE Answer.QuestionnaireID = ${QuestionnaireID} AND Answer.questionID = ${QuestionID}
                    ORDER BY Answer.last_update`;

        // Execute the SQL query
        conn.promise().query(sql)
        .then(([rows, fields]) => {
            pool.releaseConnection(conn);
            if (rows.length == 0) {
                res.status(402).json({
                    message: "No data found!"
                })
            }
            else {
                res.status(200).json({
                    answers: rows
                })
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