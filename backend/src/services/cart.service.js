import * as cartRepository from "../repositories/cart.repository.js";
import AppError from "../middlewares/app.error.js";

/* ================= HELPER ================= */

/**
 * Validasi ID:
 * - Harus berupa angka
 * - Harus bilangan bulat (integer)
 * - Harus lebih dari 0
 * 
 * Digunakan untuk:
 * - user_id
 * - product_id
 * - cart_id
 * - cart_item_id
 */
const validateId = (value, field = "ID") => {
  const parsed = Number(value);

  // Jika bukan angka valid / <= 0 → error
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`${field} tidak valid`, 400);
  }

  return parsed;
};

/**
 * Validasi quantity:
 * - Harus angka
 * - Harus integer
 * - Harus lebih dari 0 (tidak boleh 0 atau negatif)
 */
const validateQuantity = (value) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("Quantity tidak valid", 400);
  }

  return parsed;
};

/* ================= SERVICE ================= */

/**
 * Membuat cart baru untuk user
 * Biasanya dipanggil jika:
 * - user belum punya cart aktif
 * - atau saat pertama kali menambahkan item
 */
export const createCart = async (user_id) => {
  const userId = validateId(user_id);

  const cartId = await cartRepository.createCart(userId);

  // Jika gagal insert (tidak ada ID kembali)
  if (!cartId) {
    throw new AppError("Gagal membuat cart", 404);
  }

  return cartId;
};

/**
 * Mengambil cart yang sedang aktif milik user
 * 
 * Note:
 * - 1 user biasanya hanya punya 1 cart aktif
 * - jika tidak ada → return undefined
 */
export const getActiveCart = async (user_id) => {
  const userId = validateId(user_id);

  return await cartRepository.getActiveCart(userId);
};

/**
 * Menambahkan item ke cart
 * Flow:
 * 1. Validasi input
 * 2. Cek apakah user punya cart aktif
 * 3. Jika belum → buat cart baru
 * 4. Insert item ke cart
 */
export const addToCart = async (user_id, product_id, quantity) => {
  const userId = validateId(user_id);
  const productId = validateId(product_id, "Product ID");
  const qty = validateQuantity(quantity);

  // Ambil cart aktif
  let cart = await cartRepository.getActiveCart(userId);

  // Jika belum ada cart → buat baru
  if (!cart) {
    const cartId = await cartRepository.createCart(userId);
    cart = { id: cartId };
  }

  // Tambahkan item (atau tambah quantity jika sudah ada)
  return await cartRepository.insertItem(cart.id, productId, qty);
};

/**
 * Menambah quantity item (+1)
 * 
 * Digunakan saat user klik tombol "+"
 * Validasi:
 * - item harus milik user
 * - cart harus aktif
 */
export const addOne = async (id, user_id) => {
  const itemId = validateId(id);
  const userId = validateId(user_id, "ID pengguna");

  const result = await cartRepository.incrementItem(itemId, userId);

  // Jika tidak ada data ter-update → item tidak ditemukan / bukan milik user
  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};

/**
 * Mengurangi quantity item (-1)
 * 
 * Digunakan saat user klik tombol "-"
 * 
 * Note:
 * - Jika quantity = 1 → item akan dihapus (logic di repository)
 */
export const subtractOne = async (id, user_id) => {
  const itemId = validateId(id);
  const userId = validateId(user_id, "ID pengguna");

  return await cartRepository.decrementItem(itemId, userId);
};

/**
 * Mengambil semua item dalam cart aktif user
 * 
 * Biasanya digunakan saat:
 * - user membuka halaman cart
 * 
 * Data yang didapat:
 * - produk
 * - quantity
 * - subtotal
 */
export const getCart = async (user_id) => {
  const userId = validateId(user_id);

  return await cartRepository.getCartAndItems(userId);
};

/**
 * Menghapus item dari cart
 * 
 * Validasi:
 * - item harus milik user
 * - cart harus aktif
 */
export const deleteItem = async (id, user_id) => {
  const itemId = validateId(id);
  const userId = validateId(user_id, "ID pengguna");

  return await cartRepository.deleteItem(itemId, userId);
};

/**
 * Checkout cart
 * 
 * Flow:
 * - Mengubah status cart → "checkout"
 * - Setelah ini biasanya akan lanjut ke:
 *   → order
 *   → pembayaran
 */
export const checkout = async (id, user_id) => {
  const cartId = validateId(id);
  const userId = validateId(user_id, "ID pengguna");

  return await cartRepository.checkoutCart(cartId, userId);
};