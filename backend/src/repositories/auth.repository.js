/*
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/

import db from "../config/db.js";

// GET username
export const findUserByUsername = async (username) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  return rows[0];
};

// Membuat akun baru
export const createUser = async (
  name,
  username,
  password,
  phone,
  address = null,
) => {
  const [result] = await db.execute(
    "INSERT INTO users (name, username, password, phone, address) VALUES (?,?,?,?,?)",
    [name, username, password, phone, address],
  );

  return result;
};

// Update akun user
export const updateUser = async (fields, values, id) => {
  const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;

  const finalValues = [...values, id];

  const [result] = await db.execute(sql, finalValues);

  return result;
};

// Hapus akun user
export const deleteUser = async (id) => {
  const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

  return result;
};
