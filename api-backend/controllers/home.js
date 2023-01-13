const { pool } = require('../db-init');

exports.getHome = (req, res, next) => {
    res.render("This should be: HomePages.ejs");
}