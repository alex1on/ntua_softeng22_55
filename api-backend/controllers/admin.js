const { pool } = require('../db-init');
const { ConnectionString } = require('connection-string');
const statistics = require('../statistics/statistics');

exports.getAdminHome = (req, res, next) => {
    // TODO: RENDER ADMIN HOMEPAGE 
    res.send("This should be: HomePages.ejs");
}

exports.getHealthCheck = (req, res, next) => {
    pool.getConnection((err, conn) => {
        const dbconnection = new ConnectionString('mysql://root@localhost:3306/intelliq');
        if (err) {
            res.status(500).json({
                status: 'failed',
                dbconnection
            })
        }
        else {
            res.status(200).json({
                status: 'OK',
                dbconnection
            })
        }
    })
}

exports.postQuestionnaire_upd = (req, res, next) => {
    // The questionnaire json data is on the request body as previously 
    // added by the multer muddleware (for more info check the admin.js route)
    // The body has to firstly be stringified and afterwards parsed as json. 
    // The questionnaire data is located in the 'file' field of the json object
    // which also needs to be parsed as json to correctly show the questionnaire 
    // data.
    const file = JSON.parse(JSON.stringify(req.body));
    const obj = JSON.parse(file.file);
    // TODO: Check if the .json format corresponds to a correct questionnaire
    // .json format. 
    pool.getConnection((err, conn) => {
        var questionnaire_creat = `INSERT INTO Questionnaire (QuestionnaireID, QuestionnaireTitle, UserID) VALUE (?, ?, ?)`;
        conn.promise().query(questionnaire_creat, [obj.questionnaireID, obj.questionnaireTitle, 3]);
        // TODO: Specify which user creates the questionnaire
        var i = 0;
        while (obj.questions[i] != null) {
            // Firstly parse the questions and add them to the DB. 
            // In this way, all questions exist before adding their option, 
            // it overcomes the issue where the next qID specified by an 
            // option doesn't exist in the DB.
            var question_creat = `INSERT INTO Question (QuestionID, QText, Q_Required, Q_Type, QuestionnaireID) VALUE (?, ?, ?, ?, ?)`;
            // console.log(obj.questions[i].qID, obj.questions[i].qtext, obj.questions[i].required, obj.questions[i].type, obj.questionnaireID);
            conn.promise().query(question_creat, [obj.questions[i].qID, obj.questions[i].qtext, obj.questions[i].required, obj.questions[i].type, obj.questionnaireID]);
            i++;
        }
        var i = 0;
        while (obj.questions[i] != null) {
            var j = 0;
            while (obj.questions[i].options[j] != null) {
                // After all the questions have been added to the DB 
                // the options of each question are added. 
                var option_creat = `INSERT INTO Q_Option (OptionID, OptText, NextQID, QuestionID, QuestionnaireID) VALUE (?, ?, ?, ?, ?)`;
                if (obj.questions[i].options[j].nextqID == '-')
                    obj.questions[i].options[j].nextqID = null;
                conn.promise().query(option_creat, [obj.questions[i].options[j].optID, obj.questions[i].options[j].opttxt, obj.questions[i].options[j].nextqID, obj.questions[i].qID, obj.questionnaireID]);

                // console.log(obj.questions[i].options[j].optID, obj.questions[i].options[j].opttxt, obj.questions[i].options[j].nextqID, obj.questions[i].qID, obj.questionnaireID)
                j++;
            }
            i++;
        }

        res.status(200).json({
            status: 'OK',
        })
    })
}

exports.postResetall = (req, res, next) => {
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM Q_User`;
        conn.promise().query(sqlQuery)
            .then(() => {
                statistics.resetallStatistics();
                pool.releaseConnection(conn);
                res.status(200).json({ status: 'OK' })
            })
            .catch((err) => {
                pool.releaseConnection(conn);
                res.status(500).json({
                    status: 'failed',
                    reason: err.message
                })
            })

    })
}

exports.postResetq = (req, res, next) => {

    const QID = req.params.questionnaireID;

    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM Answer WHERE QuestionnaireID = ${QID}`;

        conn.promise().query(sqlQuery)
            .then(() => {
                statistics.resetQuestionnaireAnswers(QID);
                pool.releaseConnection(conn);
                res.status(200).json({ status: 'OK' });
            })
            .catch((err) => {
                pool.releaseConnection(conn);
                res.status(500).json({
                    status: 'failed',
                    reason: err.message
                })
            })

    })
}

exports.postUsermod = (req, res, next) => {

    const username = req.params.username;
    const password = req.params.password;

    pool.getConnection((err, conn) => {
        var sqlQueryCHKUser = `SELECT * FROM Q_User WHERE Username = '${username}'`;

        conn.promise().query(sqlQueryCHKUser)
            .then(([rows, fields]) => {
                if (rows.length == 0) {

                    var sqlQueryCreate = `INSERT INTO Q_User (Username, psw) VALUES (?, ?)`;
                    conn.promise().query(sqlQueryCreate, [username, password])
                        .then(() => {
                            pool.releaseConnection(conn);
                            res.status(201).json({
                                status: 'User created'
                            })
                        })
                        .catch((err) => {
                            pool.releaseConnection(conn);
                            res.status(500).json({
                                status: 'failed',
                                message: err.message
                            })
                        })
                }
                else {
                    var sqlQueryUpdate = `UPDATE Q_User SET psw = ? WHERE Username = '${username}'`;
                    conn.promise().query(sqlQueryUpdate, [password])
                        .then(() => {
                            pool.releaseConnection(conn);
                            res.status(200).json({
                                status: 'OK'
                            })
                        })
                        .catch((err) => {
                            pool.releaseConnection(conn);
                            res.status(500).json({
                                status: 'failed',
                                message: err.message
                            })
                        })
                }
            })

    })
}

exports.getUser = (req, res, next) => {
    const username = req.params.username;

    pool.getConnection((err, conn) => {
        var sqlQuery = `SELECT * FROM Q_User WHERE Username = '${username}' `;

        conn.promise().query(sqlQuery)
            .then(([rows, fields]) => {
                pool.releaseConnection(conn);
                if (rows.length == 0) {
                    res.status(402).json({
                        status: 'failed',
                        message: 'Username doesn\'t exist'
                    })
                }
                else {
                    res.status(200).json({
                        status: 'OK',
                        user: rows
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
    })
}
