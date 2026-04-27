import bcrypt from "bcrypt";
import { findUserByUsername, createUser } from "../models/auth.model.js";
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
  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    throw new AppError("Username sudah digunakan", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await createUser(name, username, hashedPassword, phone, address);

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

  const user = await findUserByUsername(username);

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
