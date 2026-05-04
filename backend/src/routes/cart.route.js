import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.use(authenticate);

// Menampilkan keranjang beserta itemnya
router.get("/", cartController.getCart);

// Menambahkan item ke cart
router.post("/items", cartController.addToCart);

// Tambah satu item ketika klik tombol (+) di keranjang (id cart_item)
router.patch("/items/:id/addOne", cartController.addOne);

// Tambah satu item ketika klik tombol (-) di keranjang (id cart_item)
router.patch("/items/:id/subtractOne", cartController.subtractOne);

// Hapus item di cart (id cart_item)
router.delete("/items/:id", cartController.deleteItem);

// Checkout
router.patch("/checkout", cartController.checkout);

export default router;
