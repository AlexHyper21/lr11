import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Stack from 'react-bootstrap/Stack';
import Dialog from '../Dialog/Dialog';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import { addToCart } from '../../store/cartSlice';

export default function QuickViewModal({ product, onClose }) {
  const dispatch = useDispatch();
  const closeRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const titleId = `quick-view-title-${product.id}`;
  const descId = `quick-view-desc-${product.id}`;

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
  };

  return (
    <Dialog labelledBy={titleId} describedBy={descId} onClose={onClose} initialFocusRef={closeRef}>
      <CloseButton ref={closeRef} className="dialog__close" aria-label="Закрыть быстрый просмотр" onClick={onClose} />
      <Row className="g-4 align-items-center">
        <Col md={6}>
          <img src={product.imageUrl} alt={`Превью товара «${product.name}»`} className="img-fluid rounded-3 border w-100" />
        </Col>
        <Col md={6}>
          <Stack gap={3}>
            <h2 id={titleId} className="h4 fw-bold mb-0 pe-4">{product.name}</h2>
            <p id={descId} className="mb-0 text-secondary">
              Цифровой товар. Ссылка на скачивание придёт на почту сразу после оплаты.
            </p>
            <p className="fs-3 fw-bold mb-0">
              <span className="visually-hidden">Цена: </span>
              {product.price} BYN
            </p>
            <Stack direction="horizontal" gap={2}>
              <QuantitySelector onChange={setQuantity} />
              <Button className="flex-grow-1 fw-semibold" onClick={handleAdd}>В корзину</Button>
            </Stack>
            <p role="status" className="small mb-0 text-success fw-semibold">
              {added ? `Товар добавлен в корзину (${quantity} шт.)` : ''}
            </p>
          </Stack>
        </Col>
      </Row>
    </Dialog>
  );
}

QuickViewModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
