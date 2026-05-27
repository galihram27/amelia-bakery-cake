import express from "express";

// Import controller (logic untuk tiap endpoint)
import { register, login, dashboard } from "../controllers/auth.controller.js";

// Import middleware untuk autentikasi (cek token)
import { authenticate } from "../middlewares/auth.middleware.js";

// Membuat instance router dari express
const router = express.Router();

/* ================= ROUTES ================= */

/**
 * Endpoint: POST /register
 * Fungsi: Mendaftarkan user baru
 */
router.post("/register", register);

/**
 * Endpoint: POST /login
 * Fungsi: Login user dan mendapatkan token
 */
router.post("/login", login);

/**
 * Endpoint: GET /dashboard
 * Fungsi: Mengakses data dashboard (hanya untuk user yang sudah login)
 * Middleware authenticate akan:
 *   - mengecek token
 *   - jika valid → lanjut ke controller dashboard
 *   - jika tidak → error (unauthorized)
 */

router.get("/me", authenticate, (req, res) => {
  res.json(req.user)
})

// Export router supaya bisa digunakan di index.js
export default router;