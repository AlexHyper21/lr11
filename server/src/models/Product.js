const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле name обязательно'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Поле price обязательно'],
      min: [0, 'Цена не может быть отрицательной'],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Product', productSchema);
