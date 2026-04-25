const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../middlewares/app.error");

exports.register = async (name, username, password) => {
  const getUsername = await authModel.getUser(username);

  if (username) {
    throw new AppError("Akun sudah terdaftar", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await authModel.createUser(name, username, hashedPassword);

  return data;
};

exports.login = async (username, password) => {
  const user = await authModel.getUser(username);

  if (!user) {
    throw new AppError("Username atau Password salah", 401);
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new AppError("Username atau Password salah", 401);
  }
};
