import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ReviewList from '../components/Reviews/ReviewList';
import ReviewForm from '../components/Reviews/ReviewForm';
import { addToCart } from '../store/cartSlice';
import { createReview, fetchProduct, fetchReviews } from '../api/products';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    Promise.all([fetchProduct(id), fetchReviews(id)])
      .then(([productData, reviewsData]) => {
        if (!ignore) {
          setProduct(productData);
          setReviews(reviewsData);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
        }
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleReview = async (review) => {
    const created = await createReview(id, review);
    setReviews((prev) => [created, ...prev]);
  };

  if (error) {
    return (
      <Container as="main" id="main" className="py-5">
        <Alert variant="danger" role="alert">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container as="main" id="main" className="py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка…</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container as="main" id="main" tabIndex={-1} className="py-4 py-md-5">
      <Link to="/catalog" className="d-inline-block mb-3">← Назад в каталог</Link>
      <Row className="g-4 mb-5">
        <Col md={6}>
          <img src={product.imageUrl} alt={`Превью товара «${product.name}»`} className="img-fluid rounded-3 border w-100" />
        </Col>
        <Col md={6} className="d-flex flex-column gap-3">
          <h1 className="h3 fw-bold mb-0">{product.name}</h1>
          <p className="fs-2 fw-bold mb-0">
            <span className="visually-hidden">Цена: </span>
            {product.price} BYN
          </p>
          <div>
            <Button className="fw-semibold px-4" onClick={() => dispatch(addToCart({ product, quantity: 1 }))}>
              В корзину
            </Button>
          </div>
        </Col>
      </Row>
      <section aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="h4 fw-bold mb-3">Отзывы о товаре ({reviews.length})</h2>
        <Row className="g-4">
          <Col lg={7}>
            <ReviewList reviews={reviews} />
          </Col>
          <Col lg={5}>
            <ReviewForm onSubmit={handleReview} />
          </Col>
        </Row>
      </section>
    </Container>
  );
}
