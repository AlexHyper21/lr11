const mongoose = require('mongoose');
const Product = require('../models/Product');

function handleError(res, error) {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Ошибка валидации', errors });
  }
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: `Некорректное значение поля ${error.path}` });
  }
  return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: error.message });
}

async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error);
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, imageUrl } = req.body;
    const product = await Product.create({ name, price, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    handleError(res, error);
  }
}

async function updateProduct(req, res) {
  try {
    const { name, price, imageUrl } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, imageUrl },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(200).json({ message: 'Товар удалён', id: product._id });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
