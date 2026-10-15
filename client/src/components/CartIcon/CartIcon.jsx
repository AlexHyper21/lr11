import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { selectCartCount } from '../../store/cartSlice';
import cartIcon from '../../assets/cart.svg';

export default function CartIcon() {
  const count = useSelector(selectCartCount);

  return (
    <Nav.Link
      as={NavLink}
      to="/cart"
      aria-label={count > 0 ? `Корзина, товаров: ${count}` : 'Корзина, пусто'}
      className="d-flex flex-column align-items-center small text-body position-relative"
      data-testid="cart-link"
    >
      <img src={cartIcon} alt="" width="24" height="24" />
      <span className="d-none d-sm-inline" aria-hidden="true">Корзина</span>
      {count > 0 && (
        <Badge pill bg="" className="text-bg-accent position-absolute top-0 start-100 translate-middle" data-testid="cart-count" aria-hidden="true">
          {count}
        </Badge>
      )}
    </Nav.Link>
  );
}
