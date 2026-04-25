const productService = require("../services/product.service");
const asyncHandler = require("../middlewares/async.handler");

// Menampilkan produk
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { key_word } = req.query;

  const data = await productService.getProduct(key_word);

  res.json(data);
});

// Tambah produk baru
exports.addNewProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description = null,
    price,
    stock = 0,
    image = "default.png",
  } = req.body;

  await productService.addNewProduct(name, description, price, stock, image);

  res.json({ message: "Produk berhasil ditambahkan" });
});

// Update stok
exports.updateStock = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;

  await productService.updateStock(amount, id);

  res.json({ message: "Stok berhasil diupdate" });
});

// Update produk
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, stock, image } = req.body;

  await productService.updateProduct(
    id,
    name,
    description,
    price,
    stock,
    image,
  );

  res.json({ message: "Produk berhasil diupdate" });
});

// Hapus produk
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await productService.deleteProduct(id);

  res.json({ message: "Produk berhasil dihapus" });
});
