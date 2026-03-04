require('dotenv').config()
const app = require('./app')
const { pool } = require('./config/database/database')
const PORT = process.env.PORT || 5000

pool.getConnection((err, connection) => {
    if (err) {
        console.error('[ERROR] Erro ao conectar ao banco de dados', err)
        process.exit(1)
    }
    console.log('[INFO] Conexão com banco de dados estabelecida.')
    connection.release()
})

app.listen(PORT, () => {
    console.log(`[INFO] Servidor rodando: http://localhost:${PORT}`)
    console.log(`[INFO] Banco de dados: ${process.env.DB_NAME}, ${process.env.DB_HOST}, ${process.env.DB_PORT}`)
})