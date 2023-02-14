const { pool } = require('../db-init');

exports.getStatisticsHome = (req, res, next) => {
    res.send("Statistical Analyzer!");
}
