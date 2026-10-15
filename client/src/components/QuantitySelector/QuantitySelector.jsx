import { useState } from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function QuantitySelector({ initial = 1, min = 1, max = 99, disabled = false, onChange }) {
  const [quantity, setQuantity] = useState(initial);

  const update = (value) => {
    const next = Math.min(max, Math.max(min, Number(value) || min));
    setQuantity(next);
    if (onChange) {
      onChange(next);
    }
  };

  return (
    <InputGroup className="flex-nowrap w-auto" role="group" aria-label="Выбор количества">
      <Button
        variant="outline-secondary"
        onClick={() => update(quantity - 1)}
        disabled={disabled || quantity <= min}
        aria-label="Уменьшить количество"
      >
        <span aria-hidden="true">−</span>
      </Button>
      <Form.Control
        className="text-center fw-semibold px-1"
        style={{ width: 44 }}
        value={quantity}
        onChange={(e) => update(e.target.value)}
        disabled={disabled}
        inputMode="numeric"
        aria-label="Количество"
      />
      <Button
        variant="outline-secondary"
        onClick={() => update(quantity + 1)}
        disabled={disabled || quantity >= max}
        aria-label="Увеличить количество"
      >
        <span aria-hidden="true">+</span>
      </Button>
    </InputGroup>
  );
}

QuantitySelector.propTypes = {
  initial: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
