/*
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

const db = require("../config/db");

// Menampilkan produk
exports.getProduct = async (key_word = "") => {
  const [rows] = await db.execute("SELECT * FROM products WHERE name LIKE ?", [
    `%${key_word}%`,
  ]);

  return rows;
};

// Tambah produk baru
exports.addNewProduct = async (name, description, price, stock, image) => {
  const [result] = await db.execute(
    `
        INSERT INTO products
        (name, description, price, stock, image)
        VALUES (?,?,?,?,?)`,
    [name, description, price, stock, image],
  );

  return result;
};

// Tambah stok
exports.addStock = async (amount, id) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock + ? WHERE id = ?",
    [amount, id],
  );

  return result;
};

// Kurangi stok
exports.reduceStock = async (amount, id) => {
  const [result] = await db.execute(
    "UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?",
    [amount, id, amount],
  );

  return result;
};

// Update produk
exports.updateProduct = async (fields, values, id) => {
  const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;

  const finalValues = [...values, id];

  const [result] = await db.execute(sql, finalValues);

  return result;
};

// Hapus produk
exports.deleteProduct = async (id) => {
  const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);

  return result;
};
