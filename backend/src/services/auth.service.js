import bcrypt from "bcrypt";
import * as authModel from "../repositories/auth.repository.js";
import AppError from "../middlewares/app.error.js";
import { generateToken } from "../utils/token.js";

const usernameRegex = /^[A-Za-z][^\s]{3,19}$/;
const passwordRegex = /^(?=.*\d)[A-Za-z][^\s]{7,}$/;

const SALT_ROUNDS = 10;

// ========== REGISTER ==========
export const register = async (name, username, password, phone, address) => {
  // Validasi
  if (
    !name?.trim() ||
    !username?.trim() ||
    !password?.trim() ||
    !phone?.trim()
  ) {
    throw new AppError("Semua field wajib diisi", 400);
  }

  name = name.trim();
  username = username.trim().toLowerCase();
  password = password.trim();
  phone = phone.trim();
  address = address?.trim() || null;

  if (!usernameRegex.test(username)) {
    throw new AppError("Username tidak valid", 400);
  }

  if (!passwordRegex.test(password)) {
    throw new AppError("Password tidak valid", 400);
  }

  // Mengecek apakah akun sudah ada
  const existingUser = await authModel.findUserByUsername(username);

  if (existingUser) {
    throw new AppError("Username sudah digunakan", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await authModel.createUser(name, username, hashedPassword, phone, address);

  return {
    message: "Register berhasil",
  };
};

// ========== LOGIN ==========
export const login = async (username, password) => {
  // validasi
  if (!username?.trim() || !password?.trim()) {
    throw new AppError("Username dan password wajib diisi", 400);
  }

  username = username.trim().toLowerCase();

  const user = await authModel.findUserByUsername(username);

  if (!user) {
    throw new AppError("Username atau Password salah", 401);
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new AppError("Username atau Password salah", 401);
  }

  const token = await generateToken({
    id: user.id,
    username: user.username,
    role: user.role,
  });

  return {
    message: "Login berhasil",
    token,
  };
};

// Update Profile
export const updateProfile = async (
  name,
  username,
  password,
  phone,
  address,
) => {
  let fields = [];
  let values = [];

  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name);
  }

  if (username !== undefined) {
    fields.push("username = ?");
    values.push(username);
  }

  if (password !== undefined) {
    fields.push("password = ?");
    values.push(password);
  }

  if (phone !== undefined) {
    fields.push("phone = ?");
    values.push(phone);
  }

  if (address !== undefined) {
    fields.push("address = ?");
    values.push(address);
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

  const result = await authModel.updateUser(fields, values, id);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};

// Hapus Akun
export const deleteAccount = async (id) => {
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    throw new AppError("ID tidak valid", 400);
  }

  const result = await authModel.deleteUser(id);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return result;
};
