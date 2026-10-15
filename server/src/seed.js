require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'Набор иконок «Контур» · 640 штук', price: 29, imageUrl: '/images/product-1.webp' },
  { name: 'Шрифт «Гротеск Норд» · 4 начертания', price: 59, imageUrl: '/images/product-2.webp' },
  { name: 'UI-кит «Пульт» для дашбордов', price: 89, imageUrl: '/images/product-3.webp' },
  { name: 'Мокапы смартфонов · 24 сцены', price: 35, imageUrl: '/images/product-4.webp' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Добавлено товаров: ${products.length}`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
