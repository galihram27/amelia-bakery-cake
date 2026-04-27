import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/role.middleware.js";
import * as productController from "../controllers/product.controller.js";

const router = express.Router();

// Menampilkan produk
router.get("/", productController.getProduct);

// Admin only
router.use(authenticate);
router.use(authorizeRoles("admin"));

router.post("/", productController.addNewProduct); // Tambah produk
router.patch("/:id/stock/add", productController.addStock); // Tambah stok
router.patch("/:id/stock/reduce", productController.reduceStock); // Kurangi stok
router.patch("/:id", productController.updateProduct); // Update produk
router.delete("/:id", productController.deleteProduct); // Hapus produk

export default router;
