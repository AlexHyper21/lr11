const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const Review = require('../models/Review');

async function getReviews(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Некорректный идентификатор товара' });
    }
    const reviews = await Review.find({ product: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}

async function createReview(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Ошибка валидации',
      errors: errors.array().map((e) => e.msg),
    });
  }
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Некорректный идентификатор товара' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    const { author, rating, text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Ошибка валидации', errors: ['Отзыв не содержит текста'] });
    }
    const review = await Review.create({ product: product._id, author, rating, text });
    res.status(201).json(review);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        message: 'Ошибка валидации',
        errors: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}

module.exports = { getReviews, createReview };
