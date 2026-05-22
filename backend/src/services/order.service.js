import * as orderRepository from "../repositories/order.repository.js";
import * as cartRepository from "../repositories/cart.repository.js";
import AppError from "../middlewares/app.error.js";

// Menghitung total harga dari item di cart
const calculateTotalAmount = (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    throw new AppError("Keranjang kosong", 400);
  }

  let totalAmount = 0;
  for (const item of cartItems) {
    totalAmount += item.price * item.quantity;
  }

  return parseFloat(totalAmount.toFixed(2));
};

// Proses checkout - create order dan order items dari cart
export const checkout = async (userId, cartId) => {
  const parsedUserId = Number(userId);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  // Ambil semua item di cart beserta detail produknya
  const cartItems = await cartRepository.getCartAndItems(parsedUserId);

  if (!cartItems || cartItems.length === 0) {
    throw new AppError("Keranjang kosong, tidak bisa checkout", 400);
  }

  // Validasi bahwa cart_id sesuai dengan request
  if (cartItems[0].cart_id !== Number(cartId)) {
    throw new AppError("Cart tidak valid", 400);
  }

  // Hitung total harga
  const totalAmount = calculateTotalAmount(cartItems);

  // Buat order baru
  const orderId = await orderRepository.createOrder(parsedUserId, totalAmount);

  // Tambahkan semua cart items ke order_items
  for (const item of cartItems) {
    await orderRepository.addOrderItem(
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    );
  }

  // Update cart status menjadi 'checkout'
  await cartRepository.checkoutCart(cartId, parsedUserId);

  // Return order detail
  const orderDetails = await orderRepository.getOrderDetails(orderId);

  return {
    message: "Checkout berhasil",
    order: {
      id: orderDetails.order.id,
      user_id: orderDetails.order.user_id,
      order_date: orderDetails.order.order_date,
      total_amount: orderDetails.order.total_amount,
      items: orderDetails.items,
    },
  };
};

// Mengambil detail order
export const getOrder = async (orderId) => {
  const parsedOrderId = Number(orderId);

  if (!Number.isInteger(parsedOrderId) || parsedOrderId <= 0) {
    throw new AppError("ID order tidak valid", 400);
  }

  const orderDetails = await orderRepository.getOrderDetails(parsedOrderId);

  if (!orderDetails.order) {
    throw new AppError("Order tidak ditemukan", 404);
  }

  return orderDetails;
};

// Mengambil semua order user
export const getUserOrders = async (userId) => {
  const parsedUserId = Number(userId);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    throw new AppError("ID tidak valid", 400);
  }

  const orders = await orderRepository.getUserOrders(parsedUserId);

  return orders;
};
