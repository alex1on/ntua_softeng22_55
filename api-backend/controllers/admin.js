const { pool } = require('../db-init');
const { ConnectionString } = require('connection-string');

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
    pool.getConnection((err, conn) => {
        // TODO: IMPORT JSON QUESTIONNAIRE FILE
    })
}

exports.postResetall = (req, res, next) => {
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM Q_User`;
        conn.promise().query(sqlQuery)
            .then(() => {
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
