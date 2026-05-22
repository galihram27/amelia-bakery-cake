import bcrypt from "bcrypt";
import * as authModel from "../repositories/auth.repository.js";
import AppError from "../middlewares/app.error.js";
import { generateToken } from "../utils/token.js";

/* ================= CONSTANT ================= */

const usernameRegex = /^[A-Za-z][^\s]{3,19}$/;
const passwordRegex = /^(?=.*\d)[A-Za-z][^\s]{7,}$/;
const SALT_ROUNDS = 10;

/* ================= HELPER ================= */

/**
 * Validasi field wajib
 */
const validateRequired = (...fields) => {
  const isEmpty = fields.some((f) => !f?.trim());
  if (isEmpty) throw new AppError("Semua field wajib diisi", 400);
};

/**
 * Format input user
 */
const normalizeInput = (name, username, password, phone, address) => ({
  name: name?.trim(),
  username: username?.trim().toLowerCase(),
  password: password?.trim(),
  phone: phone?.trim(),
  address: address?.trim() || null,
});

/* ================= REGISTER ================= */

export const register = async (name, username, password, phone, address) => {
  // Validasi wajib
  validateRequired(name, username, password, phone);

  const data = normalizeInput(name, username, password, phone, address);

  // Validasi format
  if (!usernameRegex.test(data.username)) {
    throw new AppError("Username tidak valid", 400);
  }

  if (!passwordRegex.test(data.password)) {
    throw new AppError("Password tidak valid", 400);
  }

  // Cek username sudah ada
  const existingUser = await authModel.findUserByUsername(data.username);
  if (existingUser) {
    throw new AppError("Username sudah digunakan", 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  await authModel.createUser(
    data.name,
    data.username,
    hashedPassword,
    data.phone,
    data.address
  );

  return { message: "Register berhasil" };
};

/* ================= LOGIN ================= */

export const login = async (username, password) => {
  validateRequired(username, password);

  username = username.trim().toLowerCase();

  const user = await authModel.findUserByUsername(username);

  if (!user) {
    throw new AppError("Username atau Password salah", 401);
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new AppError("Username atau Password salah", 401);
  }

  // Generate JWT token
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

/* ================= UPDATE PROFILE ================= */

export const updateProfile = async (
  id,
  name,
  username,
  password,
  phone,
  address
) => {
  let fields = [];
  let values = [];

  // Update name
  if (name !== undefined) {
    fields.push("name = ?");
    values.push(name.trim());
  }

  // Update username
  if (username !== undefined) {
    const cleanUsername = username.trim().toLowerCase();

    if (!usernameRegex.test(cleanUsername)) {
      throw new AppError("Username tidak valid", 400);
    }

    fields.push("username = ?");
    values.push(cleanUsername);
  }

  // Update password (HARUS di-hash)
  if (password !== undefined) {
    if (!passwordRegex.test(password)) {
      throw new AppError("Password tidak valid", 400);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    fields.push("password = ?");
    values.push(hashedPassword);
  }

  // Update phone
  if (phone !== undefined) {
    fields.push("phone = ?");
    values.push(phone.trim());
  }

  // Update address
  if (address !== undefined) {
    fields.push("address = ?");
    values.push(address?.trim() || null);
  }

  // Tidak ada yang diupdate
  if (fields.length === 0) {
    throw new AppError("Tidak ada data yang diupdate", 400);
  }

  const result = await authModel.updateUser(fields, values, id);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return { message: "Profile berhasil diupdate" };
};

/* ================= DELETE ACCOUNT ================= */

export const deleteAccount = async (id) => {
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    throw new AppError("ID tidak valid", 400);
  }

  const result = await authModel.deleteUser(parsedId);

  if (result.affectedRows === 0) {
    throw new AppError("Data tidak ditemukan", 404);
  }

  return { message: "Akun berhasil dihapus" };
};