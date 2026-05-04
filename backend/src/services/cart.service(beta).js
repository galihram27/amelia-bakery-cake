import * as cartModel from "../repositories/cart.repository.js";
import AppError from "../middlewares/app.error.js";

// Menampilkan cart
export const getCart = async (user_id) => {
  const cart = await cartModel.getCart(user_id);

  return cart;
};

// Tambah item ke cart
export const addToCart = async (user_id, product_id, quantity) => {
  const parsedUserId = Number(user_id);
  const parsedProductId = Number(product_id);
  const parsedQuantity = Number(quantity);

  if (isNaN(parsedUserId)) {
    throw new AppError("User ID tidak valid", 400);
  }

  if (isNaN(parsedProductId)) {
    throw new AppError("Product ID tidak valid", 400);
  }

  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    throw new AppError("Quantity harus angka > 0", 400);
  }

  const result = await cartModel.addToCart(
    parsedUserId,
    parsedProductId,
    parsedQuantity,
  );

  if (result.affectedRows === 0) {
    throw new AppError("Gagal menambah item ke cart", 500);
  }

  return result;
};

// Update quantity cart
export const updateCart = async (id, quantity) => {
  const parsedId = Number(id);
  const parsedQuantity = Number(quantity);

  if (isNaN(parsedId)) {
    throw new AppError("Cart ID tidak valid", 400);
  }

  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    throw new AppError("Quantity harus angka > 0", 400);
  }

  const result = await cartModel.updateCart(parsedId, parsedQuantity);

  if (result.affectedRows === 0) {
    throw new AppError("Item cart tidak ditemukan", 404);
  }

  return result;
};

// Hapus item dari cart
export const removeFromCart = async (id) => {
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    throw new AppError("Cart ID tidak valid", 400);
  }

  const result = await cartModel.removeFromCart(parsedId);

  if (result.affectedRows === 0) {
    throw new AppError("Item cart tidak ditemukan", 404);
  }

  return result;
};

// Kosongkan cart
export const clearCart = async (user_id) => {
  const parsedUserId = Number(user_id);

  if (isNaN(parsedUserId)) {
    throw new AppError("User ID tidak valid", 400);
  }

  const result = await cartModel.clearCart(parsedUserId);

  return result;
};
