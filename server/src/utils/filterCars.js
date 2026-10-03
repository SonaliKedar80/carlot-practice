/**
 * Returns the cars that match every filter that was provided.
 * A filter that is missing or empty is ignored.
 *
 * @param {Array<object>} cars
 * @param {{ make?: string }} filters
 */
export function filterCars(cars, filters = {}) {
  const { make } = filters;

  return cars.filter((car) => {
    if (make && car.make.toLowerCase() !== make.toLowerCase()) {
      return false;
    }
    return true;
  });
}
