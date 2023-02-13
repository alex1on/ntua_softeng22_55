const mysql = require('mysql2')

// Create a pool to the database
export const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'intelliQ'
});