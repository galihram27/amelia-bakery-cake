import express from "express";
import { register, login, dashboard } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", authenticate, dashboard);

export default router;