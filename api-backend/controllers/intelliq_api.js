const { pool } = require('../db-init');

exports.getHome = (req, res, next) => {
    res.send("This should be: HomePages.ejs");
    // HOME PAGE
}

// Handle get questionnaire request 
exports.getQuestionnaire = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    console.log(questionnaireID);

    // SQL query to select the general information and questions of a questionnaire


    // Execute the SQL query
    pool.getConnection((err, conn) => {
        var sql = `SELECT Questionnaire.QuestionnaireID, Questionnaire.QuestionnaireTitle, 
                Question.QuestionID, Question.QText, Question.Q_Required, Question.Q_Type 
                FROM Questionnaire 
                INNER JOIN Question ON Question.QuestionnaireID = Questionnaire.QuestionnaireID
                WHERE Questionnaire.QuestionnaireID = ${questionnaireID}
                ORDER BY Question.QuestionID`;

        console.log(sql);

        conn.promise().query(sql)
            .then(([rows, fields]) => {
                res.status(200).json({
                    questionnaire: rows
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

// Handle get question request 
exports.getQuestion = (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;

    // SQL statement to select the question and its options
    const sql = `SELECT Questionnaire.QuestionnaireID, Question.QuestionID, Question.QText, Question.Q_Required, Question.Q_Type, 
                Q_Option.OptionID, Q_Option.OptText, Q_Option.NextQID
                 FROM Questionnaire
                 INNER JOIN Question ON Questionnaire.QuestionnaireID = Question.QuestionnaireID
                 INNER JOIN Q_Option ON Question.QID = Q_Option.QID
                 WHERE Questionnaire.QuestionnaireID = ? AND Question.QID = ?
                 ORDER BY Q_Option.OptionID`

    pool.getConnection((err, conn) => {
        conn.promise().query(sql, [questionnaireID, questionID], (error, results) => {
            if (error) {
                // Return an error if there was a problem executing the query
                res.status(500).json({ message: 'Internal server error -> Error retrieving question' });
            } else if (results.length > 0) {
                // Return the question and its options
                res.status(200).json(results)
            } else {
                // Return an error if the question does not exist
                res.status(402).json({ message: 'Question not found' })
            }
        })
    })
}

// Handle doAnswer post
exports.doAnswer = (req, res, next) => {
    const { questionnaireID, questionID, session, optionID } = req.params;

    // SQL query to find the UserID associated with the provided questionnaireID
    const sqlFindUser = `SELECT UserID FROM Questionnaire WHERE QuestionnaireID = ?`;

    // Execute the query to find the UserID
    pool.getConnection((err, conn) => {
        conn.promise().query(sqlFindUser, [questionnaireID], (error, results) => {
            if (error) {
                // Return an error if there was a problem executing the query
                res.status(500).json({ message: 'Interval server error -> Error finding user' });
            } else if (results.length > 0) {
                // If the questionnaireID is found in the database, use the returned UserID as a parameter in the insert query
                const userID = results[0].UserID;

                // SQL query to insert the answer into the Answers table
                const sqlInsertAnswer = `INSERT INTO Answers (QuestionnaireID, QuestionID, UserID, Session, OptionID) VALUES (?,?,?,?,?)`;

                // Execute the insert query
                pool.getConnection((err, conn) => {
                    conn.promise().query(sqlInsertAnswer, [questionnaireID, questionID, userID, session, optionID], (error, results) => {
                        if (error) {
                            // Return an error if there was a problem executing the query
                            res.status(500).json({ message: 'Interval server error -> Error inserting answer' });
                        } else {
                            // If the query was executed successfully, return a success message
                            res.status(200).json({ message: 'Answer recorded successfully' });
                        }
                    });
                });
            } else {
                // If the questionnaireID is not found in the database, return an error message
                res.status(402).json({ message: 'Invalid questionnaire ID' });
            }
        });
    });
}

// Handle get answers request 
exports.getSessionAnswers = (req, res, next) => {
    const { questionnaireID, session } = req.params;

    // SQL query to select the answers of a session of a questionnaire
    const sql = `SELECT Questionnaire.QuestionnaireID, Answers.Session, Answers.QuestionID, Q_Option.OptText
                FROM Questionnaire 
                INNER JOIN Answers ON Answers.QuestionnaireID = Questionnaire.QuestionnaireID
                INNER JOIN Q_Option ON Q_Option.OptionID = Answers.OptionID
                WHERE Questionnaire.QuestionnaireID = ? AND Answers.Session = ?
                ORDER BY Answers.QuestionID`;

    // Execute the SQL query
    pool.getConnection((err, conn) => {
        conn.promise().query(sql, [questionnaireID, session], (error, results) => {
            if (error) {
                // Return an error if there was a problem executing the query
                res.status(500).json({ message: 'Internal server error -> Error getting session answers' });
            } else if (results.length > 0) {
                // If the answers exist in the database, return the answers
                res.status(200).json({ answers: results });
            } else {
                // If the answers do not exist in the database, return an error message
                res.status(402).json({ message: 'Answers not found' });
            }
        });
    });
};

// Handle get question answers request
exports.getQuestionAnswers = (req, res, next) => {
    const { questionnaireID, questionID } = req.params;
    // SQL query to select the answers for a specific question in a questionnaire
    const sql = `SELECT questionnaireID, questionID, session, OptText
                 FROM Answers 
                 INNER JOIN Q_Option ON Q_Option.OptionID = Answers.OptionID
                 WHERE questionnaireID = ? AND questionID = ?
                 ORDER BY Answers.Timestamp`;
    // Execute the SQL query
    pool.getConnection((err, conn) => {
        conn.promise().query(sql, [questionnaireID, questionID], (error, results) => {
            if (error) {
                // Return an error if there was a problem executing the query
                res.status(500).json({ message: 'Internal server error -> Error getting question answers' });
            } else if (results.length > 0) {
                // If answers for the question in the questionnaire exist in the database, return the answers
                res.status(200).json({ questionAnswers: results });
            } else {
                // If there are no answers for the question in the questionnaire, return an error message
                res.status(402).json({ message: 'Answers for the question not found' });
            }
        });
    });
};
