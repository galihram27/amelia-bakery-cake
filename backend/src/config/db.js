import mysql from "mysql2";

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log("DB CONFIG:", {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "****" : undefined,
});

export default db.promise();