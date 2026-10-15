import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/cartSlice';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import starIcon from '../../assets/star.svg';
import starEmptyIcon from '../../assets/star-empty.svg';

export default function ProductCard({ product, onQuickView }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.inStock !== false;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const stars = [1, 2, 3, 4, 5].map((n) => n <= Math.round(product.rating || 0));
  const titleId = `product-title-${product.id}`;

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <Card as="article" aria-labelledby={titleId} className="h-100 border shadow-sm overflow-hidden" data-testid="product-card">
      <div className="position-relative bg-body-tertiary">
        <Card.Img variant="top" src={product.imageUrl} alt={`Превью товара «${product.name}»`} className="object-fit-cover rounded-0" />
        {discount > 0 && (
          <Badge bg="" className="text-bg-accent position-absolute top-0 start-0 m-2">
            <span className="visually-hidden">Скидка </span>−{discount} %
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column gap-2">
        {product.formats && (
          <ul className="list-unstyled d-flex gap-1 mb-0" aria-label="Форматы файлов">
            {product.formats.map((format) => (
              <li key={format}>
                <Badge bg="light" text="secondary" className="border">{format}</Badge>
              </li>
            ))}
          </ul>
        )}
        <Card.Title as="h2" id={titleId} className="fs-6 fw-semibold mb-0">
          <Link to={`/products/${product.id}`} className="link-dark">{product.name}</Link>
        </Card.Title>
        {product.seller && (
          <Card.Subtitle as="p" className="small text-secondary fw-normal mb-0">{product.seller}</Card.Subtitle>
        )}
        {product.rating > 0 && (
          <Stack direction="horizontal" gap={1} className="small text-secondary">
            <span className="d-flex gap-1" aria-hidden="true">
              {stars.map((filled, i) => (
                <img key={i} src={filled ? starIcon : starEmptyIcon} alt="" width="14" height="14" />
              ))}
            </span>
            <span className="ms-1">
              <span className="visually-hidden">Рейтинг </span>
              {product.rating} · {product.reviews} отзывов
            </span>
          </Stack>
        )}
        <p className="d-flex gap-2 align-items-baseline mt-auto mb-0">
          <span className="fs-4 fw-bold" data-testid="product-price">
            <span className="visually-hidden">Цена: </span>
            {product.price} BYN
          </span>
          {product.oldPrice && (
            <del className="text-secondary">
              <span className="visually-hidden">Старая цена: </span>
              {product.oldPrice} BYN
            </del>
          )}
        </p>
        <Stack direction="horizontal" gap={2}>
          <QuantitySelector onChange={setQuantity} disabled={!inStock} />
          <Button variant="primary" className="flex-grow-1 fw-semibold" onClick={handleAdd} disabled={!inStock}>
            {inStock ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </Stack>
        {onQuickView && (
          <Button variant="link" className="p-0 text-body" aria-haspopup="dialog" onClick={() => onQuickView(product)}>
            Быстрый просмотр<span className="visually-hidden">: {product.name}</span>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    seller: PropTypes.string,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    formats: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
    inStock: PropTypes.bool,
  }).isRequired,
  onQuickView: PropTypes.func,
};
