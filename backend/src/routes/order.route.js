import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as orderController from "../controllers/order.controller.js";

const router = express.Router();

router.use(authenticate);

// Proses checkout - membuat order dari cart dan menghitung total harga
router.post("/checkout", orderController.checkout);

// Mengambil detail order berdasarkan order id
router.get("/:id", orderController.getOrder);

// Mengambil semua order milik user yang sudah login
router.get("/", orderController.getUserOrders);

export default router;
