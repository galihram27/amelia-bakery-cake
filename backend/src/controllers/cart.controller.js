import * as cartService from "../services/cart.service.js";
import asyncHandler from "../middlewares/async.handler.js";

// Membuat cart secara otomatis ketika user klik tombol keranjang atau menambahkan item ke cart
export const createCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  const result = await cartService.createCart(user_id);

  res.json({
    message: "Cart berhasil dibuat",
    data: result,
  });
});

// Menambahkan item ke cart
export const addToCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity } = req.body;

  await cartService.addToCart(user_id, product_id, quantity);

  res.json({ message: "Item berhasil ditambahkan ke cart" });
});

// Tambah satu item ketika klik tombol (+) di keranjang
export const addOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  await cartService.addOne(id, user_id);

  res.json({
    message: "Item berhasil ditambah 1",
  });
});

// Tambah satu item ketika klik tombol (-) di keranjang
export const subtractOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  await cartService.subtractOne(id, user_id);

  res.json({
    message: "Item berhasil dikurang 1",
  });
});

// Menampilkan cart beserta cart item ketika user klik tombol keranjang
export const getCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  const cartItems = await cartService.getCart(user_id);

  res.json(cartItems);
});

// Hapus item di cart
export const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const result = await cartService.deleteItem(id, user_id);

  res.json({ message: "Item berhasil dihapus" });
});

// Checkout
export const checkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const result = await cartService.checkout(id, user_id);

  res.json({ message: "Berhasil checkout" });
});
