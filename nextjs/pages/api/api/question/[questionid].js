import { pool } from "../../../utils/dbconnection"

export default async function getQuestion(req, res, next){
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