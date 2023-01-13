const { pool } = require('../db-init.js');

// Handle login requests 
exports.checkCredentials = (req, res, next) => {

    const { username, password } = req.body;
    
    // SQL statement to check if the provided credentials match a user in the database
    const sql = `SELECT * FROM Q_User WHERE Username = ? AND psw = ?`

    // Execute the SQL query
    pool.getConnection((err, conn) => {
        conn.promise().query(sql, [username, password], (error, results) => {
            if (error) {
                // Return an error if there was a problem executing the query
                res.status(500).json({ message: 'Interval server error -> Error logging in' });
            } else if (results.length > 0) {
                // If the credentials match a user in the database, return a success message
                res.status(200).json({ message: 'Successfully logged in' })
            } else {
                // If the credentials do not match a user in the database, return an error message
                res.status(401).json({ message: 'Invalid username or password' })
            }
        });
    });
};