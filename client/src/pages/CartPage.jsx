import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import CartList from '../components/CartList/CartList';
import Dialog from '../components/Dialog/Dialog';
import { clearCart, removeFromCart, selectCartItems, selectCartTotal } from '../store/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef(null);

  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  const handleClear = () => {
    dispatch(clearCart());
    setConfirmOpen(false);
  };

  return (
    <Container as="main" id="main" tabIndex={-1} className="py-4 py-md-5" style={{ maxWidth: 760 }}>
      <h1 className="h2 fw-bold mb-4">Корзина</h1>
      {items.length === 0 ? (
        <Alert variant="light" className="border">
          Корзина пуста. <Link to="/catalog">Перейти в каталог</Link>
        </Alert>
      ) : (
        <>
          <CartList items={items} onRemove={(id) => dispatch(removeFromCart(id))} />
          <Stack direction="horizontal" className="justify-content-between align-items-center mt-4">
            <Button variant="outline-secondary" aria-haspopup="dialog" onClick={() => setConfirmOpen(true)}>
              Очистить
            </Button>
            <p className="fs-4 mb-0" aria-live="polite">
              Итого: <strong data-testid="cart-total">{total} BYN</strong>
            </p>
          </Stack>
        </>
      )}
      {confirmOpen && (
        <Dialog role="alertdialog" labelledBy="clear-title" describedBy="clear-desc" onClose={closeConfirm} initialFocusRef={cancelRef} size="small">
          <h2 id="clear-title" className="h5 fw-bold">Очистить корзину?</h2>
          <p id="clear-desc" className="text-secondary">Все товары будут удалены из корзины. Это действие нельзя отменить.</p>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button ref={cancelRef} variant="outline-secondary" onClick={closeConfirm}>Отмена</Button>
            <Button variant="primary" onClick={handleClear}>Очистить</Button>
          </Stack>
        </Dialog>
      )}
    </Container>
  );
}
