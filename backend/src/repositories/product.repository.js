/*
  Struktur tabel products di database:

  CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
*/

import db from "../config/db.js";

/* ================= GET PRODUCT ================= */

/**
 * Ambil data produk dari database
 * Jika keyword diisi → akan melakukan pencarian berdasarkan nama
 * Jika kosong → akan menampilkan semua produk
 */
export const getProduct = async (key_word = "") => {
  const [rows] = await db.execute(
    "SELECT * FROM products WHERE name LIKE ?",
    [`%${key_word}%`] // wildcard untuk search (mirip contains)
  );

  return rows;
};

/* ================= CREATE PRODUCT ================= */

/**
 * Menambahkan produk baru ke database
 */
export const addNewProduct = async (name, price, stock, image) => {
  const [result] = await db.execute(
    `
    INSERT INTO products
    (name, price, stock, image)
    VALUES (?,?,?,?)
    `,
    [name, price, stock, image]
  );

  // result berisi info seperti insertId, affectedRows, dll
  return result;
};

/* ================= UPDATE STOCK ================= */

/**
 * Menambah stock produk
 * stock lama + amount
 */
export const addStock = async (amount, id) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock + ? WHERE id = ?",
    [amount, id]
  );

  return result;
};

/**
 * Mengurangi stock produk
 * hanya akan berhasil jika stock mencukupi (stock >= amount)
 */
export const reduceStock = async (amount, id) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [amount, id, amount] // kondisi supaya tidak minus
  );

  return result;
};

/* ================= UPDATE PRODUCT ================= */

/**
 * Update produk secara dinamis (partial update)
 * fields  → array berisi kolom yang ingin diupdate (contoh: ["name = ?", "price = ?"])
 * values  → nilai untuk masing-masing field
 * id      → id produk yang akan diupdate
 */
export const updateProduct = async (fields, values, id) => {
  // Gabungkan field menjadi string query
  const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;

  // Tambahkan id ke akhir values (untuk WHERE id = ?)
  const finalValues = [...values, id];

  const [result] = await db.execute(sql, finalValues);

  return result;
};

/* ================= DELETE PRODUCT ================= */

/**
 * Menghapus produk berdasarkan ID
 */
export const deleteProduct = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM products WHERE id = ?",
    [id]
  );

  return result;
};