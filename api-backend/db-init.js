const mysql = require('mysql2')

// Create a pool to the database
const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'intelliQ'
});

module.exports = { pool };