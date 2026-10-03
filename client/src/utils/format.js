// 23500 -> "$23,500"
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);
}

// 41000 -> "41,000 km"
export function formatMileage(km) {
  return `${new Intl.NumberFormat('en-CA').format(km)} km`;
}
