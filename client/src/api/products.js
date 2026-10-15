async function request(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = Array.isArray(data.errors) ? `: ${data.errors.join(', ')}` : '';
    throw new Error(`${data.message || `Ошибка ${response.status}`}${details}`);
  }
  return data;
}

const withId = (item) => ({ ...item, id: item._id });

export async function fetchProducts() {
  const data = await request('/api/products');
  return data.map(withId);
}

export async function fetchProduct(id) {
  return withId(await request(`/api/products/${id}`));
}

export async function fetchReviews(productId) {
  const data = await request(`/api/products/${productId}/reviews`);
  return data.map(withId);
}

export async function createReview(productId, review) {
  const data = await request(`/api/products/${productId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return withId(data);
}
