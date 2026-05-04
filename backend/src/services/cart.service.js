import * as cartRepository from "../repositories/cart.repository.js";
import AppError from "../middlewares/app.error.js";

// Membuat cart secara otomatis ketika user klik tombol keranjang atau menambahkan item ke cart
export const createCart = async (user_id) => {
  const parsedUserId = Number(user_id);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  const cartId = await cartRepository.createCart(parsedUserId);

  if (!cartId) {
    throw new AppError("Gagal membuat cart", 404);
  }

  return cartId;
};

// Menampilkan cart yang aktif
export const getActiveCart = async (user_id) => {
  const parsedUserId = Number(user_id);
  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  const cart = await cartRepository.getActiveCart(parsedUserId);

  return cart;
};

// Menambahkan item ke cart atau otomatis membuat cart jika belum ada
// ketika user klik tombol tambah ke keranjang
export const addToCart = async (user_id, product_id, quantity) => {
  const parsedUserId = Number(user_id);
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
    throw new AppError("Quantity tidak valid", 400);
  }

  // Cari cart aktif
  let cart = await cartRepository.getActiveCart(parsedUserId);

  // Jika tidak ada cart aktif, buat cart baru
  if (!cart) {
    const cartId = await cartRepository.createCart(parsedUserId);
    cart = { id: cartId };
  }

  // Insert item ke cart
  const result = await cartRepository.insertItem(
    cart.id,
    product_id,
    parsedQuantity,
  );

  return result;
};

// Tambah satu item ketika klik tombol (+) di keranjang
export const addOne = async (id, user_id) => {
  const parsedId = Number(id);
  const parsedUserId = Number(user_id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID pengguna tidak valid", 400);
  }

  const result = await cartRepository.incrementItem(parsedId, parsedUserId);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};

// Kurang satu item ketika klik tombol (-) di keranjang
export const subtractOne = async (id, user_id) => {
  const parsedId = Number(id);
  const parsedUserId = Number(user_id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID pengguna tidak valid", 400);
  }

  const result = await cartRepository.decrementItem(parsedId, parsedUserId);

  return result;
};

// Menampilkan cart beserta cart item ketika user klik tombol keranjang
export const getCart = async (user_id) => {
  const parsedUserId = Number(user_id);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  const cartItems = await cartRepository.getCartAndItems(parsedUserId);

  return cartItems;
};

// Hapus item di cart
export const deleteItem = async (id, user_id) => {
  const parsedId = Number(id);
  const parsedUserId = Number(user_id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID pengguna tidak valid", 400);
  }

  const result = await cartRepository.deleteItem(parsedId, parsedUserId);

  return result;
};

// Checkout
export const checkout = async (id, user_id) => {
  const parsedId = Number(id);
  const parsedUserId = Number(user_id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID pengguna tidak valid", 400);
  }

  const result = await cartRepository.checkoutCart(parsedId, parsedUserId);

  return result;
};
