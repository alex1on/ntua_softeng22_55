const { pool } = require('../db-init')
const jwt = require('jsonwebtoken')

// Handle login requests 
async function checkCredentials(req, res, next){
    const { Username, Password } = req.params
    const sql = `SELECT * FROM Q_User WHERE Username = ? AND psw = ?`
    const promiseConne = pool.promise()
    const [rows,fields] = await promiseConne.query(sql, [Username, Password])
    if (rows.length === 0){
        res.status(401).send('Invalid Credentials')
        return
    }
    const {psw, ...obj} = rows[0]
    const token = jwt.sign(obj, process.env.JWT_KEY || '42',{ expiresIn: '1h' });
    res.status(200).send({token})
}

module.exports = {checkCredentials}