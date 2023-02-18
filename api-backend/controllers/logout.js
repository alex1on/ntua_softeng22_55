const { pool } = require('../db-init');

exports.logout = (req,res,next) => {
    res.status(200).json({ status:'200', message: 'Successfully logged out' })
}