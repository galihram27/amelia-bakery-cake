import { verifyToken } from "../utils/token.js";
import AppError from "./app.error.js";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // cek header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Akes ditolak, token tidak ditemukan", 401);
    }

    // ambil token
    const token = authHeader.split(" ")[1];
    console.log("TOKEN DARI FRONTEND:", token);

    // verifikasi token
    const decoded = verifyToken(token);

    // simpan user ke request
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    next(err);
  }
};
