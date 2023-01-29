const pool = require('../db-init');

function error_handler(err, conn, res) {

    pool.releaseConnection(conn);
    res.status(500).json({
        status: 'failed',
        message: err.message
    })
    return;
}

module.exports = error_handler;