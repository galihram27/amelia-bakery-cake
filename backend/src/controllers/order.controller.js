import * as orderService from "../services/order.service.js";
import asyncHandler from "../middlewares/async.handler.js";

// Proses checkout - membuat order dari cart dan menghitung total harga
export const checkout = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { cart_id } = req.body;

  const result = await orderService.checkout(userId, cart_id);

  res.json({
    success: true,
    message: result.message,
    data: result.order,
  });
});

// Mengambil detail order
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const orderDetails = await orderService.getOrder(id);

  res.json({
    success: true,
    data: orderDetails,
  });
});

// Mengambil semua order user yang sudah login
export const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await orderService.getUserOrders(userId);

  res.json({
    success: true,
    data: orders,
  });
});
