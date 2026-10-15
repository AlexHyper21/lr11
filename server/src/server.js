require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { securityHeaders, isSecurityEnabled } = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 5000;
const clientDist = path.resolve(__dirname, '../../client/dist');

app.disable('x-powered-by');
app.use(securityHeaders());
app.use(express.json({ limit: '10kb' }));

app.use('/api/products/:id/reviews', reviewRoutes);
app.use('/api/products', productRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Некорректный JSON в теле запроса' });
  }
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
      console.log(`Security: ${isSecurityEnabled() ? 'ON (sanitize + Helmet + CSP)' : 'OFF'}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

start();
