/*
  CREATE TABLE carts (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id    INT UNSIGNED NOT NULL,
    status     ENUM('active', 'checkout', 'completed', 'abandoned') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


  CREATE TABLE cart_items (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cart_id    INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity   INT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
*/

import db from "../config/db.js";

// Ambil Cart yang aktif
export const getActiveCart = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM carts WHERE user_id = ? AND status = 'active' LIMIT 1",
    [user_id],
  );

  return rows[0];
};

// Membuat Cart
export const createCart = async (user_id) => {
  const [result] = await db.execute(
    "INSERT INTO carts (user_id, status) VALUES (?, 'active')",
    [user_id],
  );

  return result.insertId;
};

// Menambahkan item ke cart
export const insertItem = async (cart_id, product_id, quantity) => {
  const [result] = await db.execute(
    `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?)
     ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
    [cart_id, product_id, quantity],
  );

  return result;
};

// Cek item di cart
export const findCartItem = async (cart_id, product_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
    [cart_id, product_id],
  );

  return rows[0];
};

// Tambah satu item
export const incrementItem = async (id, user_id) => {
  const [result] = await db.execute(
    `UPDATE cart_items ci
     JOIN carts c ON ci.cart_id = c.id
     SET ci.quantity = ci.quantity + 1
     WHERE ci.id = ? AND c.user_id = ? AND c.status = 'active'`,
    [id, user_id],
  );

  return result;
};

// Kurang satu item
export const decrementItem = async (id, user_id) => {
  const [result] = await db.execute(
    `UPDATE cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      SET ci.quantity = ci.quantity - 1
      WHERE ci.id = ? AND c.user_id = ? AND c.status = 'active' AND ci.quantity > 1`,
    [id, user_id],
  );

  if (result.affectedRows === 0) {
    // Delete kalau tinggal 1
    await db.execute("DELETE FROM cart_items WHERE id = ?", [id]);
  }

  return result;
};

// Menampilkan cart beserta cart item berdasarkan user_id
export const getCartAndItems = async (user_id) => {
  const [rows] = await db.execute(
    `SELECT
            c.id AS cart_id,
            ci.id AS cart_item_id,
            p.id AS product_id,
            p.name,
            p.price,
            p.image,
            ci.quantity,
            (p.price * ci.quantity) AS subtotal
        FROM carts c
        JOIN cart_items ci ON c.id = ci.cart_id
        JOIN products p ON p.id = ci.product_id
        WHERE c.user_id = ? AND c.status = 'active'`,
    [user_id],
  );

  return rows;
};

// Hapus item
export const deleteItem = async (id, user_id) => {
  const [result] = await db.execute(
    `DELETE ci FROM cart_items ci
     JOIN carts c ON ci.cart_id = c.id
     WHERE ci.id = ? AND c.user_id = ? AND c.status = 'active'`,
    [id, user_id],
  );
};

// Checkout
export const checkoutCart = async (id, user_id) => {
  const [result] = await db.execute(
    "UPDATE carts SET status = 'completed' WHERE id = ? AND user_id = ?",
    [id, user_id],
  );
};
