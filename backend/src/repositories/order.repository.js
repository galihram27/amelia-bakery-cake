/*
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
*/

import db from "../config/db.js";

// Membuat pesanan baru
export const createOrder = async (userId, totalAmount) => {
  const [result] = await db.execute(
    "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
    [userId, totalAmount],
  );
  const orderId = result.insertId;
  return orderId;
};

// Menambahkan item ke pesanan
export const addOrderItem = async (orderId, productId, quantity, price) => {
  const [result] = await db.execute(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
    [orderId, productId, quantity, price],
  );
  return result;
};

// Mengambil detail pesanan beserta itemnya
export const getOrderDetails = async (orderId) => {
  const [order] = await db.execute("SELECT * FROM orders WHERE id = ?", [
    orderId,
  ]);

  const [items] = await db.execute(
    "SELECT * FROM order_items WHERE order_id = ?",
    [orderId],
  );

  return { order: order[0], items };
};

// Mengambil semua pesanan user
export const getUserOrders = async (userId) => {
  const [orders] = await db.execute(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC",
    [userId],
  );
  return orders;
};
