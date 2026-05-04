import * as productService from "../services/product.service.js";
import asyncHandler from "../middlewares/async.handler.js";

// Menampilkan produk
export const getProduct = asyncHandler(async (req, res, next) => {
  const { key_word } = req.query;

  const products = await productService.getProduct(key_word);

  res.json(products);
});

// Tambah produk baru
export const addNewProduct = asyncHandler(async (req, res, next) => {
  const { name, price, stock = 0, image = "default.png" } = req.body;

  await productService.addNewProduct(name, price, stock, image);

  res.json({ message: "Produk berhasil ditambahkan" });
});

// Tambah stok
export const addStock = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;

  await productService.addStock(amount, id);

  res.json({ message: "Stok berhasil ditambah" });
});

// Kurangi stok
export const reduceStock = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;

  await productService.reduceStock(amount, id);

  res.json({ message: "Stok berhasil dikurang" });
});

// Update produk
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, image } = req.body;

  await productService.updateProduct(
    id,
    name,
    price,
    stock,
    image,
  );

  res.json({ message: "Produk berhasil diupdate" });
});

// Hapus produk
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await productService.deleteProduct(id);

  res.json({ message: "Produk berhasil dihapus" });
});
