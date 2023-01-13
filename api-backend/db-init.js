const mysql = require('mysql2')

// Create a pool to the database
const pool = mysql.createPool({
    host: 'localhost',
    port: '91003',
    user: 'root',
    database: 'intelliQ'
});

module.exports = { pool };