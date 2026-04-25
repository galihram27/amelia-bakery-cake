const productController = require("../controllers/product.controller");
const express = require("express");
const router = express.Router();

// Menampilkan produk
router.get("/products", productController.getProduct);

// Tambah produk
router.post("/products", productController.addNewProduct);

// Update stok
router.patch("/products/:id/stock", productController.updateStock);

// Update produk
router.patch("/products/:id", productController.updateProduct);

// Hapus produk
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
