const productModel = require("../models/product.model");
const AppError = require("../middlewares/app.error");

// Menampilkan produk
exports.getProduct = async (key_word) => {
  const data = await productModel.getProduct(key_word);

  return data;
};

// Tambah produk baru
exports.addNewProduct = async (name, description, price, stock, image) => {
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
    description,
    price,
    stock,
    image,
  );

  if (data.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return data;
};

// Update stok
exports.updateStock = async (amount, id) => {
  const parsedId = Number(id);
  const parsedAmount = Number(amount);

  if (isNaN(parsedId)) {
    throw new AppError("ID tidak valid", 400);
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new AppError("Jumlah harus angka > 0", 400);
  }

  let result;

  if (parsedAmount > 0) {
    result = await productModel.addStock(parsedAmount, parsedId);
  } else {
    result = await productModel.reduceStock(Math.abs(parsedAmount), parsedId);
  }

  if (data.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};

// Update produk
exports.updateProduct = async (id, name, description, price, stock, image) => {
  let fields = [];
  let values = [];

  const parsedPrice = Number(price);
  const parsedStock = Number(stock);

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }

  if (description !== undefined) {
    fields.push("description = ?");
    values.push(description);
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
exports.deleteProduct = async (id) => {
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
