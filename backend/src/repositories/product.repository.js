/*
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

// Menampilkan produk
export const getProduct = async (key_word = "") => {
  const [rows] = await db.execute("SELECT * FROM products WHERE name LIKE ?", [
    `%${key_word}%`,
  ]);

  return rows;
};

// Tambah produk baru
export const addNewProduct = async (name, price, stock, image) => {
  const [result] = await db.execute(
    `
        INSERT INTO products
        (name, price, stock, image)
        VALUES (?,?,?,?)`,
    [name, price, stock, image],
  );

  return result;
};

// Tambah stok
export const addStock = async (amount, id) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock + ? WHERE id = ?",
    [amount, id],
  );

  return result;
};

// Kurangi stok
export const reduceStock = async (amount, id) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [amount, id, amount],
  );

  return result;
};

// Update produk
export const updateProduct = async (fields, values, id) => {
  const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;

  const finalValues = [...values, id];

  const [result] = await db.execute(sql, finalValues);

  return result;
};

// Hapus produk
export const deleteProduct = async (id) => {
  const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);

  return result;
};
