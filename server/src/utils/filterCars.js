/**
 * Returns the cars that match every filter that was provided.
 * A filter that is missing or empty is ignored.
 * sort "mileage" orders the matches by mileage, lowest first.
 *
 * @param {Array<object>} cars
 * @param {{ make?: string, maxPrice?: string|number, sort?: string }} filters
 */
export function filterCars(cars, filters = {}) {
  const { make, maxPrice, sort } = filters;
  const hasMaxPrice = maxPrice !== undefined && maxPrice !== null && maxPrice !== '';
  const priceLimit = hasMaxPrice ? Number(maxPrice) : null;

  const matched = cars.filter((car) => {
    if (make && car.make.toLowerCase() !== make.toLowerCase()) {
      return false;
    }
    if (priceLimit !== null && !Number.isNaN(priceLimit) && car.price > priceLimit) {
      return false;
    }
    return true;
  });

  if (sort === 'mileage') {
    return [...matched].sort((a, b) => a.mileage - b.mileage);
  }

  return matched;
}
