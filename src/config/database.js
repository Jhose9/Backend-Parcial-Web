import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "root",
    database:process.env.DB_NAME || "parcial_db",
    password:process.env.DB_PASSWORD || "10101048",
    port:process.env.DB_PORT || 3307
})

export default pool;