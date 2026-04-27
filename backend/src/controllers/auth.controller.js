import {
  register as registerService,
  login as loginService,
} from "../services/auth.service.js";
import asyncHandler from "../middlewares/async.handler.js";

// ========== REGISTER ==========
export const register = asyncHandler(async (req, res) => {
  const { name, username, password, phone, address } = req.body;

  const result = await registerService(name, username, password, phone, address);

  res.json(result);
});

// ========== LOGIN ==========
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await loginService(username, password);

  res.json(result);
});

// ========== DASHBOARD ==========
export const dashboard = (req, res) => {
  res.json({
    message: "Welcome to Dashboard",
  });
};
