import * as productModel from "../repositories/product.repository.js";
import AppError from "../middlewares/app.error.js";

/* ================= HELPER ================= */

/**
 * Convert value ke number
 */
const toNumber = (value) => Number(value);

/**
 * Validasi ID (harus angka)
 */
const validateId = (id) => {
  const parsed = toNumber(id);

  if (isNaN(parsed)) {
    throw new AppError("ID tidak valid", 400);
  }

  return parsed;
};

/**
 * Validasi harga (harus angka > 0)
 */
const validatePrice = (price) => {
  const parsed = toNumber(price);

  if (isNaN(parsed) || parsed <= 0) {
    throw new AppError("Harga harus angka > 0", 400);
  }

  return parsed;
};

/**
 * Validasi stock (tidak boleh negatif)
 */
const validateStock = (stock) => {
  const parsed = toNumber(stock);

  if (isNaN(parsed) || parsed < 0) {
    throw new AppError("Stock tidak valid", 400);
  }

  return parsed;
};

/**
 * Cek apakah query database berhasil (affectedRows > 0)
 */
const checkAffectedRows = (result) => {
  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }
};

/* ================= SERVICES ================= */

/**
 * Ambil data produk (bisa dengan keyword search)
 */
export const getProduct = async (keyword) => {
  return await productModel.getProduct(keyword);
};

/**
 * Tambah produk baru
 */
export const addNewProduct = async (name, price, stock, image) => {
  // Validasi nama wajib diisi
  if (!name) {
    throw new AppError("Nama produk wajib diisi", 400);
  }

  // Validasi harga & stock
  const validPrice = validatePrice(price);
  const validStock = validateStock(stock);

  // Insert ke database
  const result = await productModel.addNewProduct(
    name,
    validPrice,
    validStock,
    image
  );

  // Cek apakah insert berhasil
  checkAffectedRows(result);

  return result;
};

/**
 * Menambah stock produk
 */
export const addStock = async (amount, id) => {
  const validId = validateId(id);
  const validAmount = toNumber(amount);

  // Validasi jumlah tidak boleh 0 / bukan angka
  if (isNaN(validAmount) || validAmount === 0) {
    throw new AppError("Jumlah tidak valid", 400);
  }

  const result = await productModel.addStock(validAmount, validId);

  checkAffectedRows(result);

  return result;
};

/**
 * Mengurangi stock produk
 */
export const reduceStock = async (amount, id) => {
  const validId = validateId(id);
  const validAmount = toNumber(amount);

  // Validasi jumlah harus > 0
  if (isNaN(validAmount) || validAmount <= 0) {
    throw new AppError("Jumlah tidak valid", 400);
  }

  const result = await productModel.reduceStock(validAmount, validId);

  checkAffectedRows(result);

  return result;
};

/**
 * Update data produk (partial update)
 * hanya field yang dikirim yang akan diupdate
 */
export const updateProduct = async (id, name, price, stock, image) => {
  const validId = validateId(id);

  let fields = []; // untuk query SET
  let values = []; // untuk value query

  // Cek field mana saja yang ingin diupdate

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }

  if (price !== undefined) {
    const validPrice = validatePrice(price);
    fields.push("price = ?");
    values.push(validPrice);
  }

  if (stock !== undefined) {
    const validStock = validateStock(stock);
    fields.push("stock = ?");
    values.push(validStock);
  }

  if (image !== undefined) {
    fields.push("image = ?");
    values.push(image);
  }

  // Jika tidak ada field yang diupdate
  if (fields.length === 0) {
    throw new AppError("Tidak ada data yang diupdate", 400);
  }

  // Jalankan update
  const result = await productModel.updateProduct(fields, values, validId);

  checkAffectedRows(result);

  return result;
};

/**
 * Hapus produk berdasarkan ID
 */
export const deleteProduct = async (id) => {
  const validId = validateId(id);

  const result = await productModel.deleteProduct(validId);

  checkAffectedRows(result);

  return result;
};