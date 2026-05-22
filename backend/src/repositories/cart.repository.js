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

/*
  ================= STRUKTUR DATABASE =================

  Tabel carts:
  - Menyimpan keranjang milik user
  - 1 user bisa punya banyak cart (history), tapi biasanya hanya 1 yang "active"

  status:
    - active     → cart sedang digunakan
    - checkout   → user sudah checkout (menunggu proses)
    - completed  → transaksi selesai
    - abandoned  → ditinggalkan (tidak jadi checkout)

  ----------------------------------------------------

  Tabel cart_items:
  - Menyimpan item dalam cart
  - Relasi:
      cart_id → carts.id
      product_id → products.id

  ON DELETE CASCADE:
  - Jika cart dihapus → semua item ikut terhapus
*/

import db from "../config/db.js";

/* ================= CART ================= */

/**
 * Ambil cart yang sedang aktif milik user
 * Biasanya user hanya punya 1 cart aktif
 */
export const getActiveCart = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM carts WHERE user_id = ? AND status = 'active' LIMIT 1",
    [user_id]
  );

  return rows[0]; // ambil 1 cart saja
};

/**
 * Membuat cart baru untuk user
 * Digunakan jika user belum punya cart aktif
 */
export const createCart = async (user_id) => {
  const [result] = await db.execute(
    "INSERT INTO carts (user_id, status) VALUES (?, 'active')",
    [user_id]
  );

  return result.insertId; // return id cart yang baru dibuat
};

/* ================= CART ITEM ================= */

/**
 * Menambahkan item ke cart
 * Jika produk sudah ada → quantity otomatis ditambah (tidak duplicate row)
 */
export const insertItem = async (cart_id, product_id, quantity) => {
  const [result] = await db.execute(
    `
    INSERT INTO cart_items (cart_id, product_id, quantity) 
    VALUES (?,?,?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `,
    [cart_id, product_id, quantity]
  );

  return result;
};

/**
 * Mengecek apakah item tertentu sudah ada di cart
 */
export const findCartItem = async (cart_id, product_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
    [cart_id, product_id]
  );

  return rows[0];
};

/**
 * Menambah quantity item sebanyak +1
 * Hanya bisa jika:
 * - item milik user tersebut
 * - cart masih aktif
 */
export const incrementItem = async (id, user_id) => {
  const [result] = await db.execute(
    `
    UPDATE cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    SET ci.quantity = ci.quantity + 1
    WHERE ci.id = ? 
      AND c.user_id = ? 
      AND c.status = 'active'
    `,
    [id, user_id]
  );

  return result;
};

/**
 * Mengurangi quantity item sebanyak -1
 * Jika quantity sudah 1 → item akan dihapus
 */
export const decrementItem = async (id, user_id) => {
  const [result] = await db.execute(
    `
    UPDATE cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    SET ci.quantity = ci.quantity - 1
    WHERE ci.id = ? 
      AND c.user_id = ? 
      AND c.status = 'active' 
      AND ci.quantity > 1
    `,
    [id, user_id]
  );

  // Jika tidak ada baris yang ter-update → kemungkinan quantity = 1
  if (result.affectedRows === 0) {
    // Hapus item dari cart
    await db.execute("DELETE FROM cart_items WHERE id = ?", [id]);
  }

  return result;
};

/**
 * Ambil semua item dalam cart aktif user
 * Sekalian join dengan data produk
 * + hitung subtotal tiap item
 */
export const getCartAndItems = async (user_id) => {
  const [rows] = await db.execute(
    `
    SELECT
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
    WHERE c.user_id = ? 
      AND c.status = 'active'
    `,
    [user_id]
  );

  return rows;
};

/**
 * Menghapus item dari cart
 * Validasi:
 * - item harus milik user
 * - cart harus aktif
 */
export const deleteItem = async (id, user_id) => {
  const [result] = await db.execute(
    `
    DELETE ci FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    WHERE ci.id = ? 
      AND c.user_id = ? 
      AND c.status = 'active'
    `,
    [id, user_id]
  );

  return result;
};

/* ================= CHECKOUT ================= */

/**
 * Mengubah status cart menjadi "checkout"
 * Biasanya dipanggil saat user klik tombol checkout
 */
export const checkoutCart = async (id, user_id) => {
  const [result] = await db.execute(
    "UPDATE carts SET status = 'checkout' WHERE id = ? AND user_id = ?",
    [id, user_id]
  );

  return result;
};