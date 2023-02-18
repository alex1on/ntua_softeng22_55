import { pool } from "../../../utils/dbconnection"
import format_handler from "../../../utils/format_handler";


export default async function getQuestionnaire(req, res){
    const {questionnaireid} = req.query;
    const format = req.query.format;

    pool.getConnection((err, conn) => {

        // SQL query to select the general information and questions of a questionnaire
        
        var sql = `SELECT Questionnaire.QuestionnaireID, Questionnaire.QuestionnaireTitle, Keywords.KeywordsText, 
                  Question.QuestionID, Question.QText, Question.Q_Required, Question.Q_Type 
                  FROM Questionnaire 
                  INNER JOIN Keywords ON Keywords.QuestionnaireID = Questionnaire.QuestionnaireID
                  INNER JOIN Question ON Question.QuestionnaireID = Questionnaire.QuestionnaireID
                  WHERE Questionnaire.QuestionnaireID = ${questionnaireid}
                  ORDER BY Question.QuestionID`;

        // Execute the SQL query
        conn.promise().query(sql)
            .then(([rows, fields]) => {
                pool.releaseConnection(conn);
                const filename = `questionnaire` + questionnaireid;
                format_handler(format, rows, filename, res);
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