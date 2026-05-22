import express from "express";
import authRouter from "./auth.route.js";
import productRouter from "./product.route.js";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";

const router = express.Router();

// Grup router
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/orders", orderRouter);

export default router;
