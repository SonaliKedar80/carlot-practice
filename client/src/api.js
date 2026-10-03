// All calls to the backend live in this file.

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

export function fetchCars({ make, maxPrice, sort, page = 1, pageSize = 6 } = {}) {
  const params = new URLSearchParams();
  if (make) params.set('make', make);
  if (maxPrice) params.set('maxPrice', String(maxPrice));
  if (sort) params.set('sort', sort);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));

  return fetch(`/api/cars?${params}`).then(handleResponse);
}

export function fetchMakes() {
  return fetch('/api/cars/makes').then(handleResponse);
}

export function fetchFavourites() {
  return fetch('/api/favourites').then(handleResponse);
}

export function saveFavourite(carId) {
  return fetch('/api/favourites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ carId }),
  }).then(handleResponse);
}

export function removeFavourite(carId) {
  return fetch(`/api/favourites/${carId}`, { method: 'DELETE' }).then(handleResponse);
}

export async function sendEnquiry(enquiry) {
  const res = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(`Request failed with status ${res.status}`);
    error.status = res.status;
    error.errors = data.errors;
    throw error;
  }
  return data;
}
