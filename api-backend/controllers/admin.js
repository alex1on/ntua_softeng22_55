const { pool } = require('../db-init');
const { ConnectionString } = require('connection-string');
const statistics = require('../statistics/statistics');
const jsonFormat_check = require('../jsonFormat_checker');

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
    jsonFormat_check(obj, res);
    pool.getConnection((err, conn) => {
        var questionnaire_creat = `INSERT INTO Questionnaire (QuestionnaireID, QuestionnaireTitle, UserID) VALUE (?, ?, ?)`;
        conn.promise().query(questionnaire_creat, [obj.questionnaireID, obj.questionnaireTitle, req.user.UserID])
            .then(() => {
                statistics.file_creator(obj.questionnaireID, obj.questionnaireTitle, req.user.UserID);
            })
        obj.keywords.forEach((keyword) => {
            var keyword_creat = `INSERT INTO Keywords (KeywordsText, QuestionnaireID) VALUE (?, ?)`;
            conn.promise().query(keyword_creat, [keyword, obj.questionnaireID])
                .then(() => {
                    statistics.AddKeyword(obj.questionnaireID, keyword);
                })
        })
        obj.questions.forEach((question) => {
            // Firstly parse the questions and add them to the DB. 
            // In this way, all questions exist before adding their option, 
            // it overcomes the issue where the next qID specified by an 
            // option doesn't exist in the DB.
            var question_creat = `INSERT INTO Question (QuestionID, QText, Q_Required, Q_Type, QuestionnaireID) VALUE (?, ?, ?, ?, ?)`;
            conn.promise().query(question_creat, [question.qID, question.qtext, question.required, question.type, obj.questionnaireID])
                .then(() => {
                    statistics.AddQuestion(obj.questionnaireID, question.qID, question.qtext, question.required, question.type);

                    if (obj.questions.indexOf(question) === obj.questions.length - 1) {
                        obj.questions.forEach(question => {
                            question.options.forEach(option => {
                                // After all the questions have been added to the DB 
                                // the options of each question are added. 
                                var option_creat = `INSERT INTO Q_Option (OptionID, OptText, NextQID, QuestionID, QuestionnaireID) VALUE (?, ?, ?, ?, ?)`;
                                if (option.nextqID === '-') {
                                    option.nextqID = null;
                                }
                                conn.promise().query(option_creat, [option.optID, option.opttxt, option.nextqID, question.qID, obj.questionnaireID])
                                    .then(() => {
                                        //console.log(obj.questionnaireID, question.qID, option.optID, option.opttxt, option.nextqID);
                                        statistics.AddOption(obj.questionnaireID, question.qID, option.optID, option.opttxt, option.nextqID);
                                    })
                            })
                        })
                    }
                })
        });

        res.status(200).json({
            status: 'OK',
        })
    })
}

exports.postResetall = (req, res, next) => {
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM Q_User WHERE UserID <> 1`;
        var sqlQuery2 = `Delete FROM Questionnaire`;
        conn.promise().query(sqlQuery2)
            .then((result) => {
                if (result[0].affectedRows === 0) {
                    // If zero rows were affected (i.e there are no data to our db) , then
                    // our db will return "Query OK, 0 rows affected" and will consider it a success. 
                    // We don't want that, so we consider it failure and Bad request (status code 400) 
                    pool.releaseConnection(conn);
                    res.status(400).json({
                        status: 'failed',
                        reason: '0 rows affected'
                    })
                    return;
                }
                statistics.resetallStatistics();
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

exports.postResetq = (req, res, next) => {

    const QID = req.params.questionnaireID;

    // Define QuestionnaireID QQxxx for questionnaireID
    const questionnaireIDFormat = /^QQ\d{3}$/;

    // Check for desired format
    if (!questionnaireIDFormat.test(QID)) {
        res.status(400).json({
            status: 'failed',
            reason: "Bad Request: Invalid questionnaireID format"
        });
        return;
    }

    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM Answer WHERE QuestionnaireID = '${QID}'`;

        conn.promise().query(sqlQuery)
            .then((result) => {
                if (result[0].affectedRows === 0) {
                    // If zero rows were affected (i.e there is no questionnaire with questionnaireID equal to the given one
                    // or there are no answers to this questionnaire), our db will return "Query OK, 0 rows affected" and 
                    // will consider it a success. 
                    // We don't want that, so we consider it failure and Bad request (status code 400) 
                    pool.releaseConnection(conn);
                    res.status(400).json({
                        status: 'failed',
                        reason: '0 rows affected'
                    })
                    return;
                }
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
                    // If there is no such user in the db, then insert user
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
                    // If user exists in the db, then update his password
                    var sqlQueryUpdate = `UPDATE Q_User SET psw = ? WHERE Username = '${username}'`;
                    conn.promise().query(sqlQueryUpdate, [password])
                        .then(() => {
                            pool.releaseConnection(conn);
                            res.status(200).json({
                                status: 'User\'s password updated'
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
                    res.status(204).json({
                        status: 'failed',
                        message: 'Username doesn\'t exist'
                    })
                }
                else {
                    res.status(200).json({
                        status: 'OK',
                        user: rows[0]
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
