import * as productModel from "../models/product.model.js";
import AppError from "../middlewares/app.error.js";

// Menampilkan produk
export const getProduct = async (key_word) => {
  const data = await productModel.getProduct(key_word);

  return data;
};

// Tambah produk baru
export const addNewProduct = async (name, price, stock, image) => {
  if (!name) {
    throw new AppError("Nama produk wajib diisi", 400);
  }

  if (typeof price !== "number" || price <= 0) {
    throw new AppError("Harga harus angka > 0", 400);
  }

  if (typeof stock !== "number" || stock < 0) {
    throw new AppError("Stock tidak valid", 400);
  }

  const data = await productModel.addNewProduct(
    name,
    price,
    stock,
    image,
  );

  if (data.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return data;
};

// Tambah stok
export const addStock = async (amount, id) => {
  const parsedId = Number(id);
  const parsedAmount = Number(amount);

  if (isNaN(parsedId)) {
    throw new AppError("ID tidak valid", 400);
  }

  if (isNaN(parsedAmount) || parsedAmount === 0) {
    throw new AppError("Jumlah tidak valid", 400);
  }

  const result = await productModel.addStock(parsedAmount, parsedId);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};

// Kurangi stok
export const reduceStock = async (amount, id) => {
  const parsedId = Number(id);
  const parsedAmount = Number(amount);

  if (isNaN(parsedId)) {
    throw new AppError("ID tidak valid", 400);
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new AppError("Jumlah tidak valid", 400);
  }

  const result = await productModel.reduceStock(parsedAmount, parsedId);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};

// Update produk
export const updateProduct = async (id, name, price, stock, image) => {
  let fields = [];
  let values = [];

  const parsedPrice = Number(price);
  const parsedStock = Number(stock);

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }

  if (parsedPrice !== undefined) {
    fields.push("price = ?");
    values.push(parsedPrice);
  }

  if (parsedStock !== undefined) {
    fields.push("stock = ?");
    values.push(parsedStock);
  }

  if (image !== undefined) {
    fields.push("image = ?");
    values.push(image);
  }

  if (fields.length === 0) {
    throw new AppError("Tidak ada data yang diupdate", 400);
  }

  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    throw new AppError("Harga harus angka > 0", 400);
  }

  if (isNaN(parsedStock) || parsedStock < 0) {
    throw new AppError("Stock tidak valid", 400);
  }

  const data = await productModel.updateProduct(fields, values, id);

  if (data.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return data;
};

// Hapus produk
export const deleteProduct = async (id) => {
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    throw new AppError("ID tidak valid", 400);
  }

  const data = await productModel.deleteProduct(parsedId);

  if (data.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return data;
};
