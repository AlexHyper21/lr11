import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/catalog" replace />} />
      </Routes>
    </>
  );
}
