const { pool } = require('../db-init');

exports.getHome = (req, res, next) => {
    res.send("This is the home page");
}