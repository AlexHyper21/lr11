import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="text-secondary">Отзывов пока нет. Будьте первым!</p>;
  }

  return (
    <ListGroup as="ul" aria-label="Отзывы покупателей" data-testid="review-list">
      {reviews.map((review) => (
        <ListGroup.Item as="li" key={review.id} className="py-3">
          <div className="d-flex justify-content-between mb-1">
            <strong>{review.author}</strong>
            <span className="small text-secondary">
              <span className="visually-hidden">Оценка: </span>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </span>
          </div>
          <div className="review-text" dangerouslySetInnerHTML={{ __html: review.text }} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
