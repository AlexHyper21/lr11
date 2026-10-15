import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const initialForm = { author: '', rating: '5', text: '' };

export default function ReviewForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSending(true);
    try {
      await onSubmit({ ...form, rating: Number(form.rating) });
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-white border rounded-3 p-3 p-md-4">
      <h3 className="h5 fw-bold mb-3">Оставить отзыв о товаре</h3>
      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      <div className="row g-3">
        <Form.Group className="col-sm-8" controlId="review-author">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control name="author" value={form.author} onChange={handleChange} required minLength={2} maxLength={60} />
        </Form.Group>
        <Form.Group className="col-sm-4" controlId="review-rating">
          <Form.Label>Оценка</Form.Label>
          <Form.Select name="rating" value={form.rating} onChange={handleChange}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-12" controlId="review-text">
          <Form.Label>Отзыв о товаре</Form.Label>
          <Form.Control as="textarea" rows={4} name="text" value={form.text} onChange={handleChange} required minLength={3} maxLength={1000} />
          <Form.Text>Можно использовать теги &lt;b&gt; и &lt;i&gt; для выделения.</Form.Text>
        </Form.Group>
      </div>
      <Button type="submit" className="mt-3 fw-semibold" disabled={sending}>
        {sending ? 'Отправка…' : 'Отправить отзыв'}
      </Button>
    </Form>
  );
}

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
