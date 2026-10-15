const express = require('express');
const { body } = require('express-validator');
const { getReviews, createReview } = require('../controllers/reviewController');
const { cleanHtml, cleanText } = require('../middleware/security');

const router = express.Router({ mergeParams: true });

const reviewValidation = [
  body('author')
    .isString().withMessage('Имя должно быть строкой')
    .customSanitizer(cleanText)
    .trim()
    .isLength({ min: 2, max: 60 }).withMessage('Имя — от 2 до 60 символов'),
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Оценка — целое число от 1 до 5')
    .toInt(),
  body('text')
    .isString().withMessage('Текст отзыва должен быть строкой')
    .isLength({ min: 3, max: 1000 }).withMessage('Отзыв — от 3 до 1000 символов')
    .customSanitizer(cleanHtml),
];

router.get('/', getReviews);
router.post('/', reviewValidation, createReview);

module.exports = router;
