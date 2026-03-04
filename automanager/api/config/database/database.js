require('dotenv').config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.execute(sql, params, (error, results) => {
            if (error) reject(error)
            else resolve(results)
        })
    })
}

module.exports = {
    query,
    pool
}