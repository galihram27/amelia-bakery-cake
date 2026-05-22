/*
  Struktur tabel users di database:

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

/* ================= GET USER ================= */

/**
 * Mencari user berdasarkan username
 * Biasanya digunakan untuk login / validasi akun
 */
export const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE username = ?",
    [username] // pakai prepared statement (aman dari SQL injection)
  );

  // Ambil hanya 1 data (karena username seharusnya unik)
  return rows[0];
};

/* ================= CREATE USER ================= */

/**
 * Membuat akun user baru
 * address bersifat opsional (default: null)
 */
export const createUser = async (
  name,
  username,
  password,
  phone,
  address = null
) => {
  const [result] = await db.execute(
    `
    INSERT INTO users 
    (name, username, password, phone, address) 
    VALUES (?,?,?,?,?)
    `,
    [name, username, password, phone, address]
  );

  // result berisi insertId, affectedRows, dll
  return result;
};

/* ================= UPDATE USER ================= */

/**
 * Update data user secara dinamis (partial update)
 * fields → array field yang ingin di-update (contoh: ["name = ?", "phone = ?"])
 * values → nilai dari field tersebut
 * id     → id user yang akan di-update
 */
export const updateUser = async (fields, values, id) => {
 
  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  // Gabungkan values + id untuk parameter query
  const finalValues = [...values, id];

  const [result] = await db.execute(sql, finalValues);

  return result;
};

/* ================= DELETE USER ================= */

/**
 * Menghapus user berdasarkan ID
 * NOTE: ini hard delete (data benar-benar dihapus dari database)
 */
export const deleteUser = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM users WHERE id = ?",
    [id]
  );

  return result;
};