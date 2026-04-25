/*
    CREATE TALBE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

*/

const db = require("../config/db");

// GET username
exports.getUser = async (username) => {
  const [row] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  return row[0];
};

// Membuat akun baru
exports.createUser = async (name, username, password) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, username, password) VALUES (?,?,?)",
    [name, username, password],
  );

  return result;
};

// Hapus akun user
exports.deleteUser = async (id) => {
  const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

  return result;
};
