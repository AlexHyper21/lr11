import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function CartList({ items, onRemove }) {
  return (
    <ListGroup as="ul" data-testid="cart-list" aria-label="Товары в корзине">
      {items.map((item) => (
        <ListGroup.Item as="li" key={item.id} className="d-flex align-items-center gap-3" data-testid="cart-item">
          <img src={item.imageUrl} alt="" width="72" height="50" className="rounded object-fit-cover" />
          <div className="flex-grow-1">
            <div className="fw-semibold">{item.name}</div>
            <div className="small text-secondary">{item.quantity} × {item.price} BYN</div>
          </div>
          <Button variant="outline-secondary" size="sm" onClick={() => onRemove(item.id)}>
            Удалить<span className="visually-hidden"> {item.name}</span>
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

CartList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};
